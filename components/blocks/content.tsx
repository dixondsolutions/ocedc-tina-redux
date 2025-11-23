'use client';
import React from 'react';

import { TinaMarkdown } from 'tinacms/dist/rich-text';
import type { Template } from 'tinacms';
import { PageBlocksContent } from '../../tina/__generated__/types';
import { tinaField } from 'tinacms/dist/react';
import { Section } from '../layout/section';
import { Mermaid } from './mermaid';
import { sectionBlockSchemaField } from '../layout/section';
import { scriptCopyBlockSchema, ScriptCopyBtn } from '../magicui/script-copy-btn';

export const Content = ({ data }: { data: PageBlocksContent }) => {
  return (
    <Section 
      id={data.id || undefined} 
      background={data.style?.background || (data as any).background || undefined} 
      padding={data.style?.padding || "py-24"}
      width={data.style?.width || undefined}
      alignment={data.style?.alignment || undefined}
      className='prose prose-lg mx-auto prose-headings:uppercase prose-headings:tracking-wide prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:marker:text-primary' 
      data-tina-field={tinaField(data, 'body')}
    >
      <TinaMarkdown
        content={data.body}
        components={{
          mermaid: (props: any) => <Mermaid {...props} />,
          scriptCopyBlock: (props: any) => <ScriptCopyBtn {...props} />,
        }}
      />
    </Section>
  );
};

export const contentBlockSchema: Template = {
  name: 'content',
  label: 'Content',
  ui: {
    previewSrc: '/blocks/content.svg',
    defaultItem: {
      body: 'The Ogle County Economic Development Corporation (OCEDC) is dedicated to fostering economic growth and stability in our region. We work with businesses, local government, and community partners to create opportunities for prosperity.',
    },
    itemProps: (item) => ({ label: item.id || 'Content' }),
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: 'string',
      label: 'Section ID',
      name: 'id',
      description: 'Optional ID for anchor links (e.g., "mission")',
    },
    {
      type: 'rich-text',
      label: 'Body',
      name: 'body',
      templates: [scriptCopyBlockSchema],
    },
  ],
};
