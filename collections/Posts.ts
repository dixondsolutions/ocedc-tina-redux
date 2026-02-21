import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Post', plural: 'Posts' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'date', 'status'],
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
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
    },
    {
      name: 'heroImg',
      type: 'upload',
      label: 'Hero Image',
      relationTo: 'media',
    },
    {
      name: 'excerpt',
      type: 'richText',
      label: 'Excerpt',
    },
    {
      name: 'author',
      type: 'relationship',
      label: 'Author',
      relationTo: 'authors',
    },
    {
      name: 'date',
      type: 'date',
      label: 'Posted Date',
      admin: {
        date: {
          displayFormat: 'MMMM dd yyyy',
        },
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      label: 'Tags',
      relationTo: 'tags',
      hasMany: true,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Body',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      defaultValue: 'published',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
  ],
}
