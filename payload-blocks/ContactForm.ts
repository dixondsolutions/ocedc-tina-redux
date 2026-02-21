import type { Block } from 'payload'
import { sectionStyleField } from './shared'

export const ContactFormBlock: Block = {
  slug: 'contactForm',
  labels: { singular: 'Contact Form', plural: 'Contact Forms' },
  fields: [
    sectionStyleField,
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'text',
      type: 'text',
      label: 'Description',
    },
  ],
}
