import type { Block } from 'payload'
import { sectionStyleField } from './shared'

export const VideoBlock: Block = {
  slug: 'video',
  labels: { singular: 'Video', plural: 'Videos' },
  fields: [
    sectionStyleField,
    {
      name: 'color',
      type: 'select',
      label: 'Color',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Tint', value: 'tint' },
        { label: 'Primary', value: 'primary' },
      ],
    },
    {
      name: 'url',
      type: 'text',
      label: 'Video URL',
    },
    {
      name: 'autoPlay',
      type: 'checkbox',
      label: 'Auto Play',
    },
    {
      name: 'loop',
      type: 'checkbox',
      label: 'Loop',
    },
  ],
}
