/**
 * Content Migration API Route: TinaCMS markdown/MDX → Payload CMS (Postgres)
 *
 * Usage: Start dev server, then run:
 *   curl http://localhost:3000/api/seed
 *
 * Migrates:
 * - Authors, Tags (simple collections)
 * - Posts with author/tag relationships
 * - Properties, Communities, Board Members, Resources
 * - Pages with block data
 * - Global settings (Header, Footer, Theme)
 */

import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { NextResponse } from 'next/server'

const CONTENT_DIR = path.resolve(process.cwd(), 'content')

/**
 * Convert a plain text/markdown string to a minimal Lexical editor state JSON.
 * Splits on double newlines into paragraphs. Returns undefined for empty strings.
 */
function textToLexical(text: string | undefined | null): object | undefined {
  if (!text || typeof text !== 'string') return undefined
  const trimmed = text.trim()
  if (!trimmed) return undefined

  const paragraphs = trimmed.split(/\n{2,}/).filter(Boolean)

  return {
    root: {
      type: 'root',
      children: paragraphs.map(p => ({
        type: 'paragraph',
        children: [{ type: 'text', text: p.replace(/\n/g, ' ').trim(), version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      })),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

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

const VALID_ALIGNMENTS = ['text-left', 'text-center', 'text-right']
const VALID_ICON_COLORS = ['blue', 'teal', 'green', 'yellow', 'orange', 'red', 'pink', 'purple', 'white']

function sanitizeBlock(block: any): any {
  const sanitized = { ...block }

  // Fix image.src: strip string paths (need media upload instead)
  if (sanitized.image && typeof sanitized.image.src === 'string') {
    delete sanitized.image.src
  }

  // Fix style.alignment: strip empty or invalid values
  if (sanitized.style && 'alignment' in sanitized.style) {
    if (!sanitized.style.alignment || !VALID_ALIGNMENTS.includes(sanitized.style.alignment)) {
      delete sanitized.style.alignment
    }
  }

  // Convert plain string rich text fields to Lexical JSON
  if (sanitized.text && typeof sanitized.text === 'string') {
    sanitized.text = textToLexical(sanitized.text)
  }
  if (sanitized.body && typeof sanitized.body === 'string') {
    sanitized.body = textToLexical(sanitized.body)
  }

  // Fix icon colors recursively in arrays (e.g., features items)
  if (sanitized.items && Array.isArray(sanitized.items)) {
    sanitized.items = sanitized.items.map((item: any) => {
      const fixed = { ...item }
      // Convert rich text strings in items
      if (fixed.text && typeof fixed.text === 'string') {
        fixed.text = textToLexical(fixed.text)
      }
      if (fixed?.icon?.color && !VALID_ICON_COLORS.includes(fixed.icon.color)) {
        fixed.icon = { ...fixed.icon }
        delete fixed.icon.color
      }
      return fixed
    })
  }

  // Fix action icon colors
  if (sanitized.actions && Array.isArray(sanitized.actions)) {
    sanitized.actions = sanitized.actions.map((action: any) => {
      if (action?.icon?.color && !VALID_ICON_COLORS.includes(action.icon.color)) {
        const fixed = { ...action, icon: { ...action.icon } }
        delete fixed.icon.color
        return fixed
      }
      return action
    })
  }

  return sanitized
}

function convertBlocksForPayload(blocks: any[]): any[] {
  if (!blocks) return []
  return blocks.map(block => {
    const { _template, ...rest } = block
    return sanitizeBlock({ blockType: _template, ...rest })
  })
}

export async function GET() {
  const logs: string[] = []
  const log = (msg: string) => { logs.push(msg); console.log(msg) }

  try {
    const payload = await getPayload({ config })

    // Clear all existing data first
    log('--- Clearing existing data ---')
    const collections = ['posts', 'authors', 'tags', 'properties', 'communities', 'board-members', 'resources', 'pages'] as const
    for (const collection of collections) {
      try {
        const existing = await payload.find({ collection, limit: 1000 })
        for (const doc of existing.docs) {
          await payload.delete({ collection, id: doc.id })
        }
        log(`  Cleared ${collection} (${existing.docs.length} docs)`)
      } catch (err: any) {
        log(`  Error clearing ${collection}: ${err.message}`)
      }
    }

    log('\nStarting content migration...\n')

    // 1. Migrate Authors
    log('--- Migrating Authors ---')
    const authorFiles = readMarkdownFiles(path.join(CONTENT_DIR, 'authors'))
    const authorMap = new Map<string, number>()

    for (const { slug, frontmatter } of authorFiles) {
      try {
        const author = await payload.create({
          collection: 'authors',
          data: { name: frontmatter.name },
        })
        authorMap.set(slug, author.id as number)
        log(`  Created author: ${frontmatter.name}`)
      } catch (err: any) {
        log(`  Error creating author ${slug}: ${err.message}`)
      }
    }

    // 2. Migrate Tags
    log('\n--- Migrating Tags ---')
    const tagFiles = readMarkdownFiles(path.join(CONTENT_DIR, 'tags'))
    const tagMap = new Map<string, number>()

    for (const { slug, frontmatter } of tagFiles) {
      try {
        const tag = await payload.create({
          collection: 'tags',
          data: { name: frontmatter.name },
        })
        tagMap.set(slug, tag.id as number)
        log(`  Created tag: ${frontmatter.name}`)
      } catch (err: any) {
        log(`  Error creating tag ${slug}: ${err.message}`)
      }
    }

    // 3. Migrate Posts
    log('\n--- Migrating Posts ---')
    const postFiles = readMarkdownFiles(path.join(CONTENT_DIR, 'posts'))

    for (const { slug, frontmatter, content } of postFiles) {
      try {
        let authorId: number | undefined
        if (frontmatter.author) {
          const authorRef = frontmatter.author.replace('content/authors/', '').replace('.md', '')
          authorId = authorMap.get(authorRef)
        }

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
            excerpt: textToLexical(frontmatter.excerpt),
            author: authorId || undefined,
            tags: tagIds.length > 0 ? tagIds : undefined,
            content: textToLexical(content),
            status: 'published' as const,
          },
        })
        log(`  Created post: ${frontmatter.title}`)
      } catch (err: any) {
        log(`  Error creating post ${slug}: ${err.message}`)
      }
    }

    // 4. Migrate Properties
    log('\n--- Migrating Properties ---')
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
            description: textToLexical(frontmatter.description),
            contact: frontmatter.contact || undefined,
            status: frontmatter.status || 'available',
          },
        })
        log(`  Created property: ${frontmatter.name}`)
      } catch (err: any) {
        log(`  Error creating property ${slug}: ${err.message}`)
      }
    }

    // 5. Migrate Communities
    log('\n--- Migrating Communities ---')
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
            demographics: textToLexical(frontmatter.demographics),
            description: textToLexical(frontmatter.description),
            contactInfo: textToLexical(frontmatter.contactInfo),
            keyEmployers: frontmatter.keyEmployers?.map((e: string) => ({ name: e })) || undefined,
          },
        })
        log(`  Created community: ${frontmatter.name}`)
      } catch (err: any) {
        log(`  Error creating community ${slug}: ${err.message}`)
      }
    }

    // 6. Migrate Board Members
    log('\n--- Migrating Board Members ---')
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
            bio: textToLexical(frontmatter.bio),
            term: frontmatter.term || undefined,
            committees: frontmatter.committees?.map((c: string) => ({ name: c })) || undefined,
          },
        })
        log(`  Created board member: ${frontmatter.name}`)
      } catch (err: any) {
        log(`  Error creating board member ${slug}: ${err.message}`)
      }
    }

    // 7. Migrate Resources
    log('\n--- Migrating Resources ---')
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
          },
        })
        log(`  Created resource: ${frontmatter.title}`)
      } catch (err: any) {
        log(`  Error creating resource ${slug}: ${err.message}`)
      }
    }

    // 8. Migrate Pages (with blocks)
    log('\n--- Migrating Pages ---')
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
        log(`  Created page: ${slug}`)
      } catch (err: any) {
        log(`  Error creating page ${slug}: ${JSON.stringify(err.data?.errors || err.message)}`)
      }
    }

    // 9. Migrate Global Settings
    log('\n--- Migrating Global Settings ---')
    const globalFile = path.join(CONTENT_DIR, 'global', 'index.json')

    if (fs.existsSync(globalFile)) {
      const globalData = JSON.parse(fs.readFileSync(globalFile, 'utf-8'))

      try {
        await payload.updateGlobal({ slug: 'header', data: globalData.header })
        log('  Updated Header global')
      } catch (err: any) {
        log(`  Error updating Header: ${err.message}`)
      }

      try {
        await payload.updateGlobal({ slug: 'footer', data: globalData.footer })
        log('  Updated Footer global')
      } catch (err: any) {
        log(`  Error updating Footer: ${err.message}`)
      }

      try {
        await payload.updateGlobal({ slug: 'theme', data: globalData.theme })
        log('  Updated Theme global')
      } catch (err: any) {
        log(`  Error updating Theme: ${err.message}`)
      }
    }

    log('\nMigration complete!')

    return NextResponse.json({ success: true, logs })
  } catch (err: any) {
    log(`Migration failed: ${err.message}`)
    return NextResponse.json({ success: false, error: err.message, logs }, { status: 500 })
  }
}
