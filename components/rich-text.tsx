'use client';
import React from 'react';
import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react';
import Markdown from 'react-markdown';

interface RichTextProps {
  data: any;
  className?: string;
}

export function RichText({ data, className }: RichTextProps) {
  if (!data) return null;

  // Markdown string (e.g. migrated from Tina CMS)
  if (typeof data === 'string') {
    return (
      <div className={className}>
        <Markdown>{data}</Markdown>
      </div>
    );
  }

  // Lexical JSON (native Payload rich text)
  return (
    <div className={className}>
      <PayloadRichText data={data} />
    </div>
  );
}
