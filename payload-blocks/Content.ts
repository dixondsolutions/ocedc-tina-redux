import type { Block } from 'payload'
import { sectionStyleField } from './shared'

export const ContentBlock: Block = {
  slug: 'content',
  labels: { singular: 'Content', plural: 'Content' },
  fields: [
    sectionStyleField,
    {
      name: 'sectionId',
      type: 'text',
      label: 'Section ID',
      admin: {
        description: 'Optional anchor ID for linking to this section',
      },
    },
    {
      name: 'body',
      type: 'richText',
      label: 'Body',
    },
  ],
}
