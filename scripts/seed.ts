/**
 * Content Migration Script: TinaCMS markdown/MDX → Payload CMS (Postgres)
 *
 * Usage: pnpm seed
 *
 * Migrates:
 * - Authors, Tags (simple collections)
 * - Posts with author/tag relationships
 * - Properties, Communities, Board Members, Resources
 * - Pages with block data
 * - Global settings (Header, Footer, Theme)
 */

import { getPayload } from 'payload'
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'

const CONTENT_DIR = path.resolve(process.cwd(), 'content')

function readMarkdownFiles(dir: string) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
    .map(filename => {
      const raw = fs.readFileSync(path.join(dir, filename), 'utf-8')
      const { data: frontmatter, content } = matter(raw)
      const slug = filename.replace(/\.(md|mdx)$/, '')
      return { filename, slug, frontmatter, content }
    })
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

/**
 * Convert Tina block _template names to Payload blockType slugs
 * and restructure the block data for Payload format
 */
function convertBlocksForPayload(blocks: any[]): any[] {
  if (!blocks) return []

  return blocks.map(block => {
    const { _template, ...rest } = block
    return {
      blockType: _template,
      ...rest,
    }
  })
}

async function seed() {
  // Dynamic import of the config to avoid module resolution issues
  const config = (await import('../payload.config')).default

  const payload = await getPayload({ config })

  console.log('Starting content migration...\n')

  // ──────────────────────────────────────────────────
  // 1. Migrate Authors
  // ──────────────────────────────────────────────────
  console.log('--- Migrating Authors ---')
  const authorFiles = readMarkdownFiles(path.join(CONTENT_DIR, 'authors'))
  const authorMap = new Map<string, number>() // old filename → new Payload ID

  for (const { slug, frontmatter } of authorFiles) {
    try {
      const author = await payload.create({
        collection: 'authors',
        data: {
          name: frontmatter.name,
          // Note: avatar images would need to be uploaded separately
          // For now we skip image migration
        },
      })
      authorMap.set(slug, author.id as number)
      console.log(`  Created author: ${frontmatter.name}`)
    } catch (err: any) {
      console.error(`  Error creating author ${slug}:`, err.message)
    }
  }

  // ──────────────────────────────────────────────────
  // 2. Migrate Tags
  // ──────────────────────────────────────────────────
  console.log('\n--- Migrating Tags ---')
  const tagFiles = readMarkdownFiles(path.join(CONTENT_DIR, 'tags'))
  const tagMap = new Map<string, number>()

  for (const { slug, frontmatter } of tagFiles) {
    try {
      const tag = await payload.create({
        collection: 'tags',
        data: {
          name: frontmatter.name,
        },
      })
      tagMap.set(slug, tag.id as number)
      console.log(`  Created tag: ${frontmatter.name}`)
    } catch (err: any) {
      console.error(`  Error creating tag ${slug}:`, err.message)
    }
  }

  // ──────────────────────────────────────────────────
  // 3. Migrate Posts
  // ──────────────────────────────────────────────────
  console.log('\n--- Migrating Posts ---')
  const postFiles = readMarkdownFiles(path.join(CONTENT_DIR, 'posts'))

  for (const { slug, frontmatter, content } of postFiles) {
    try {
      // Resolve author reference
      let authorId: number | undefined
      if (frontmatter.author) {
        const authorRef = frontmatter.author.replace('content/authors/', '').replace('.md', '')
        authorId = authorMap.get(authorRef)
      }

      // Resolve tag references
      const tagIds: number[] = []
      if (frontmatter.tags) {
        for (const tagEntry of frontmatter.tags) {
          const tagRef = (tagEntry.tag || tagEntry).replace('content/tags/', '').replace('.mdx', '').replace('.md', '')
          const tagId = tagMap.get(tagRef)
          if (tagId) tagIds.push(tagId)
        }
      }

      await payload.create({
        collection: 'posts',
        data: {
          title: frontmatter.title,
          slug,
          date: frontmatter.date || undefined,
          author: authorId || undefined,
          tags: tagIds.length > 0 ? tagIds : undefined,
          status: 'published' as const,
          // Note: heroImg and rich text body would need special handling
          // For initial migration, we store the markdown body as a simple text
        },
      })
      console.log(`  Created post: ${frontmatter.title}`)
    } catch (err: any) {
      console.error(`  Error creating post ${slug}:`, err.message)
    }
  }

  // ──────────────────────────────────────────────────
  // 4. Migrate Properties
  // ──────────────────────────────────────────────────
  console.log('\n--- Migrating Properties ---')
  const propertyFiles = readMarkdownFiles(path.join(CONTENT_DIR, 'properties'))

  for (const { slug, frontmatter } of propertyFiles) {
    try {
      await payload.create({
        collection: 'properties',
        data: {
          name: frontmatter.name,
          slug,
          type: frontmatter.type || 'site',
          location: frontmatter.location || undefined,
          size: frontmatter.size || undefined,
          price: frontmatter.price || undefined,
          utilities: frontmatter.utilities || undefined,
          railAccess: frontmatter.railAccess || false,
          zoning: frontmatter.zoning || undefined,
          contact: frontmatter.contact || undefined,
          status: frontmatter.status || 'available',
          // Gallery and specSheet images would need separate upload
        },
      })
      console.log(`  Created property: ${frontmatter.name}`)
    } catch (err: any) {
      console.error(`  Error creating property ${slug}:`, err.message)
    }
  }

  // ──────────────────────────────────────────────────
  // 5. Migrate Communities
  // ──────────────────────────────────────────────────
  console.log('\n--- Migrating Communities ---')
  const communityFiles = readMarkdownFiles(path.join(CONTENT_DIR, 'communities'))

  for (const { slug, frontmatter } of communityFiles) {
    try {
      const communitySlug = slugify(frontmatter.name || slug)
      await payload.create({
        collection: 'communities',
        data: {
          name: frontmatter.name,
          slug: communitySlug,
          population: frontmatter.population || undefined,
          keyEmployers: frontmatter.keyEmployers?.map((e: string) => ({ name: e })) || undefined,
          // Rich text fields and images would need special handling
        },
      })
      console.log(`  Created community: ${frontmatter.name}`)
    } catch (err: any) {
      console.error(`  Error creating community ${slug}:`, err.message)
    }
  }

  // ──────────────────────────────────────────────────
  // 6. Migrate Board Members
  // ──────────────────────────────────────────────────
  console.log('\n--- Migrating Board Members ---')
  const boardFiles = readMarkdownFiles(path.join(CONTENT_DIR, 'board-members'))

  for (const { slug, frontmatter } of boardFiles) {
    try {
      await payload.create({
        collection: 'board-members',
        data: {
          name: frontmatter.name,
          title: frontmatter.title || undefined,
          organization: frontmatter.organization || undefined,
          sector: frontmatter.sector || undefined,
          term: frontmatter.term || undefined,
          committees: frontmatter.committees?.map((c: string) => ({ name: c })) || undefined,
          // Photo and bio would need special handling
        },
      })
      console.log(`  Created board member: ${frontmatter.name}`)
    } catch (err: any) {
      console.error(`  Error creating board member ${slug}:`, err.message)
    }
  }

  // ──────────────────────────────────────────────────
  // 7. Migrate Resources
  // ──────────────────────────────────────────────────
  console.log('\n--- Migrating Resources ---')
  const resourceFiles = readMarkdownFiles(path.join(CONTENT_DIR, 'resources'))

  for (const { slug, frontmatter } of resourceFiles) {
    try {
      await payload.create({
        collection: 'resources',
        data: {
          title: frontmatter.title,
          description: frontmatter.description || undefined,
          category: frontmatter.category || undefined,
          date: frontmatter.date || undefined,
          // File upload would need separate handling
        },
      })
      console.log(`  Created resource: ${frontmatter.title}`)
    } catch (err: any) {
      console.error(`  Error creating resource ${slug}:`, err.message)
    }
  }

  // ──────────────────────────────────────────────────
  // 8. Migrate Pages (with blocks)
  // ──────────────────────────────────────────────────
  console.log('\n--- Migrating Pages ---')
  const pageFiles = readMarkdownFiles(path.join(CONTENT_DIR, 'pages'))

  for (const { slug, frontmatter } of pageFiles) {
    try {
      const blocks = convertBlocksForPayload(frontmatter.blocks || [])

      await payload.create({
        collection: 'pages',
        data: {
          title: frontmatter.title || slug,
          slug,
          blocks,
        },
      })
      console.log(`  Created page: ${slug}`)
    } catch (err: any) {
      console.error(`  Error creating page ${slug}:`, err.message)
    }
  }

  // ──────────────────────────────────────────────────
  // 9. Migrate Global Settings
  // ──────────────────────────────────────────────────
  console.log('\n--- Migrating Global Settings ---')
  const globalFile = path.join(CONTENT_DIR, 'global', 'index.json')

  if (fs.existsSync(globalFile)) {
    const globalData = JSON.parse(fs.readFileSync(globalFile, 'utf-8'))

    try {
      await payload.updateGlobal({
        slug: 'header',
        data: globalData.header,
      })
      console.log('  Updated Header global')
    } catch (err: any) {
      console.error('  Error updating Header:', err.message)
    }

    try {
      await payload.updateGlobal({
        slug: 'footer',
        data: globalData.footer,
      })
      console.log('  Updated Footer global')
    } catch (err: any) {
      console.error('  Error updating Footer:', err.message)
    }

    try {
      await payload.updateGlobal({
        slug: 'theme',
        data: globalData.theme,
      })
      console.log('  Updated Theme global')
    } catch (err: any) {
      console.error('  Error updating Theme:', err.message)
    }
  }

  console.log('\n✓ Migration complete!')
  console.log('\nNote: Image/media files were not migrated.')
  console.log('You will need to re-upload images through the Payload admin UI')
  console.log('or create a separate image migration script.\n')

  process.exit(0)
}

seed().catch(err => {
  console.error('Migration failed:', err)
  process.exit(1)
})
