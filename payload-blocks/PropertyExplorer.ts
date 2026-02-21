import type { Block } from 'payload'
import { sectionStyleField } from './shared'

export const PropertyExplorerBlock: Block = {
  slug: 'propertyExplorer',
  labels: { singular: 'Property Explorer', plural: 'Property Explorers' },
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
