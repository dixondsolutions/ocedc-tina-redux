# OCEDC Website - How Everything Works

A simple guide to understanding and working with your website.

---

## Table of Contents

1. [The Big Picture - How This Website Works](#the-big-picture---how-this-website-works)
2. [Folder Structure - Where Everything Lives](#folder-structure---where-everything-lives)
3. [Pages Are Made of Blocks (Sections)](#pages-are-made-of-blocks-sections)
4. [How to Edit Content Using Payload CMS](#how-to-edit-content-using-payload-cms)
5. [Available Blocks - Your Building Pieces](#available-blocks---your-building-pieces)
6. [How to Change Colors and Styling](#how-to-change-colors-and-styling)
7. [How to Add, Remove, or Reorder Sections](#how-to-add-remove-or-reorder-sections)
8. [Working with Collections (Properties, News, etc.)](#working-with-collections-properties-news-etc)
9. [Common Tasks - Quick Reference](#common-tasks---quick-reference)
10. [Running the Website Locally](#running-the-website-locally)
11. [Deployment to Vercel](#deployment-to-vercel)
12. [Troubleshooting](#troubleshooting)

---

## The Big Picture - How This Website Works

Think of this website like building with LEGO blocks:

```
WEBSITE
   |
   |-- PAGES (like home, about, contact)
   |      |
   |      +-- Each page is made of BLOCKS (sections)
   |             |
   |             |-- Hero Block (big banner at top)
   |             |-- Features Block (3-column cards)
   |             |-- Stats Block (numbers/metrics)
   |             +-- ... more blocks stacked on top of each other
   |
   |-- COLLECTIONS (reusable content)
   |      |-- Properties (buildings & sites)
   |      |-- News Posts (blog articles)
   |      |-- Communities (Byron, Oregon, etc.)
   |      |-- Board Members (people directory)
   |      +-- Resources (downloadable PDFs)
   |
   +-- GLOBAL SETTINGS (header, footer, colors)
```

**Key Concept:** You build pages by stacking blocks on top of each other. Each block is a section of your page (like a hero banner, a row of feature cards, or a contact form).

**Tech Stack:**
- **Payload CMS 3** — Content management with a built-in admin panel
- **Next.js 15** — React framework that renders the website
- **Vercel Postgres** — Database where all content is stored
- **Vercel Blob** — File/image storage
- **Tailwind CSS** — Styling framework

---

## Folder Structure - Where Everything Lives

Here's what each folder does:

```
ocedc-tina-redux/
|
|-- /collections/               <-- COLLECTION DEFINITIONS
|   |-- Pages.ts                <-- Page collection (with blocks)
|   |-- Posts.ts                <-- Blog/news articles
|   |-- Properties.ts           <-- Building & site listings
|   |-- Communities.ts          <-- Community profiles
|   |-- BoardMembers.ts         <-- Board member info
|   |-- Resources.ts            <-- Downloadable documents
|   |-- Authors.ts              <-- Post authors
|   |-- Tags.ts                 <-- Post tags
|   |-- Media.ts                <-- Uploaded images & files
|   +-- Users.ts                <-- Admin users
|
|-- /payload-blocks/            <-- BLOCK DEFINITIONS
|   |-- Hero.ts                 <-- Hero block schema
|   |-- Features.ts             <-- Features block schema
|   |-- shared.ts               <-- Shared field definitions (icons, styles)
|   +-- ... (18 block types)
|
|-- /globals/                   <-- GLOBAL SETTINGS
|   |-- Header.ts               <-- Header/navigation config
|   |-- Footer.ts               <-- Footer config
|   +-- Theme.ts                <-- Site-wide theme colors
|
|-- /components/                <-- THE BUILDING BLOCKS
|   |-- /blocks/                <-- Section components (hero, features, etc.)
|   |-- /layout/                <-- Header, footer, page wrapper
|   |-- /admin/                 <-- Custom admin UI components
|   +-- /ui/                    <-- Small reusable pieces (buttons, cards)
|
|-- /app/                       <-- PAGE ROUTING
|   |-- /(app)/                 <-- Public-facing pages
|   +-- /(payload)/admin/       <-- Payload admin panel
|
|-- /content/                   <-- LEGACY CONTENT (used for seed migration)
|
|-- /styles.css                 <-- COLORS AND DESIGN TOKENS
|
+-- /payload.config.ts          <-- MAIN PAYLOAD CONFIGURATION
```

**The most important folders for editors:**
- The admin panel at `/admin` — where all content editing happens
- `/styles.css` — where brand colors are defined

**The most important folders for developers:**
- `/collections/` — collection schemas (what fields each content type has)
- `/payload-blocks/` — block schemas (what fields each section type has)
- `/components/blocks/` — block React components (how each section renders)

---

## Pages Are Made of Blocks (Sections)

Every page on your website is a list of blocks stored in the database. You manage them through the Payload admin panel.

### How a Page is Built

A page like "Home" contains blocks stacked in order:

```
+---------------------------------------------+
|                 HERO BLOCK                  |
|  "Northern Illinois Advantage"              |
|  "Ogle County, Illinois..."                 |
+---------------------------------------------+
+---------------------------------------------+
|                STATS BLOCK                  |
|   51K+        6          90 mi              |
|  residents  communities  to Chicago         |
+---------------------------------------------+
+---------------------------------------------+
|              FEATURES BLOCK                 |
|  +-----+    +-----+    +-----+              |
|  |Card1|    |Card2|    |Card3|              |
|  +-----+    +-----+    +-----+              |
+---------------------------------------------+
```

Each block has its own fields (headline, items, background color, etc.) that you fill in through the admin panel.

---

## How to Edit Content Using Payload CMS

Payload CMS provides a full admin panel for managing all content.

### Accessing the Admin Panel

1. Go to: `http://localhost:3000/admin` (local) or `https://your-site.vercel.app/admin` (production)
2. Log in with your admin credentials
3. You'll see the dashboard with all collections and globals

### Editing a Page

1. Click **Pages** in the sidebar
2. Select the page you want to edit (e.g., "home")
3. You'll see all the blocks listed in order
4. Click on any block to expand and edit its fields
5. Click **Save** when done

### Custom Admin Components

The admin panel includes visual helpers to make editing easier:

- **Icon Picker** — Click to browse and search from 1,600+ icons instead of typing icon names
- **Color Swatches** — Click colored circles to pick icon colors instead of text dropdowns
- **Background Color Preview** — See actual background colors as swatches instead of class names

### Editing Global Settings

Click **Globals** in the sidebar to edit:
- **Header** — Navigation links, logo, phone number
- **Footer** — Footer links, social media URLs, contact info
- **Theme** — Primary brand color

---

## Available Blocks - Your Building Pieces

Here are all 18 blocks you can use to build pages:

### Content Blocks

| Block Name | What It Does | Use It For |
|------------|--------------|------------|
| `hero` | Big banner with headline, image, buttons | Top of main pages |
| `content` | Rich text area | Long-form writing, articles |
| `callout` | Highlighted text box | Important notices |

### Feature Blocks

| Block Name | What It Does | Use It For |
|------------|--------------|------------|
| `features` | 3-column cards with icons | Highlighting services/benefits |
| `stats` | Numbers/metrics display | Showing key statistics |
| `industriesGrid` | 4-column industry showcase | Target industries page |

### Media Blocks

| Block Name | What It Does | Use It For |
|------------|--------------|------------|
| `video` | Embedded video player | YouTube/Vimeo videos |
| `map` | Google Maps embed | Location/contact pages |

### Dynamic Content Blocks (Auto-Load Data)

| Block Name | What It Does | Use It For |
|------------|--------------|------------|
| `newsFeed` | Shows latest 3 blog posts | Home page, sidebars |
| `newsArchive` | Shows all blog posts | News/blog page |
| `propertyListing` | Shows available properties | Sites & buildings page |
| `propertyExplorer` | Interactive property finder | Advanced property search |
| `communityList` | Shows all communities | Communities page |
| `boardDirectory` | Searchable board member list | About/team page |
| `resourceLibrary` | Downloadable document list | Resources page |

### Action Blocks

| Block Name | What It Does | Use It For |
|------------|--------------|------------|
| `cta` | Call-to-action with buttons | Encouraging user action |
| `contactForm` | Contact form | Contact page |
| `testimonial` | Quote with attribution | Social proof |

### Block Design Options

Every block includes a **Design** section with:
- **Background** — Pick from 21 background colors via visual swatches
- **Padding** — Vertical spacing above and below the section
- **Width** — Maximum content width (narrow, standard, or full)
- **Alignment** — Text alignment (left, center, right)

---

## How to Change Colors and Styling

### Your Brand Colors

All colors are defined in `/styles.css`. Here are the main ones:

```css
:root {
  --primary: #c58a32;           /* Gold/Bronze - Main brand color */
  --background: #f7f5f0;        /* Warm off-white - Page background */
  --foreground: #1b1f24;        /* Dark gray - Text color */
  --accent: #7a2f20;            /* Rust/burnt orange - Accent color */
  --secondary: #efe8db;         /* Pale cream - Secondary backgrounds */
}
```

### Changing a Color

1. Open `/styles.css`
2. Find the color you want to change
3. Replace the hex code (like `#c58a32`) with your new color

**Finding Hex Colors:** Use a tool like [htmlcolorcodes.com](https://htmlcolorcodes.com) to pick colors and get their hex codes.

### Changing the Primary Color via CMS

You can also change the primary theme color through the admin panel:
1. Go to **Globals > Theme** in the admin panel
2. Click a color swatch to select a new primary color
3. Save

---

## How to Add, Remove, or Reorder Sections

### Adding a New Section (Block)

1. Go to the admin panel → **Pages** → select your page
2. Scroll to the blocks list
3. Click **Add Block** at the bottom
4. Choose the block type from the list
5. Fill in the fields
6. Click **Save**

### Removing a Section

1. Find the block in the page editor
2. Click the trash/delete icon on that block
3. Click **Save**

### Reordering Sections

1. In the page editor, use the drag handle or arrow buttons to reorder blocks
2. Click **Save**

---

## Working with Collections (Properties, News, etc.)

Collections are reusable content managed through the admin panel. Dynamic blocks automatically pull from these collections.

### Properties (Sites & Buildings)

Go to **Properties** in the admin sidebar. Each property has:
- Name, type (building or site), location
- Size, price, status (available, under contract, sold)
- Utilities, rail access, zoning
- Description (rich text), gallery images, spec sheet

The `propertyListing` and `propertyExplorer` blocks automatically display these.

### News Posts

Go to **Posts** in the admin sidebar. Each post has:
- Title, slug, date, featured image
- Excerpt and full content (rich text with the Lexical editor)
- Author (relationship to Authors collection)
- Tags (relationship to Tags collection)

The `newsFeed` and `newsArchive` blocks automatically display these.

### Communities

Go to **Communities** in the admin sidebar. Each community has:
- Name, population, description
- Key employers, contact info

### Board Members

Go to **Board Members** in the admin sidebar. Each member has:
- Name, title, organization, sector
- Photo, bio, term, committees

### Resources (Documents)

Go to **Resources** in the admin sidebar. Each resource has:
- Title, description, category, date
- Category options: `community_profile`, `strategic_plan`, `labor_market_study`, `site_selection`, `incentives`, `other`

### Media (Images & Files)

Go to **Media** in the admin sidebar to upload and manage images and files. Media is stored in Vercel Blob storage.

---

## Common Tasks - Quick Reference

### "I want to change the phone number in the header"

1. Go to admin panel → **Globals** → **Header**
2. Find the phone field and change the number
3. Click **Save**

### "I want to add a new page"

1. Go to admin panel → **Pages** → click **Create New**
2. Set the title and slug
3. Add blocks to build the page content
4. Click **Save**
5. Add a link to it in the navigation: **Globals** → **Header** → edit the nav links

### "I want to add a new property listing"

1. Go to admin panel → **Properties** → click **Create New**
2. Fill in the details (name, type, location, etc.)
3. Click **Save**
4. It will automatically appear in property blocks

### "I want to change the header navigation"

1. Go to admin panel → **Globals** → **Header**
2. Edit the navigation links — add, remove, or reorder
3. Click **Save**

### "I want to add a new news post"

1. Go to admin panel → **Posts** → click **Create New**
2. Fill in the title, date, content
3. Select an author and tags
4. Click **Save**

### "I want to change the footer social links"

1. Go to admin panel → **Globals** → **Footer**
2. Find the social links section
3. Edit the URLs
4. Click **Save**

### "I want to change an icon on a feature card"

1. Edit the page → find the block with the icon
2. Click the icon field — the **Icon Picker** will open
3. Search or browse for your icon
4. Click to select it
5. Click **Save**

Common icons include: `BiRocket`, `BiMap`, `BiFactory`, `BiLeaf`, `BiTruck`, `BiPhoneCall`, `BiBriefcase`, `BiBarChartAlt2`

---

## Running the Website Locally

### Prerequisites

- Node.js 18 or higher
- pnpm (recommended) or npm
- A PostgreSQL database (or use Vercel Postgres)

### First Time Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your environment variables:
   ```
   DATABASE_URI=postgresql://...        # Vercel Postgres connection string
   PAYLOAD_SECRET=your-secret-key       # Any random string for encrypting auth
   BLOB_READ_WRITE_TOKEN=...            # Vercel Blob storage token
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```

### Starting the Development Server

```bash
pnpm dev
```

Then open your browser to:
- **Website:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin

On first run, Payload will prompt you to create an admin user.

### Seeding Content (Optional)

If migrating from the legacy TinaCMS content files:

```bash
# With the dev server running:
curl http://localhost:3000/api/seed
```

This reads the markdown files in `/content/` and creates corresponding entries in the database.

### Building for Production

```bash
pnpm build
```

---

## Deployment to Vercel

### Environment Variables

In your Vercel project settings, add these environment variables:

| Variable | Description |
|----------|-------------|
| `DATABASE_URI` | Vercel Postgres connection string (auto-set if using Vercel Postgres integration) |
| `PAYLOAD_SECRET` | Random secret string for auth encryption |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob storage token (auto-set if using Vercel Blob integration) |

### Deploy

1. Push your code to GitHub
2. Import the project into Vercel
3. Add the environment variables above
4. Deploy

Vercel will automatically build and deploy on each push to `main`.

---

## Troubleshooting

### "My changes aren't showing up"

1. Make sure you clicked **Save** in the admin panel
2. Refresh the page (Ctrl+R or Cmd+R)
3. If running locally, try restarting the dev server (`Ctrl+C`, then `pnpm dev`)

### "I see an error on the page"

1. Check the terminal where you ran `pnpm dev` for error messages
2. Check the browser console for client-side errors
3. Common issues:
   - **Missing required field** — Some blocks require certain fields to be filled in
   - **Invalid relationship** — Make sure related items (authors, tags) exist

### "Images aren't loading"

1. Make sure images were uploaded through the admin panel → **Media**
2. Check that the media item is properly linked in the content
3. Verify the `BLOB_READ_WRITE_TOKEN` environment variable is set

### "The admin panel won't load"

1. Check that `DATABASE_URI` is correctly set in your `.env` file
2. Make sure the database is accessible
3. Try restarting the dev server

### "I messed up content and want to undo"

Payload CMS tracks versions for collections that have versioning enabled. Check the **Versions** tab on the document to restore a previous version.

---

## Quick Reference: File Locations

| What You Want to Change | Where to Find It |
|------------------------|------------------|
| Page content | Admin panel → Pages |
| News/blog posts | Admin panel → Posts |
| Properties | Admin panel → Properties |
| Communities | Admin panel → Communities |
| Board members | Admin panel → Board Members |
| Resources/Documents | Admin panel → Resources |
| Header & footer | Admin panel → Globals |
| Theme colors | Admin panel → Globals → Theme |
| Brand colors (CSS) | `/styles.css` |
| Collection schemas | `/collections/*.ts` |
| Block schemas | `/payload-blocks/*.ts` |
| Block components | `/components/blocks/*.tsx` |
| Global schemas | `/globals/*.ts` |
| Payload config | `/payload.config.ts` |

---

## How It All Connects

```
1. You edit content in the admin panel
   (Add blocks, change text, upload images)
                |
                v
2. Payload CMS saves to the Postgres database
   (Structured data with relationships)
                |
                v
3. Next.js loads the page data via Payload's API
   (Server-side rendering for fast page loads)
                |
                v
4. Blocks component renders each section
   (/components/blocks/ picks the right block)
                |
                v
5. Individual block components display your content
   (hero.tsx, features.tsx, etc. apply the styling)
                |
                v
6. styles.css applies your brand colors
   (Your color tokens style everything)
                |
                v
7. You see your finished page!
```

---

## Getting More Help

- **Payload CMS Docs:** https://payloadcms.com/docs
- **Tailwind CSS (styling classes):** https://tailwindcss.com/docs
- **Next.js (the framework):** https://nextjs.org/docs

---

*OCEDC Website Documentation - Built with Payload CMS + Next.js*
