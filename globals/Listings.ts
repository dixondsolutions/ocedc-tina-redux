import type { GlobalConfig } from 'payload'

export const Listings: GlobalConfig = {
  slug: 'listings',
  label: 'Listings',
  access: {
    read: () => true,
  },
  admin: {
    description:
      'Choose whether property listings are managed in the CMS or powered by the LOIS (LocationOne) widget.',
  },
  fields: [
    {
      name: 'listingsSource',
      type: 'radio',
      label: 'Listings Source',
      defaultValue: 'cms',
      options: [
        { label: 'CMS (Payload)', value: 'cms' },
        { label: 'LOIS Widget (LocationOne)', value: 'lois' },
      ],
      admin: {
        description:
          'Select where property listing data comes from. CMS uses the Properties collection. LOIS embeds the LocationOne widget.',
      },
    },
    {
      name: 'lois',
      type: 'group',
      label: 'LOIS Configuration',
      admin: {
        condition: (data) => data?.listingsSource === 'lois',
        description:
          'Configure the LOIS widget embed. These values come from your LocationOne account.',
      },
      fields: [
        {
          name: 'baseUrl',
          type: 'text',
          label: 'LOIS Base URL',
          required: true,
          admin: {
            placeholder: 'https://locationone.io',
            description:
              'The base URL of your LOIS instance (no trailing slash).',
          },
        },
        {
          name: 'organizationId',
          type: 'text',
          label: 'Organization ID',
          required: true,
          defaultValue: '59eaba35bec80e09b4bbfab1',
          admin: {
            description:
              'The data-organization attribute value from your LOIS embed code.',
          },
        },
      ],
    },
  ],
}
