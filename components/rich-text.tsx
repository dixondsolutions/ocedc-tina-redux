'use client';
import React from 'react';
import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react';
import Markdown from 'react-markdown';

interface RichTextProps {
  data: any;
  className?: string;
}

/**
 * Extract plain text from Lexical JSON nodes.
 * Returns all text concatenated with newlines between paragraphs.
 */
function extractLexicalText(node: any): string {
  if (!node) return '';
  if (typeof node.text === 'string') return node.text;
  if (Array.isArray(node.children)) {
    return node.children
      .map((child: any) => extractLexicalText(child))
      .join(node.type === 'root' ? '\n\n' : '');
  }
  return '';
}

/** Check if plain text contains markdown syntax */
function looksLikeMarkdown(text: string): boolean {
  return /^#{1,6}\s|\*\*|^\*\s|^-\s/m.test(text);
}

export function RichText({ data, className }: RichTextProps) {
  if (!data) return null;

  // Plain markdown string
  if (typeof data === 'string') {
    return (
      <div className={className}>
        <Markdown>{data}</Markdown>
      </div>
    );
  }

  // Lexical JSON with markdown stored as literal text (Tina CMS migration)
  if (data?.root) {
    const text = extractLexicalText(data.root);
    if (looksLikeMarkdown(text)) {
      return (
        <div className={className}>
          <Markdown>{text}</Markdown>
        </div>
      );
    }
  }

  // Native Lexical JSON
  return (
    <div className={className}>
      <PayloadRichText data={data} />
    </div>
  );
}
