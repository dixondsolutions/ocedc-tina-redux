import type { Block } from 'payload'
import { sectionStyleField } from './shared'

export const NewsArchiveBlock: Block = {
  slug: 'newsArchive',
  labels: { singular: 'News Archive', plural: 'News Archives' },
  fields: [
    sectionStyleField,
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
    },
    {
      name: 'searchPlaceholder',
      type: 'text',
      label: 'Search Placeholder',
    },
    {
      name: 'emptyState',
      type: 'text',
      label: 'Empty State Message',
    },
    {
      name: 'ctaLabel',
      type: 'text',
      label: 'CTA Label',
    },
    {
      name: 'ctaHref',
      type: 'text',
      label: 'CTA Link',
    },
    {
      name: 'postsToLoad',
      type: 'number',
      label: 'Posts per Page',
      defaultValue: 9,
      admin: {
        description: 'Number of posts to load per page (default: 9)',
      },
    },
  ],
}
