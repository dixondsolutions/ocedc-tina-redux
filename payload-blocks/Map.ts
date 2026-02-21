import type { Block } from 'payload'
import { sectionStyleField } from './shared'

export const MapBlock: Block = {
  slug: 'map',
  labels: { singular: 'Map', plural: 'Maps' },
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
      name: 'embedCode',
      type: 'textarea',
      label: 'Embed Code',
      admin: {
        description: 'Google Maps iframe embed code',
      },
    },
  ],
}
