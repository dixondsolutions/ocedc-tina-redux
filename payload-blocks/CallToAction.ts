import type { Block } from 'payload'
import { sectionStyleField, iconField } from './shared'

export const CallToActionBlock: Block = {
  slug: 'cta',
  labels: { singular: 'Call to Action', plural: 'Calls to Action' },
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
      name: 'actions',
      type: 'array',
      label: 'Actions',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
        },
        {
          name: 'type',
          type: 'select',
          label: 'Type',
          options: [
            { label: 'Button', value: 'button' },
            { label: 'Link', value: 'link' },
          ],
        },
        iconField,
        {
          name: 'link',
          type: 'text',
          label: 'Link',
        },
      ],
    },
  ],
}
