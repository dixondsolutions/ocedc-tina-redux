# GitHub Copilot Instructions

## Project Overview

This project uses **Payload CMS 3** as a headless CMS with **Next.js 15** (App Router) for the frontend. Payload runs inside Next.js directly — no separate CMS build step.

### Key Concepts
- **Payload Local API**: Server-side data fetching via `getPayload()` — zero network overhead
- **Payload REST API**: Client-side data fetching via `/api/<collection>` endpoints
- **Lexical Editor**: Rich text stored as JSON, rendered with `@payloadcms/richtext-lexical/react`
- **Block-based pages**: Pages use a `blocks` field with 18 block types

## Technology Stack

- **Language**: TypeScript
- **CMS**: Payload CMS 3 (embedded in Next.js)
- **Database**: Vercel Postgres
- **Media Storage**: Vercel Blob
- **UI Framework**: React 19
- **Framework**: Next.js 15 (App Router)

## Architecture

### Data Fetching (Server Components)
```typescript
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })
const result = await payload.find({
  collection: 'posts',
  where: { slug: { equals: params.slug } },
  depth: 2,
})
```

### Client-Side Data Fetching
```typescript
const res = await fetch('/api/posts?limit=10&sort=-date&depth=2')
const data = await res.json()
// data.docs is the array of results
```

### Block Rendering
Blocks are discriminated by `block.blockType` (e.g., `"hero"`, `"features"`, `"stats"`).

### Rich Text
Use the `RichText` component from `components/rich-text.tsx` which wraps `@payloadcms/richtext-lexical/react`.

## File Organization

```
├── payload.config.ts          # Payload CMS configuration
├── collections/               # Payload collection configs
├── globals/                   # Payload global configs
├── payload-blocks/            # Payload block type definitions
├── app/(payload)/             # Payload admin UI & API routes
├── app/                       # Frontend pages (Next.js App Router)
├── components/blocks/         # Block rendering components
├── components/layout/         # Layout components
└── scripts/seed.ts            # Content migration script
```

## Collections
Media, Users, Pages, Posts, Authors, Tags, Properties, Communities, BoardMembers, Resources

## Globals
Header, Footer, Theme

## Development
- `pnpm dev` — Start dev server (Payload admin at `/admin`)
- `pnpm build` — Production build
- `pnpm seed` — Run content migration from markdown files
