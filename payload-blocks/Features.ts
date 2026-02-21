import type { Block } from 'payload'
import { sectionStyleField, iconField } from './shared'

export const FeaturesBlock: Block = {
  slug: 'features',
  labels: { singular: 'Features', plural: 'Features' },
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
      name: 'items',
      type: 'array',
      label: 'Feature Items',
      fields: [
        iconField,
        {
          name: 'title',
          type: 'text',
          label: 'Title',
        },
        {
          name: 'text',
          type: 'richText',
          label: 'Text',
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
