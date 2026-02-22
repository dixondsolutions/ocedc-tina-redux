import type { CollectionConfig } from 'payload'
import { autoSlugHook } from '@/hooks/auto-slug'

export const Communities: CollectionConfig = {
  slug: 'communities',
  labels: { singular: 'Community', plural: 'Communities' },
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [autoSlugHook('name')],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Community Name',
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
      name: 'population',
      type: 'text',
      label: 'Population',
    },
    {
      name: 'demographics',
      type: 'richText',
      label: 'Demographics',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
    },
    {
      name: 'keyEmployers',
      type: 'array',
      label: 'Key Employers',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Employer Name',
          required: true,
        },
      ],
    },
    {
      name: 'contactInfo',
      type: 'richText',
      label: 'Contact Information',
    },
    {
      name: 'profilePdf',
      type: 'upload',
      label: 'Community Profile PDF',
      relationTo: 'media',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Photo Gallery',
      fields: [
        {
          name: 'image',
          type: 'upload',
          label: 'Image',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
