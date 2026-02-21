import type { GlobalConfig } from 'payload'
import { iconField } from '@/payload-blocks/shared'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  access: {
    read: () => true,
  },
  fields: [
    iconField,
    {
      name: 'name',
      type: 'text',
      label: 'Site Name',
    },
    {
      name: 'color',
      type: 'select',
      label: 'Color',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Primary', value: 'primary' },
      ],
    },
    {
      name: 'nav',
      type: 'array',
      label: 'Nav Links',
      fields: [
        {
          name: 'href',
          type: 'text',
          label: 'Link',
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
        },
      ],
    },
    {
      name: 'utility',
      type: 'group',
      label: 'Utility Bar',
      fields: [
        {
          name: 'links',
          type: 'array',
          label: 'Utility Links',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Label',
            },
            {
              name: 'href',
              type: 'text',
              label: 'Href',
            },
          ],
        },
        {
          name: 'phoneLabel',
          type: 'text',
          label: 'Phone Label',
        },
        {
          name: 'phoneNumber',
          type: 'text',
          label: 'Phone Number',
        },
        {
          name: 'phoneHref',
          type: 'text',
          label: 'Phone Link',
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
              name: 'href',
              type: 'text',
              label: 'Href',
            },
          ],
        },
      ],
    },
  ],
}
