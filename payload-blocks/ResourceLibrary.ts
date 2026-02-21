import type { Block } from 'payload'
import { sectionStyleField } from './shared'

export const ResourceLibraryBlock: Block = {
  slug: 'resourceLibrary',
  labels: { singular: 'Resource Library', plural: 'Resource Libraries' },
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
      name: 'ctaLabel',
      type: 'text',
      label: 'CTA Label',
    },
    {
      name: 'ctaHref',
      type: 'text',
      label: 'CTA Link',
    },
  ],
}
