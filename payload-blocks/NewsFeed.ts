import type { Block } from 'payload'
import { sectionStyleField } from './shared'

export const NewsFeedBlock: Block = {
  slug: 'newsFeed',
  labels: { singular: 'News Feed', plural: 'News Feeds' },
  fields: [
    sectionStyleField,
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
  ],
}
