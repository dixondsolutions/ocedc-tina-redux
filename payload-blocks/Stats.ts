import type { Block } from 'payload'
import { sectionStyleField } from './shared'

export const StatsBlock: Block = {
  slug: 'stats',
  labels: { singular: 'Stats', plural: 'Stats' },
  fields: [
    sectionStyleField,
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Statistics',
      fields: [
        {
          name: 'stat',
          type: 'text',
          label: 'Statistic Value',
        },
        {
          name: 'type',
          type: 'text',
          label: 'Statistic Label',
        },
      ],
    },
  ],
}
