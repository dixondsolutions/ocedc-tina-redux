import type { Block } from 'payload'
import { sectionStyleField, iconField } from './shared'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    sectionStyleField,
    {
      name: 'tagline',
      type: 'textarea',
      label: 'Tagline',
    },
    {
      name: 'headline',
      type: 'text',
      label: 'Headline',
    },
    {
      name: 'subheadline',
      type: 'text',
      label: 'Subheadline',
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
          name: 'type',
          type: 'select',
          label: 'Type',
          options: [
            { label: 'Button', value: 'button' },
            { label: 'Link', value: 'link' },
          ],
        },
        iconField,
        {
          name: 'link',
          type: 'text',
          label: 'Link',
        },
      ],
    },
    {
      name: 'image',
      type: 'group',
      label: 'Image',
      fields: [
        {
          name: 'src',
          type: 'upload',
          label: 'Image Source',
          relationTo: 'media',
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt Text',
        },
        {
          name: 'videoUrl',
          type: 'text',
          label: 'Video URL',
          admin: {
            description: 'If using a YouTube video, make sure to use the embed version of the video URL',
          },
        },
      ],
    },
  ],
}
