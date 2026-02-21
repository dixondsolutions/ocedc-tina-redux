import type { Block } from 'payload'
import { sectionStyleField, iconField } from './shared'

export const IndustriesGridBlock: Block = {
  slug: 'industriesGrid',
  labels: { singular: 'Industries Grid', plural: 'Industries Grids' },
  fields: [
    sectionStyleField,
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'industries',
      type: 'array',
      label: 'Industries',
      fields: [
        iconField,
        {
          name: 'image',
          type: 'upload',
          label: 'Background Image',
          relationTo: 'media',
        },
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
          name: 'link',
          type: 'text',
          label: 'Link',
        },
      ],
    },
  ],
}
