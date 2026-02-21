import type { CollectionConfig } from 'payload'
import { HeroBlock } from '@/payload-blocks/Hero'
import { CalloutBlock } from '@/payload-blocks/Callout'
import { FeaturesBlock } from '@/payload-blocks/Features'
import { StatsBlock } from '@/payload-blocks/Stats'
import { CallToActionBlock } from '@/payload-blocks/CallToAction'
import { ContentBlock } from '@/payload-blocks/Content'
import { TestimonialBlock } from '@/payload-blocks/Testimonial'
import { VideoBlock } from '@/payload-blocks/Video'
import { IndustriesGridBlock } from '@/payload-blocks/IndustriesGrid'
import { NewsFeedBlock } from '@/payload-blocks/NewsFeed'
import { NewsArchiveBlock } from '@/payload-blocks/NewsArchive'
import { ContactFormBlock } from '@/payload-blocks/ContactForm'
import { MapBlock } from '@/payload-blocks/Map'
import { PropertyListingBlock } from '@/payload-blocks/PropertyListing'
import { CommunityListBlock } from '@/payload-blocks/CommunityList'
import { BoardDirectoryBlock } from '@/payload-blocks/BoardDirectory'
import { ResourceLibraryBlock } from '@/payload-blocks/ResourceLibrary'
import { PropertyExplorerBlock } from '@/payload-blocks/PropertyExplorer'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Page', plural: 'Pages' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status'],
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true
      return {
        or: [
          { _status: { equals: 'published' } },
          { _status: { exists: false } },
        ],
      }
    },
  },
  versions: {
    drafts: {
      autosave: true,
      schedulePublish: true,
    },
    maxPerDoc: 25,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
      admin: {
        description: 'URL path for this page (e.g., "home", "contact", "sites-buildings")',
      },
    },
    {
      name: 'blocks',
      type: 'blocks',
      label: 'Page Sections',
      blocks: [
        HeroBlock,
        CalloutBlock,
        FeaturesBlock,
        StatsBlock,
        CallToActionBlock,
        ContentBlock,
        TestimonialBlock,
        VideoBlock,
        IndustriesGridBlock,
        NewsFeedBlock,
        NewsArchiveBlock,
        ContactFormBlock,
        MapBlock,
        PropertyListingBlock,
        CommunityListBlock,
        BoardDirectoryBlock,
        ResourceLibraryBlock,
        PropertyExplorerBlock,
      ],
    },
  ],
}
