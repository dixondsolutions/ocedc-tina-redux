import type { Block } from 'payload'
import { sectionStyleField } from './shared'

export const PropertyListingBlock: Block = {
  slug: 'propertyListing',
  labels: { singular: 'Property Listing', plural: 'Property Listings' },
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
