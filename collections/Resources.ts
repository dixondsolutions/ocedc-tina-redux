import type { CollectionConfig } from 'payload'

export const Resources: CollectionConfig = {
  slug: 'resources',
  labels: { singular: 'Resource', plural: 'Resources' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'date'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'category',
      type: 'select',
      label: 'Category',
      options: [
        { label: 'Community Profile', value: 'community_profile' },
        { label: 'Strategic Plan', value: 'strategic_plan' },
        { label: 'Meeting Notes', value: 'meeting_notes' },
        { label: 'Labor Market Study', value: 'labor_market_study' },
        { label: 'Infrastructure Map', value: 'infrastructure_map' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'file',
      type: 'upload',
      label: 'File (PDF)',
      relationTo: 'media',
    },
    {
      name: 'date',
      type: 'date',
      label: 'Date Added',
    },
  ],
}
