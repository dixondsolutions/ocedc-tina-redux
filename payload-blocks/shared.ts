import type { Field } from 'payload'

export const tailwindBackgroundOptions = [
  { label: 'Default', value: 'bg-default' },
  { label: 'White', value: 'bg-white/80' },
  { label: 'Gray', value: 'bg-gray-50/80' },
  { label: 'Zinc', value: 'bg-zinc-50' },
  { label: 'Black', value: 'bg-black/80' },
  { label: 'Red', value: 'bg-red-50/80' },
  { label: 'Orange', value: 'bg-orange-50/80' },
  { label: 'Yellow', value: 'bg-yellow-50/80' },
  { label: 'Green', value: 'bg-green-50/80' },
  { label: 'Lime', value: 'bg-lime-50/80' },
  { label: 'Emerald', value: 'bg-emerald-50/80' },
  { label: 'Teal', value: 'bg-teal-50/80' },
  { label: 'Cyan', value: 'bg-cyan-50/80' },
  { label: 'Blue', value: 'bg-blue-50/80' },
  { label: 'Sky', value: 'bg-sky-50/80' },
  { label: 'Indigo', value: 'bg-indigo-50/80' },
  { label: 'Violet', value: 'bg-violet-50/80' },
  { label: 'Purple', value: 'bg-purple-50/80' },
  { label: 'Fuchsia', value: 'bg-fuchsia-50/80' },
  { label: 'Pink', value: 'bg-pink-50/80' },
  { label: 'Rose', value: 'bg-rose-50/80' },
]

export const sectionStyleField: Field = {
  name: 'style',
  label: 'Design',
  type: 'group',
  admin: {
    description: 'Background, spacing, and layout options for this section',
  },
  fields: [
    {
      name: 'background',
      type: 'select',
      label: 'Background',
      options: tailwindBackgroundOptions,
      admin: {
        components: {
          Field: '@/components/admin/BackgroundColorField#BackgroundColorField',
        },
      },
    },
    {
      name: 'padding',
      type: 'select',
      label: 'Padding',
      defaultValue: 'py-12',
      options: [
        { label: 'Small', value: 'py-8' },
        { label: 'Medium', value: 'py-12' },
        { label: 'Large', value: 'py-24' },
        { label: 'Extra Large', value: 'py-32' },
        { label: 'None', value: 'py-0' },
      ],
      admin: {
        description: 'Vertical spacing above and below this section',
      },
    },
    {
      name: 'width',
      type: 'select',
      label: 'Width',
      defaultValue: 'max-w-7xl',
      options: [
        { label: 'Narrow', value: 'max-w-3xl' },
        { label: 'Medium', value: 'max-w-5xl' },
        { label: 'Wide', value: 'max-w-7xl' },
        { label: 'Full', value: 'w-full' },
      ],
      admin: {
        description: 'Maximum content width within the section',
      },
    },
    {
      name: 'alignment',
      type: 'select',
      label: 'Alignment',
      defaultValue: 'text-left',
      options: [
        { label: 'Left', value: 'text-left' },
        { label: 'Center', value: 'text-center' },
        { label: 'Right', value: 'text-right' },
      ],
    },
  ],
}

export const iconField: Field = {
  name: 'icon',
  type: 'group',
  label: 'Icon',
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Icon',
      admin: {
        components: {
          Field: '@/components/admin/IconPickerField#IconPickerField',
        },
      },
    },
    {
      name: 'color',
      type: 'select',
      label: 'Color',
      defaultValue: 'blue',
      options: [
        { label: 'Blue', value: 'blue' },
        { label: 'Teal', value: 'teal' },
        { label: 'Green', value: 'green' },
        { label: 'Yellow', value: 'yellow' },
        { label: 'Orange', value: 'orange' },
        { label: 'Red', value: 'red' },
        { label: 'Pink', value: 'pink' },
        { label: 'Purple', value: 'purple' },
        { label: 'White', value: 'white' },
      ],
      admin: {
        components: {
          Field: '@/components/admin/ColorSwatchField#ColorSwatchField',
        },
      },
    },
    {
      name: 'style',
      type: 'select',
      label: 'Style',
      defaultValue: 'float',
      options: [
        { label: 'Circle', value: 'circle' },
        { label: 'Float', value: 'float' },
      ],
      admin: {
        description: 'Circle: icon in a filled circle. Float: icon displayed inline.',
      },
    },
  ],
}

export const colorOptions = [
  { label: 'Blue', value: 'blue' },
  { label: 'Teal', value: 'teal' },
  { label: 'Green', value: 'green' },
  { label: 'Yellow', value: 'yellow' },
  { label: 'Orange', value: 'orange' },
  { label: 'Red', value: 'red' },
  { label: 'Pink', value: 'pink' },
  { label: 'Purple', value: 'purple' },
  { label: 'White', value: 'white' },
]
