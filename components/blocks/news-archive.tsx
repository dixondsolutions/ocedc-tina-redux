'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { ArrowRight, Search } from 'lucide-react';

import client from '@/tina/__generated__/client';
import { PageBlocksNewsArchive } from '@/tina/__generated__/types';
import { Section, sectionBlockSchemaField } from '../layout/section';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type PostRecord = {
  id: string;
  title: string;
  date?: string | null;
  excerpt?: unknown;
  heroImg?: string | null;
  tags: string[];
  url: string;
  author?: {
    name?: string | null;
    avatar?: string | null;
  };
};

const fallbackId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `post-${Math.random().toString(16).slice(2)}`;

const safeDate = (value?: string | null) => {
  if (!value) return '';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return '';
  }
  return format(parsed, 'MMM dd, yyyy');
};

const excerptToText = (value: unknown): string => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) {
    return value
      .map((node: any) => excerptToText(node?.children || node?.text))
      .join(' ');
  }
  if (typeof value === 'object' && 'text' in (value as Record<string, unknown>)) {
    return String((value as Record<string, unknown>).text || '');
  }
  return '';
};

export const NewsArchive = ({ data }: { data: PageBlocksNewsArchive }) => {
  const [posts, setPosts] = useState<PostRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const limit = Math.max(3, Math.min(100, data.postsToLoad || 24));
        const response = await client.queries.postConnection({
          sort: 'date',
          last: limit,
        });
        const normalized =
          response.data.postConnection.edges
            ?.map((edge) => edge?.node)
            .filter(Boolean)
            .map((node) => {
              const slug = node?._sys?.breadcrumbs?.join('/') || '';
              return {
              id: node?.id || fallbackId(),
              title: node?.title || 'Untitled update',
              date: node?.date,
              excerpt: node?.excerpt,
              heroImg: node?.heroImg,
              tags:
                node?.tags
                  ?.map((tag) => tag?.tag?.name)
                  .filter((tag): tag is string => Boolean(tag)) || [],
              url: slug ? `/news/${slug}` : '/news',
              author: {
                name: node?.author?.name,
                avatar: node?.author?.avatar,
              },
            };
          }) || [];
        setPosts(normalized);
      } catch (error) {
        console.error('Error loading news posts', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [data.postsToLoad]);

  const categories = useMemo(() => {
    const unique = new Set<string>();
    posts.forEach((post) => post.tags.forEach((tag) => unique.add(tag)));
    return ['all', ...Array.from(unique).sort((a, b) => a.localeCompare(b))];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = category === 'all' || post.tags.includes(category);
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        excerptToText(post.excerpt).toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [posts, category, searchTerm]);

  return (
    <Section background={data.style?.background || undefined}>
      <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6">
        <div className="space-y-4 text-center">
          {data.title && (
            <h2 data-tina-field={tinaField(data, 'title')} className="text-pretty text-3xl font-semibold md:text-4xl">
              {data.title}
            </h2>
          )}
          {data.description && (
            <p
              data-tina-field={tinaField(data, 'description')}
              className="mx-auto max-w-3xl text-base text-muted-foreground md:text-lg"
            >
              {data.description}
            </p>
          )}
        </div>

        <div className="grid gap-4 rounded-3xl border border-border bg-white/80 p-5 shadow-sm ring-1 ring-black/5 dark:bg-slate-900/80 dark:ring-white/10 md:grid-cols-[1fr_auto] md:items-center">
          <label className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-2 shadow-inner focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30 dark:bg-slate-900/70">
            <Search className="size-4 text-muted-foreground" aria-hidden="true" />
            <span className="sr-only">Search news posts</span>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder={data.searchPlaceholder || 'Search announcements, grants, or events'}
              className="w-full border-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </label>
          {data.ctaLabel && data.ctaHref && (
            <Link
              href={data.ctaHref}
              data-tina-field={tinaField(data, 'ctaLabel')}
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-primary/90"
            >
              {data.ctaLabel}
            </Link>
          )}
        </div>

        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {categories.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setCategory(value)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                  category === value ? 'bg-primary text-white shadow' : 'bg-transparent border border-primary/20 text-foreground hover:bg-primary/10 hover:border-primary/40'
                }`}
              >
                {value === 'all' ? 'All topics' : value}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="py-16 text-center text-sm text-muted-foreground">Loading recent news…</div>
        ) : filteredPosts.length === 0 ? (
          <div className="py-16 text-center text-sm text-muted-foreground">
            {data.emptyState || 'No news posts match your filters yet.'}
          </div>
        ) : (
          <div className="grid gap-y-10 sm:grid-cols-12 sm:gap-y-12 md:gap-y-16 lg:gap-y-20">
            {filteredPosts.map((post) => (
              <Card
                key={post.id}
                className="order-last border-0 bg-transparent shadow-none sm:order-first sm:col-span-12 lg:col-span-10 lg:col-start-2"
              >
                <div className="grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 sm:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-12">
                  <div className="sm:col-span-5">
                    {post.tags.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-3 text-xs uppercase tracking-wider text-muted-foreground md:gap-5 lg:gap-6">
                        {post.tags.map((tag) => (
                          <button
                            key={`${post.id}-${tag}`}
                            type="button"
                            onClick={() => setCategory(tag)}
                            className="hover:text-primary"
                            aria-label={`Filter by ${tag}`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    )}
                    <h3 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                      <Link href={post.url} className="hover:underline">
                        {post.title}
                      </Link>
                    </h3>
                    <div className="mt-4 text-muted-foreground md:mt-5">
                      {post.excerpt ? (
                        typeof post.excerpt === 'string' ? (
                          <p>{post.excerpt}</p>
                        ) : (
                          <TinaMarkdown content={post.excerpt as any} />
                        )
                      ) : null}
                    </div>
                    <div className="mt-6 flex items-center space-x-4 text-sm md:mt-8">
                      <Avatar>
                        {post.author?.avatar && (
                          <AvatarImage src={post.author.avatar} alt={post.author?.name || 'OCEDC'} className="h-8 w-8" />
                        )}
                        <AvatarFallback>
                          {(post.author?.name || 'OC').slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-muted-foreground">{post.author?.name || 'OCEDC Team'}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{safeDate(post.date)}</span>
                    </div>
                    <div className="mt-6 flex items-center space-x-2 md:mt-8">
                      <Link href={post.url} className="inline-flex items-center font-semibold hover:underline md:text-base">
                        <span>Read more</span>
                        <ArrowRight className="ml-2 size-4 transition-transform" />
                      </Link>
                    </div>
                  </div>
                  {post.heroImg && (
                    <div className="order-first sm:order-last sm:col-span-5">
                      <Link href={post.url} className="block">
                        <div className="aspect-[16/9] overflow-clip rounded-lg border border-border">
                          <Image
                            width={533}
                            height={300}
                            src={post.heroImg}
                            alt={post.title}
                            className="h-full w-full object-cover transition-opacity duration-200 hover:opacity-80"
                          />
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
};

export const newsArchiveBlockSchema: Template = {
  name: 'newsArchive',
  label: 'News Archive',
  ui: {
    previewSrc: '/blocks/news-archive.svg',
    defaultItem: {
      title: 'News & Resources',
      description: 'Browse announcements, incentives, grants, and meeting recaps from OCEDC.',
      postsToLoad: 24,
      searchPlaceholder: 'Search announcements, grants, or meetings',
    },
    itemProps: (item) => ({ label: item.title || 'News Archive' }),
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: 'string',
      label: 'Title',
      name: 'title',
    },
    {
      type: 'string',
      label: 'Description',
      name: 'description',
      ui: {
        component: 'textarea',
      },
    },
    {
      type: 'string',
      label: 'Search Placeholder',
      name: 'searchPlaceholder',
    },
    {
      type: 'string',
      label: 'Empty State Text',
      name: 'emptyState',
    },
    {
      type: 'string',
      label: 'CTA Label',
      name: 'ctaLabel',
    },
    {
      type: 'string',
      label: 'CTA Link',
      name: 'ctaHref',
    },
    {
      type: 'number',
      label: 'Maximum Posts to Load',
      name: 'postsToLoad',
    },
  ],
};


