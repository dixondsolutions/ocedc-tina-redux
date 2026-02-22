import { buildConfig } from 'payload'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import sharp from 'sharp'

import { revalidateRedirects } from './hooks/revalidate-redirects'

import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Authors } from './collections/Authors'
import { Tags } from './collections/Tags'
import { Properties } from './collections/Properties'
import { Communities } from './collections/Communities'
import { BoardMembers } from './collections/BoardMembers'
import { Resources } from './collections/Resources'

import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { Theme } from './globals/Theme'
import { Scripts } from './globals/Scripts'
import { Listings } from './globals/Listings'

export default buildConfig({
  admin: {
    user: 'users',
    livePreview: {
      collections: ['pages', 'posts', 'properties', 'communities'],
      url: ({ data, collectionConfig }) => {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || ''
        const slug = data?.slug
        if (!slug) return `${baseUrl}/`

        const collectionSlug = collectionConfig?.slug
        if (collectionSlug === 'pages') {
          return slug === 'home' ? `${baseUrl}/` : `${baseUrl}/${slug}`
        }
        const prefixes: Record<string, string> = {
          posts: '/news',
          properties: '/properties',
          communities: '/communities',
        }
        return `${baseUrl}${prefixes[collectionSlug ?? ''] ?? ''}/${slug}`
      },
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  editor: lexicalEditor(),
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  collections: [
    Media,
    Users,
    Pages,
    Posts,
    Authors,
    Tags,
    Properties,
    Communities,
    BoardMembers,
    Resources,
  ],
  globals: [Header, Footer, Theme, Scripts, Listings],
  secret: process.env.PAYLOAD_SECRET || 'default-secret-change-me',
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
    seoPlugin({
      collections: ['pages', 'posts', 'properties', 'communities'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle: ({ doc }) =>
        `${(doc as any)?.title || (doc as any)?.name || ''} | Ogle County EDC`,
      generateDescription: ({ doc }) => (doc as any)?.excerpt || '',
      generateURL: ({ doc, collectionSlug }) => {
        const slug = (doc as any)?.slug
        if (!slug) return ''
        const prefixes: Record<string, string> = {
          pages: '',
          posts: '/news',
          properties: '/properties',
          communities: '/communities',
        }
        const prefix = prefixes[collectionSlug ?? ''] ?? ''
        return `https://ocedc.org${prefix}/${slug}`
      },
    }),
    redirectsPlugin({
      collections: ['pages', 'posts', 'properties', 'communities'],
      overrides: {
        hooks: {
          afterChange: [revalidateRedirects],
        },
      },
    }),
    formBuilderPlugin({
      fields: {
        text: true,
        textarea: true,
        select: true,
        email: true,
        state: true,
        country: false,
        checkbox: true,
        number: true,
        message: true,
        payment: false,
      },
    }),
  ],
  sharp,
  typescript: {
    outputFile: 'payload-types.ts',
  },
})
