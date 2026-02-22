import type { Block } from 'payload'
import { sectionStyleField } from './shared'

export const FormBuilderBlock: Block = {
  slug: 'formBuilder',
  labels: { singular: 'Dynamic Form', plural: 'Dynamic Forms' },
  fields: [
    sectionStyleField,
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      admin: {
        description: 'Select a form created in the Forms collection.',
      },
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: 'Enable Intro Content',
      defaultValue: false,
    },
    {
      name: 'introTitle',
      type: 'text',
      label: 'Intro Title',
      admin: {
        condition: (_, { enableIntro }) => Boolean(enableIntro),
      },
    },
    {
      name: 'introText',
      type: 'text',
      label: 'Intro Description',
      admin: {
        condition: (_, { enableIntro }) => Boolean(enableIntro),
      },
    },
  ],
}
