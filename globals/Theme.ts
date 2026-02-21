import type { GlobalConfig } from 'payload'
import { colorOptions } from '@/payload-blocks/shared'

export const Theme: GlobalConfig = {
  slug: 'theme',
  label: 'Theme',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'color',
      type: 'select',
      label: 'Primary Color',
      options: colorOptions,
      admin: {
        components: {
          Field: '@/components/admin/ColorSwatchField#ColorSwatchField',
        },
      },
    },
    {
      name: 'font',
      type: 'select',
      label: 'Font Family',
      options: [
        { label: 'System Sans', value: 'sans' },
        { label: 'Nunito', value: 'nunito' },
        { label: 'Lato', value: 'lato' },
      ],
    },
    {
      name: 'darkMode',
      type: 'select',
      label: 'Dark Mode',
      options: [
        { label: 'System', value: 'system' },
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
      ],
    },
  ],
}
