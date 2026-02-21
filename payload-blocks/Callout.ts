import type { Block } from 'payload'
import { sectionStyleField } from './shared'

export const CalloutBlock: Block = {
  slug: 'callout',
  labels: { singular: 'Callout', plural: 'Callouts' },
  fields: [
    sectionStyleField,
    {
      name: 'text',
      type: 'text',
      label: 'Text',
    },
    {
      name: 'url',
      type: 'text',
      label: 'URL',
    },
  ],
}
