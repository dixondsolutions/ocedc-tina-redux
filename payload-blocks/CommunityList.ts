import type { Block } from 'payload'
import { sectionStyleField } from './shared'

export const CommunityListBlock: Block = {
  slug: 'communityList',
  labels: { singular: 'Community List', plural: 'Community Lists' },
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
      label: 'Button Label',
    },
  ],
}
