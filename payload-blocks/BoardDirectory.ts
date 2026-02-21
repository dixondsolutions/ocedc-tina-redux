import type { Block } from 'payload'
import { sectionStyleField } from './shared'

export const BoardDirectoryBlock: Block = {
  slug: 'boardDirectory',
  labels: { singular: 'Board Directory', plural: 'Board Directories' },
  fields: [
    sectionStyleField,
    {
      name: 'highlight',
      type: 'text',
      label: 'Highlight',
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
  ],
}
