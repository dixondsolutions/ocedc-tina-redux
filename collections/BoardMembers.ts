import type { CollectionConfig } from 'payload'

export const BoardMembers: CollectionConfig = {
  slug: 'board-members',
  labels: { singular: 'Board Member', plural: 'Board Members' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'title', 'organization', 'sector'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'organization',
      type: 'text',
      label: 'Organization',
    },
    {
      name: 'sector',
      type: 'select',
      label: 'Sector',
      options: [
        { label: 'Public', value: 'public' },
        { label: 'Private', value: 'private' },
      ],
    },
    {
      name: 'photo',
      type: 'upload',
      label: 'Photo',
      relationTo: 'media',
    },
    {
      name: 'bio',
      type: 'richText',
      label: 'Bio',
    },
    {
      name: 'term',
      type: 'text',
      label: 'Term Dates',
    },
    {
      name: 'committees',
      type: 'array',
      label: 'Committees',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Committee Name',
          required: true,
        },
      ],
    },
  ],
}
