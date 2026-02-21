'use client';
import React from 'react';

import { Section } from '../layout/section';
import { RichText } from '@/components/rich-text';

export const Content = ({ data }: { data: any }) => {
  return (
    <Section
      id={data.id || undefined}
      background={data.style?.background || (data as any).background || undefined}
      padding={data.style?.padding || "py-24"}
      width={data.style?.width || undefined}
      alignment={data.style?.alignment || undefined}
      className='prose prose-lg mx-auto prose-headings:uppercase prose-headings:tracking-wide prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:marker:text-primary'
    >
      <RichText data={data.body} />
    </Section>
  );
};
