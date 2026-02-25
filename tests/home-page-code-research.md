# Home Page Code Research — CMS Content Rendering Audit

## Data Flow Architecture

```
app/page.tsx
  → payload.find({ collection: 'pages', where: { slug: 'home' }, depth: 2 })
  → Layout (fetches 5 globals: header, footer, theme, scripts, listings)
    → LayoutProvider context
      → Header (client) — uses useLayout()
      → Blocks (client) — maps block.blockType → component
      → Footer (client) — uses useLayout()
      → SiteScripts — GTM & custom scripts
```

## Block Component Inventory

| Block Type | Component File | Data Source | Status |
|-----------|---------------|-------------|--------|
| `hero` | `components/blocks/hero.tsx` | Page blocks array | OK — renders headline, CTAs, optional bg image |
| `stats` | `components/blocks/stats.tsx` | Page blocks array | OK — 3 stat cards with dt/dd |
| `features` | `components/blocks/features.tsx` | Page blocks array | OK — 3 cards with icons, rich text, links |
| `industriesGrid` | `components/blocks/industries-grid.tsx` | Page blocks array | OK — 4 industry cards with images/icons |
| `propertyListing` / LOIS | `components/blocks/lois-widget.tsx` | Listings global + block | OK — iframe embed |
| `features` (2nd) | `components/blocks/features.tsx` | Page blocks array | OK — "Why Companies Choose" section |
| `newsFeed` | `components/blocks/news-feed.tsx` | Client fetch `/api/posts` | ISSUE — all images missing (CMS data) |
| `cta` | `components/blocks/call-to-action.tsx` | Page blocks array | FIXED — texture.png 404 resolved |
| `map` | `components/blocks/map.tsx` | Page blocks array (embedCode) | OK — Google Maps iframe via dangerouslySetInnerHTML |
| `callout` | `components/blocks/callout.tsx` | Page blocks array | OK — animated link pill |
| `content` | `components/blocks/content.tsx` | Page blocks array | OK — Lexical rich text + markdown fallback |

## Layout Components

| Component | File | Data Source | Status |
|-----------|------|-------------|--------|
| Header | `components/layout/nav/header.tsx` | Header global | OK — sticky with hide-on-scroll, utility bar, mobile menu |
| Footer | `components/layout/nav/footer.tsx` | Header + Footer globals | OK — logo, contact, quick links, social, newsletter |
| Section | `components/layout/section.tsx` | Block style props | OK — wrapper with bg/padding/width/alignment |

## Issues Found

### HIGH — News Feed Missing Images
- **Component:** `components/blocks/news-feed.tsx`
- **Symptom:** All 3 posts display "No Image" placeholder
- **Root Cause:** `heroImg` is `null` for all 3 posts in the database (confirmed via API: `/api/posts?limit=3&sort=-date&depth=2`)
- **Type:** CMS data issue — not a code bug
- **Resolution:** Admin must upload hero images to each post via Payload admin panel at `/admin/collections/posts`
- **Note:** The Tina → Payload migration likely didn't map hero images to the `heroImg` upload field

### MEDIUM — texture.png 404 (FIXED)
- **Component:** `components/blocks/call-to-action.tsx:10`
- **Symptom:** Console 404 error for `/texture.png`
- **Root Cause:** CTA block referenced `bg-[url('/texture.png')]` but file didn't exist in `public/`
- **Fix Applied:** Replaced with inline SVG data URI noise pattern (CSS-only, no file dependency)

### LOW — Font Preload Warnings
- **Component:** `app/layout.tsx`
- **Symptom:** 4 `.woff2` font preload warnings in console
- **Root Cause:** Layout loads 4 Google Fonts (Inter, Nunito, Lato, Playfair Display) via `next/font/google` and applies all CSS variables. Only one font is actually used based on the Theme global's `font` setting. Next.js preloads all declared fonts.
- **Resolution:** Acceptable tradeoff — the fonts are needed for theme switching. Could conditionally load fonts based on theme, but adds server-side complexity for minimal benefit.

### CMS Content Issues (Not Code)
| Issue | Location | Recommended Fix |
|-------|----------|-----------------|
| "Download community profiles" CTA links to `/news` | CTA block actions in CMS | Update href to appropriate profiles/resources page |
| News posts lack hero images | Posts collection | Upload images via admin panel |

## Shared Utilities

- **`getMediaUrl(media)`** — Used in hero.tsx, news-feed.tsx, industries-grid.tsx. Handles both string URLs and Payload media objects.
- **`Section` wrapper** — All blocks use this for consistent bg/padding/width. Props: `background`, `padding`, `width`, `alignment`, `fullBleed`, `className`.
- **`Icon` component** — Renders Lucide icons from CMS data `{ name, color, style }`.
- **`RichText` component** — Renders Lexical JSON or falls back to markdown parsing for Tina-migrated content.
- **`useLayout()` hook** — Provides `globalSettings` (header, footer, theme, scripts, listings) via React Context.

## Image Handling Pattern
```typescript
const getMediaUrl = (media: any): string | null => {
  if (!media) return null;
  if (typeof media === 'string') return media;
  return media.url || null;
};
```
- Payload Media objects have `{ url, alt, width, height, ... }`
- External URLs use `unoptimized={true}` on Next.js `Image` component
- Vercel Blob URLs: `https://*.public.blob.vercel-storage.com/...`

## Collection → Component Mapping

| Collection | Rendered By | Fetch Method |
|-----------|-------------|--------------|
| Pages | `app/page.tsx` → `Blocks` | Server-side `payload.find()` |
| Posts | `NewsFeed` block | Client-side `fetch('/api/posts')` |
| Properties | `PropertyListing` / `PropertyExplorer` | Client-side fetch |
| Communities | `CommunityList` block | Client-side fetch |
| Board Members | `BoardDirectory` block | Client-side fetch |
| Resources | `ResourceLibrary` block | Client-side fetch |
| Media | Used by all image fields | Populated via `depth` parameter |

## Globals → Component Mapping

| Global | Components | Purpose |
|--------|-----------|---------|
| Header | Header, Footer (for logo) | Navigation, branding, utility bar |
| Footer | Footer | Contact info, social links, newsletter |
| Theme | Layout (CSS vars), Section (bg) | Color scheme, font, dark mode |
| Scripts | SiteScripts | GTM, custom analytics |
| Listings | Blocks (propertyListing switch) | CMS vs LOIS property source |
