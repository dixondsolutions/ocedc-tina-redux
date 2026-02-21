import type { Block } from 'payload'
import { sectionStyleField } from './shared'

export const TestimonialBlock: Block = {
  slug: 'testimonial',
  labels: { singular: 'Testimonial', plural: 'Testimonials' },
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
      name: 'testimonials',
      type: 'array',
      label: 'Testimonials',
      fields: [
        {
          name: 'quote',
          type: 'text',
          label: 'Quote',
        },
        {
          name: 'author',
          type: 'text',
          label: 'Author',
        },
        {
          name: 'role',
          type: 'text',
          label: 'Role',
        },
        {
          name: 'avatar',
          type: 'upload',
          label: 'Avatar',
          relationTo: 'media',
        },
      ],
    },
  ],
}
