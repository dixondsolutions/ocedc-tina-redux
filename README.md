# OCEDC Website - How Everything Works

A simple guide to understanding and working with your website.

---

## Table of Contents

1. [The Big Picture - How This Website Works](#the-big-picture---how-this-website-works)
2. [Folder Structure - Where Everything Lives](#folder-structure---where-everything-lives)
3. [Pages Are Made of Blocks (Sections)](#pages-are-made-of-blocks-sections)
4. [How to Edit Content Using TinaCMS](#how-to-edit-content-using-tinacms)
5. [How to Edit Content By Hand (In Files)](#how-to-edit-content-by-hand-in-files)
6. [Available Blocks - Your Building Pieces](#available-blocks---your-building-pieces)
7. [How to Change Colors and Styling](#how-to-change-colors-and-styling)
8. [How to Add, Remove, or Reorder Sections](#how-to-add-remove-or-reorder-sections)
9. [Working with Collections (Properties, News, etc.)](#working-with-collections-properties-news-etc)
10. [Common Tasks - Quick Reference](#common-tasks---quick-reference)
11. [Running the Website Locally](#running-the-website-locally)
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

---

## Folder Structure - Where Everything Lives

Here's what each folder does:

```
ocedc-tina-redux/
|
|-- /content/                    <-- YOUR CONTENT LIVES HERE
|   |-- /pages/                  <-- Page files (home.mdx, about.mdx, etc.)
|   |-- /posts/                  <-- Blog/news articles
|   |-- /properties/             <-- Building & site listings
|   |-- /communities/            <-- Community profiles
|   |-- /board-members/          <-- Board member info
|   |-- /resources/              <-- Downloadable documents
|   +-- /global/index.json       <-- Site-wide settings (header, footer)
|
|-- /components/                 <-- THE BUILDING BLOCKS
|   |-- /blocks/                 <-- Section components (hero, features, etc.)
|   |-- /layout/                 <-- Header, footer, page wrapper
|   +-- /ui/                     <-- Small reusable pieces (buttons, cards)
|
|-- /tina/                       <-- TINACMS CONFIGURATION
|   |-- config.tsx               <-- Main CMS settings
|   +-- /collection/             <-- Defines what fields each content type has
|
|-- /public/uploads/             <-- UPLOADED IMAGES & FILES
|
|-- /styles.css                  <-- COLORS AND DESIGN TOKENS
|
+-- /app/                        <-- PAGE ROUTING (you rarely touch this)
```

**The most important folders for you:**
- `/content/` - Where all your website content is stored
- `/styles.css` - Where your colors are defined
- `/components/blocks/` - Where each section type is coded

---

## Pages Are Made of Blocks (Sections)

Every page on your website is a simple file that lists which blocks to show and in what order.

### Example: How the Home Page is Built

The file `/content/pages/home.mdx` looks like this:

```yaml
---
title: Ogle County Economic Development Corporation
blocks:
  - tagline: Northern Illinois Advantage
    headline: Ogle County, Illinois — an economic destination...
    _template: hero              # <-- This says "use the Hero block"

  - title: Regional reach with small-town responsiveness
    stats:
      - stat: 51K+
        type: County residents
    _template: stats             # <-- This says "use the Stats block"

  - title: Strategic Development Resources
    items:
      - title: Supporting New Businesses
        text: Entrepreneurial support...
    _template: features          # <-- This says "use the Features block"
---
```

**How to read this:**
1. The `_template: hero` line tells the website "put a Hero section here"
2. The other lines (tagline, headline, etc.) are the content for that section
3. Blocks are displayed in the order they appear in the file

**Visual representation:**

```
+---------------------------------------------+
|                 HERO BLOCK                  |  <-- _template: hero
|  "Northern Illinois Advantage"              |
|  "Ogle County, Illinois..."                 |
+---------------------------------------------+
+---------------------------------------------+
|                STATS BLOCK                  |  <-- _template: stats
|   51K+        6          90 mi              |
|  residents  communities  to Chicago         |
+---------------------------------------------+
+---------------------------------------------+
|              FEATURES BLOCK                 |  <-- _template: features
|  +-----+    +-----+    +-----+              |
|  |Card1|    |Card2|    |Card3|              |
|  +-----+    +-----+    +-----+              |
+---------------------------------------------+
```

---

## How to Edit Content Using TinaCMS

TinaCMS gives you a visual editor to change content without touching code.

### Starting the CMS

1. Run the website locally (see "Running the Website Locally" section)
2. Go to: `http://localhost:3000/admin`
3. You'll see a sidebar with all your content collections

### Editing a Page

1. Click on **Pages** in the sidebar
2. Select the page you want to edit (e.g., "home")
3. You'll see all the blocks on that page listed
4. Click on any block to expand it and edit its fields
5. Changes save automatically

### Visual Editing Mode

When viewing your site at `http://localhost:3000`:
- Click on sections directly on the page
- A blue outline will appear showing what's editable
- Make changes in the sidebar that appears

---

## How to Edit Content By Hand (In Files)

If you prefer editing files directly, here's how:

### Editing a Page

1. Open `/content/pages/[page-name].mdx`
2. Find the block you want to change
3. Edit the values after the colons

**Example - Changing the hero headline:**

```yaml
# Before
headline: Ogle County, Illinois — an economic destination

# After
headline: Your New Headline Goes Here
```

### Important Rules for Editing Files

- **Keep the indentation (spaces at the beginning) exactly the same**
- Don't change anything with `_template` unless you want a different block type
- Use quotation marks for text with special characters: `headline: "Hello: World"`
- Each `-` (dash) starts a new item in a list

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
2. Find the color you want to change (lines 45-78)
3. Replace the hex code (like `#c58a32`) with your new color

**Example - Changing the primary brand color:**

```css
/* Before */
--primary: #c58a32;

/* After - now it's blue */
--primary: #2563eb;
```

**Finding Hex Colors:** Use a tool like [htmlcolorcodes.com](https://htmlcolorcodes.com) to pick colors and get their hex codes.

### Background Colors on Sections

Each block can have a background color. In the content files, you'll see:

```yaml
- background: bg-white          # White background
  _template: features

- background: bg-sky-50/80      # Light blue, slightly transparent
  _template: stats

- background: bg-transparent    # No background (see-through)
  _template: hero
```

**Common background options:**
- `bg-white` - White
- `bg-sky-50/80` - Light blue (80% opacity)
- `bg-transparent` - See-through
- `bg-primary` - Your brand color (gold)
- `bg-secondary` - Cream color

---

## How to Add, Remove, or Reorder Sections

### Adding a New Section (Block)

**Using TinaCMS (Easiest):**
1. Go to `http://localhost:3000/admin`
2. Click Pages, then select your page
3. Click the "+" button to add a new block
4. Choose the block type from the list
5. Fill in the fields

**By Hand (In the File):**

Add a new block entry in your page file. Make sure the indentation matches:

```yaml
blocks:
  - _template: hero
    headline: Existing Hero

  # ADD YOUR NEW BLOCK HERE (notice the spacing!)
  - _template: features
    title: My New Features Section
    items:
      - title: Feature 1
        text: Description here
      - title: Feature 2
        text: Description here
      - title: Feature 3
        text: Description here
```

### Removing a Section

**Using TinaCMS:**
1. Find the block in the page editor
2. Click the trash icon to delete it

**By Hand:**

Delete everything from one `- ` to the next `- `:

```yaml
blocks:
  - _template: hero
    headline: Keep this one

  # DELETE EVERYTHING BELOW THIS LINE...
  - background: bg-white
    title: Section to Remove
    _template: features
  # ...TO HERE (but don't delete the next block!)

  - _template: stats
    title: Keep this one too
```

### Reordering Sections

**Using TinaCMS:**
- Drag and drop blocks to reorder them

**By Hand:**
Cut the entire block (from `- ` to before the next `- `) and paste it in the new position.

---

## Working with Collections (Properties, News, etc.)

Collections are reusable content that blocks pull from automatically.

### Properties (Sites & Buildings)

**Location:** `/content/properties/`

Each property file has:
```yaml
---
name: "Industrial Park Building A"
type: building              # or "site"
location: "123 Main St, Oregon, IL"
size: "50,000 sq ft"
price: "$1,500,000"
status: available           # or "under_contract" or "sold"
utilities:
  - water
  - sewer
  - natural_gas
  - electric
railAccess: true
zoning: "Industrial"
description: "Description text here..."
gallery:
  - /uploads/building-photo-1.jpg
  - /uploads/building-photo-2.jpg
specSheet: /uploads/spec-sheet.pdf
---
```

The `propertyListing` and `propertyExplorer` blocks automatically show these.

### News Posts

**Location:** `/content/posts/`

Each post file has:
```yaml
---
title: "Exciting Announcement"
heroImg: /uploads/news-image.jpg
date: 2024-01-15
excerpt: "A brief summary of the article..."
author: content/authors/your-name.md
tags:
  - content/tags/economic-development.md
---

Your article content goes here. You can use **bold**, *italics*,
and other markdown formatting.
```

The `newsFeed` and `newsArchive` blocks automatically show these.

### Communities

**Location:** `/content/communities/`

Each community file has:
```yaml
---
name: "Oregon"
population: "3,721"
description: "County seat with historic downtown..."
keyEmployers:
  - "Employer Name 1"
  - "Employer Name 2"
contactInfo: "City Hall: (815) 732-2108"
---
```

### Board Members

**Location:** `/content/board-members/`

```yaml
---
name: "John Smith"
title: "Board President"
organization: "ABC Company"
sector: private             # or "public"
photo: /uploads/john-smith.jpg
bio: "Brief biography here..."
---
```

### Resources (Documents)

**Location:** `/content/resources/`

```yaml
---
title: "2024 Community Profile"
description: "Comprehensive overview of Ogle County"
category: community_profile
file: /uploads/community-profile-2024.pdf
date: 2024-01-01
---
```

**Category options:** `community_profile`, `strategic_plan`, `labor_market_study`, `site_selection`, `incentives`, `other`

---

## Common Tasks - Quick Reference

### "I want to change the phone number in the header"

1. Open `/content/global/index.json`
2. Find `"phone":` and change the number

### "I want to add a new page"

1. Create a new file: `/content/pages/your-page-name.mdx`
2. Add basic structure:
```yaml
---
title: Your Page Title
blocks:
  - _template: hero
    headline: Your Headline
---
```
3. Add a link to it in the navigation (in `/content/global/index.json`)

### "I want to add a new property listing"

1. Create a new file: `/content/properties/property-name.md`
2. Copy structure from an existing property file
3. Fill in the details
4. It will automatically appear in property blocks

### "I want to change the header navigation"

1. Open `/content/global/index.json`
2. Find the `"nav":` section
3. Add, remove, or edit links:
```json
"nav": [
  { "href": "/about", "label": "About" },
  { "href": "/contact", "label": "Contact" }
]
```

### "I want to add a new news post"

1. Create: `/content/posts/your-post-title.mdx`
2. Add:
```yaml
---
title: "Your Post Title"
date: 2024-06-15
heroImg: /uploads/your-image.jpg
---

Your article content here.
```

### "I want to change the footer social links"

1. Open `/content/global/index.json`
2. Find `"social":` in the footer section
3. Edit the URLs

### "I want to change an icon on a feature card"

Icons use names from the icon library. Common icons:
- `BiRocket` - Rocket ship
- `BiMap` - Map pin
- `BiFactory` - Factory building
- `BiLeaf` - Leaf
- `BiTruck` - Truck
- `BiPhoneCall` - Phone
- `BiBriefcase` - Briefcase
- `BiBarChartAlt2` - Bar chart

Change the `name:` under `icon:` to use a different one.

---

## Running the Website Locally

### First Time Setup

1. Make sure you have Node.js installed (version 18 or higher)
2. Open a terminal/command prompt
3. Navigate to the project folder
4. Run:
```bash
pnpm install
```
(or `npm install` if you don't have pnpm)

### Starting the Development Server

```bash
pnpm dev
```
(or `npm run dev`)

Then open your browser to:
- **Website:** http://localhost:3000
- **CMS Editor:** http://localhost:3000/admin
- **Log out of CMS:** http://localhost:3000/exit-admin

### Building for Production

```bash
pnpm build
```
(or `npm run build`)

---

## Deployment to Vercel

1. Push your code to a Git repository (GitHub, GitLab, etc.).
2. Import the project into Vercel.
3. In the "Environment Variables" section, add the following:
   - `NEXT_PUBLIC_TINA_CLIENT_ID`: Your TinaCMS Client ID
   - `TINA_TOKEN`: Your TinaCMS Read-Only Token
   - `NEXT_PUBLIC_TINA_BRANCH`: `main` (or your branch name)
4. Click "Deploy".

---

## Troubleshooting

### "My changes aren't showing up"

1. Make sure you saved the file
2. Refresh the page (Ctrl+R or Cmd+R)
3. If using TinaCMS, wait a moment - it auto-saves but may take a second
4. Try restarting the dev server (Ctrl+C, then `pnpm dev` again)

### "I see an error on the page"

1. Check the terminal where you ran `pnpm dev` for error messages
2. Common issues:
   - **Typo in the `_template:` name** - Make sure it matches exactly (e.g., `hero` not `Hero`)
   - **Missing required field** - Some blocks require certain fields
   - **Broken indentation** - Spaces matter in YAML files!

### "Images aren't loading"

1. Make sure the image path starts with `/uploads/` or is a full URL (https://...)
2. Upload images through TinaCMS or place them in `/public/uploads/`
3. Check for typos in the file name

### "The styling looks broken"

1. Check that you didn't accidentally delete a class name
2. Make sure color codes in `styles.css` are valid hex codes (6 characters after #, like `#c58a32`)
3. Restart the dev server

### "I messed up a file and want to undo"

If you're using Git:
```bash
git checkout -- path/to/file.mdx
```
This will restore the file to its last committed state.

---

## Quick Reference: File Locations

| What You Want to Change | Where to Find It |
|------------------------|------------------|
| Page content | `/content/pages/[page].mdx` |
| News/blog posts | `/content/posts/` |
| Properties | `/content/properties/` |
| Communities | `/content/communities/` |
| Board members | `/content/board-members/` |
| Resources/Documents | `/content/resources/` |
| Header & footer | `/content/global/index.json` |
| Colors | `/styles.css` (lines 45-78) |
| How a block looks | `/components/blocks/[block].tsx` |
| What fields a block has | `/tina/collection/page.ts` |

---

## The Connection: How Files Become a Website

Here's how everything connects:

```
1. You edit /content/pages/home.mdx
   (Add blocks, change text)
                |
                v
2. TinaCMS reads your file
   (Converts YAML to data)
                |
                v
3. Next.js loads the page
   (Routes to /app/page.tsx)
                |
                v
4. Blocks component renders each section
   (/components/blocks/index.tsx picks the right block)
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

- **TinaCMS Docs:** https://tina.io/docs
- **Tailwind CSS (styling classes):** https://tailwindcss.com/docs
- **Next.js (the framework):** https://nextjs.org/docs

---

*OCEDC Website Documentation - Built with TinaCMS + Next.js*
