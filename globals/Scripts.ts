import type { GlobalConfig } from 'payload'

export const Scripts: GlobalConfig = {
  slug: 'scripts',
  label: 'Scripts & Analytics',
  access: {
    read: () => true,
  },
  admin: {
    description:
      'Manage analytics integrations, site verification codes, and custom script embeds.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Analytics',
          description: 'Configure analytics and tracking integrations.',
          fields: [
            {
              name: 'googleTagManager',
              type: 'group',
              label: 'Google Tag Manager',
              admin: {
                description:
                  'Enter your GTM Container ID (e.g., GTM-XXXXXXX). GTM can manage all other analytics tags internally.',
              },
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  label: 'Enable Google Tag Manager',
                  defaultValue: false,
                },
                {
                  name: 'containerId',
                  type: 'text',
                  label: 'Container ID',
                  admin: {
                    placeholder: 'GTM-XXXXXXX',
                    condition: (data) => data?.googleTagManager?.enabled,
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Verification',
          description:
            'Site verification meta tags for search engines and webmaster tools.',
          fields: [
            {
              name: 'verification',
              type: 'group',
              label: 'Verification Codes',
              fields: [
                {
                  name: 'googleSearchConsole',
                  type: 'text',
                  label: 'Google Search Console',
                  admin: {
                    description:
                      'The content value from your google-site-verification meta tag.',
                    placeholder: 'abc123...',
                  },
                },
                {
                  name: 'bingWebmaster',
                  type: 'text',
                  label: 'Bing Webmaster Tools',
                  admin: {
                    description:
                      'The content value from your msvalidate.01 meta tag.',
                    placeholder: 'abc123...',
                  },
                },
                {
                  name: 'yandex',
                  type: 'text',
                  label: 'Yandex Webmaster',
                  admin: {
                    description:
                      'The content value from your yandex-verification meta tag.',
                    placeholder: 'abc123...',
                  },
                },
                {
                  name: 'pinterest',
                  type: 'text',
                  label: 'Pinterest',
                  admin: {
                    description:
                      'The content value from your p:domain_verify meta tag.',
                    placeholder: 'abc123...',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Custom Scripts',
          description:
            'Add custom JavaScript embeds. Only admin users can modify these.',
          fields: [
            {
              name: 'customScripts',
              type: 'array',
              label: 'Custom Scripts',
              admin: {
                description:
                  'Add custom JavaScript snippets. These run on every page. Use with caution — malformed scripts can break the site.',
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  label: 'Script Name',
                  required: true,
                  admin: {
                    description:
                      'A descriptive name for this script (e.g., "HubSpot Chat Widget").',
                  },
                },
                {
                  name: 'enabled',
                  type: 'checkbox',
                  label: 'Enabled',
                  defaultValue: true,
                },
                {
                  name: 'scriptType',
                  type: 'select',
                  label: 'Script Type',
                  defaultValue: 'external',
                  options: [
                    { label: 'External (src URL)', value: 'external' },
                    { label: 'Inline Code', value: 'inline' },
                  ],
                  admin: {
                    description:
                      'External loads a script from a URL. Inline lets you enter raw JavaScript.',
                  },
                },
                {
                  name: 'src',
                  type: 'text',
                  label: 'Script URL',
                  admin: {
                    placeholder: 'https://example.com/widget.js',
                    description: 'The URL of the external script to load.',
                    condition: (data, siblingData) =>
                      siblingData?.scriptType === 'external',
                  },
                },
                {
                  name: 'dataAttributes',
                  type: 'array',
                  label: 'Data Attributes',
                  admin: {
                    description:
                      'Add data-* attributes to the script tag (e.g., data-client-id).',
                    condition: (data, siblingData) =>
                      siblingData?.scriptType === 'external',
                  },
                  fields: [
                    {
                      name: 'key',
                      type: 'text',
                      label: 'Attribute Name',
                      required: true,
                      admin: {
                        placeholder: 'data-client-id',
                        description:
                          'The attribute name including the data- prefix.',
                      },
                    },
                    {
                      name: 'value',
                      type: 'text',
                      label: 'Attribute Value',
                      required: true,
                    },
                  ],
                },
                {
                  name: 'placement',
                  type: 'select',
                  label: 'Placement',
                  defaultValue: 'bodyEnd',
                  options: [
                    { label: 'Head', value: 'head' },
                    { label: 'Body (Start)', value: 'bodyStart' },
                    { label: 'Body (End)', value: 'bodyEnd' },
                  ],
                  admin: {
                    description:
                      'Where in the HTML document this script should be placed.',
                  },
                },
                {
                  name: 'strategy',
                  type: 'select',
                  label: 'Loading Strategy',
                  defaultValue: 'afterInteractive',
                  options: [
                    {
                      label: 'After Interactive (recommended)',
                      value: 'afterInteractive',
                    },
                    { label: 'Lazy on Load', value: 'lazyOnload' },
                  ],
                  admin: {
                    description:
                      'Controls when the script loads. "After Interactive" loads after page hydration. "Lazy on Load" loads during idle time.',
                  },
                },
                {
                  name: 'code',
                  type: 'code',
                  label: 'Script Code',
                  admin: {
                    language: 'javascript',
                    description:
                      'Enter raw JavaScript code (without <script> tags).',
                    condition: (data, siblingData) =>
                      siblingData?.scriptType === 'inline',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
