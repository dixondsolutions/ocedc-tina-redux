'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowRight, Loader2, Search } from 'lucide-react';

import { Section } from '../layout/section';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { RichText } from '@/components/rich-text';

const getMediaUrl = (media: any): string | null => {
  if (!media) return null;
  if (typeof media === 'string') return media;
  return media.url || null;
};

type PostRecord = {
  id: string;
  title: string;
  slug?: string;
  date?: string | null;
  excerpt?: unknown;
  heroImg?: any;
  tags: string[];
  url: string;
  author?: {
    name?: string | null;
    avatar?: any;
  };
};

const fallbackId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `post-${Math.random().toString(16).slice(2)}`;

const safeDate = (value?: string | null) => {
  if (!value) return '';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return '';
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

function normalizePosts(docs: any[]): PostRecord[] {
  return docs.filter(Boolean).map((node: any) => {
    const slug = node?.slug || node?.id || '';
    return {
      id: node?.id || fallbackId(),
      title: node?.title || 'Untitled update',
      date: node?.date,
      excerpt: node?.excerpt,
      heroImg: node?.heroImg,
      tags:
        node?.tags
          ?.map((tag: any) =>
            typeof tag === 'string' ? tag : tag?.tag?.name || tag?.name,
          )
          .filter((tag: any): tag is string => Boolean(tag)) || [],
      url: slug ? `/news/${slug}` : '/news',
      author: {
        name: node?.author?.name,
        avatar: node?.author?.avatar,
      },
    };
  });
}

export const NewsArchive = ({ data }: { data: any }) => {
  const perPage = Math.max(3, Math.min(100, data.postsToLoad || 9));

  const [posts, setPosts] = useState<PostRecord[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  const fetchPage = useCallback(
    async (pageNum: number, append: boolean) => {
      if (append) setLoadingMore(true);
      else setLoading(true);

      try {
        const response = await fetch(
          `/api/posts?limit=${perPage}&page=${pageNum}&sort=-date&depth=2`,
        );
        const result = await response.json();
        const normalized = normalizePosts(result.docs || []);

        setPosts((prev) => (append ? [...prev, ...normalized] : normalized));
        setHasNextPage(result.hasNextPage ?? false);
        setPage(pageNum);
      } catch (error) {
        console.error('Error loading news posts', error);
        if (!append) setPosts([]);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [perPage],
  );

  useEffect(() => {
    fetchPage(1, false);
  }, [fetchPage]);

  const handleLoadMore = () => {
    if (!loadingMore && hasNextPage) {
      fetchPage(page + 1, true);
    }
  };

  const categories = useMemo(() => {
    const unique = new Set<string>();
    posts.forEach((post) => post.tags.forEach((tag) => unique.add(tag)));
    return ['all', ...Array.from(unique).sort((a, b) => a.localeCompare(b))];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory =
        category === 'all' || post.tags.includes(category);
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
        {/* Header */}
        <div className="space-y-4 text-center">
          {data.title && (
            <h2 className="text-pretty text-3xl font-semibold md:text-4xl">
              {data.title}
            </h2>
          )}
          {data.description && (
            <p className="mx-auto max-w-3xl text-base text-muted-foreground md:text-lg">
              {data.description}
            </p>
          )}
        </div>

        {/* Search + CTA bar */}
        <div className="grid gap-4 rounded-3xl border border-border bg-white/80 p-5 shadow-sm ring-1 ring-black/5 dark:bg-slate-900/80 dark:ring-white/10 md:grid-cols-[1fr_auto] md:items-center">
          <label className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-2 shadow-inner focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30 dark:bg-slate-900/70">
            <Search
              className="size-4 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="sr-only">Search news posts</span>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder={
                data.searchPlaceholder ||
                'Search announcements, grants, or events'
              }
              className="w-full border-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </label>
          {data.ctaLabel && data.ctaHref && (
            <Link
              href={data.ctaHref}
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-primary/90"
            >
              {data.ctaLabel}
            </Link>
          )}
        </div>

        {/* Category filter pills */}
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {categories.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setCategory(value)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                  category === value
                    ? 'bg-primary text-white shadow'
                    : 'border border-primary/20 bg-transparent text-foreground hover:border-primary/40 hover:bg-primary/10'
                }`}
              >
                {value === 'all' ? 'All topics' : value}
              </button>
            ))}
          </div>
        )}

        {/* Posts grid */}
        {loading ? (
          <div className="py-16 text-center text-sm text-muted-foreground">
            Loading recent news…
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="py-16 text-center text-sm text-muted-foreground">
            {data.emptyState || 'No news posts match your filters yet.'}
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => {
                const heroUrl = getMediaUrl(post.heroImg);
                const authorAvatarUrl = getMediaUrl(post.author?.avatar);
                return (
                  <article
                    key={post.id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 dark:bg-[#1b1f24]"
                  >
                    {/* Image */}
                    <Link href={post.url} className="block">
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                        {heroUrl ? (
                          <Image
                            src={heroUrl}
                            alt={post.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 text-primary/40">
                            <svg className="size-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2zM9 10a2 2 0 100-4 2 2 0 000 4zm12 8l-4.35-4.35a1.5 1.5 0 00-2.12 0L3 20" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-5">
                      {/* Tags */}
                      {post.tags.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-2">
                          {post.tags.slice(0, 2).map((tag) => (
                            <button
                              key={`${post.id}-${tag}`}
                              type="button"
                              onClick={() => setCategory(tag)}
                              className="rounded-full bg-primary/5 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-primary hover:bg-primary/10"
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-lg font-semibold leading-snug text-foreground">
                        <Link
                          href={post.url}
                          className="hover:text-primary transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h3>

                      {post.excerpt ? (
                        <div className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                          {typeof post.excerpt === 'string' ? (
                            <p>{post.excerpt}</p>
                          ) : (
                            <RichText data={post.excerpt} />
                          )}
                        </div>
                      ) : null}

                      {/* Meta row */}
                      <div className="mt-auto flex items-center gap-3 pt-5 text-xs text-muted-foreground">
                        <Avatar className="size-6">
                          {authorAvatarUrl && (
                            <AvatarImage
                              src={authorAvatarUrl}
                              alt={post.author?.name || 'OCEDC'}
                            />
                          )}
                          <AvatarFallback className="text-[10px]">
                            {(post.author?.name || 'OC')
                              .slice(0, 2)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span>{post.author?.name || 'OCEDC Team'}</span>
                        <span className="text-border">•</span>
                        <span>{safeDate(post.date)}</span>
                      </div>

                      {/* Read more */}
                      <Link
                        href={post.url}
                        className="mt-4 inline-flex items-center text-sm font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        Read more
                        <ArrowRight className="ml-1.5 size-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Load More button */}
            {hasNextPage && !searchTerm && category === 'all' && (
              <div className="flex justify-center pt-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="rounded-full px-8"
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Loading…
                    </>
                  ) : (
                    'Load More'
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </Section>
  );
};
