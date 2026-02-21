import { buildConfig } from 'payload'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import sharp from 'sharp'

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

export default buildConfig({
  admin: {
    user: 'users',
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
  globals: [Header, Footer, Theme],
  secret: process.env.PAYLOAD_SECRET || 'default-secret-change-me',
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
  sharp,
  typescript: {
    outputFile: 'payload-types.ts',
  },
})
