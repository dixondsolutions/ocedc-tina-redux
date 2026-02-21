'use client';
import React from 'react';
import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react';

interface RichTextProps {
  data: any;
  className?: string;
}

export function RichText({ data, className }: RichTextProps) {
  if (!data) return null;

  return (
    <div className={className}>
      <PayloadRichText data={data} />
    </div>
  );
}
