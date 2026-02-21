import type { GlobalConfig } from 'payload'
import { iconField } from '@/payload-blocks/shared'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'social',
      type: 'array',
      label: 'Social Links',
      fields: [
        iconField,
        {
          name: 'url',
          type: 'text',
          label: 'URL',
        },
      ],
    },
    {
      name: 'newsletter',
      type: 'group',
      label: 'Newsletter Signup',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
        },
        {
          name: 'buttonText',
          type: 'text',
          label: 'Button Text',
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Contact Information',
      fields: [
        {
          name: 'address',
          type: 'textarea',
          label: 'Address',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Phone',
        },
        {
          name: 'email',
          type: 'text',
          label: 'Email',
        },
      ],
    },
  ],
}
