'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import Link from 'next/link';
import { Section } from '../layout/section';

const getMediaUrl = (media: any): string | null => {
  if (!media) return null;
  if (typeof media === 'string') return media;
  return media.url || null;
};

const fallbackId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `resource-${Math.random().toString(16).slice(2)}`;

type ResourceRecord = {
  id: string;
  title: string;
  description?: string | null;
  category?: string | null;
  linkType?: string | null;
  file?: any;
  url?: string | null;
  date?: string | null;
};

export const ResourceLibrary = ({ data }: { data: any }) => {
  const [resources, setResources] = useState<ResourceRecord[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch('/api/resources?limit=100&depth=1');
        const result = await response.json();
        const docs = (result.docs || []).map((doc: any) => ({
          id: doc.id || fallbackId(),
          title: doc.title,
          description: doc.description,
          category: doc.category,
          linkType: doc.linkType,
          file: doc.file,
          url: doc.url,
          date: doc.date,
        }));
        setResources(docs as ResourceRecord[]);
      } catch (error) {
        console.error('Error loading resources', error);
        setResources([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(resources.map((resource) => resource.category || 'other'));
    return ['all', ...Array.from(unique)];
  }, [resources]);

  const filteredResources = useMemo(() => {
    if (activeCategory === 'all') {
      return resources;
    }
    return resources.filter((resource) => (resource.category || 'other') === activeCategory);
  }, [resources, activeCategory]);

  return (
    <Section background={data.style?.background || undefined}>
      <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6">
        <div className="space-y-4 text-center">
          {data.title && (
            <h2 className="text-3xl font-bold uppercase tracking-wide text-foreground md:text-4xl">
              {data.title}
            </h2>
          )}
          {data.description && (
            <p
              className="mx-auto max-w-3xl text-base text-muted-foreground md:text-lg"
            >
              {data.description}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-white/70 p-4 shadow-sm ring-1 ring-black/5 dark:bg-slate-900/70 dark:ring-white/10">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition ${
                  activeCategory === category ? 'bg-primary text-white shadow' : 'bg-muted text-foreground hover:bg-muted/60'
                }`}
              >
                {category === 'all' ? 'All' : category.replace(/_/g, ' ')}
              </button>
            ))}
          </div>

          {data.ctaLabel && data.ctaHref && (
            <Link
              href={data.ctaHref}
              className="rounded-full border border-primary bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
            >
              {data.ctaLabel}
            </Link>
          )}
        </div>

        {loading ? (
          <div className="py-12 text-center text-muted-foreground">Loading resources…</div>
        ) : filteredResources.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">No resources in this category yet.</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredResources.map((resource) => {
              const fileUrl = getMediaUrl(resource.file);
              const isUrl = resource.linkType === 'url';
              const href = isUrl ? resource.url : fileUrl;
              const linkLabel = isUrl ? 'Visit Resource →' : 'Download PDF →';
              return (
              <article
                key={resource.id}
                className="flex h-full flex-col justify-between rounded-3xl border border-border bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg dark:bg-slate-900/80"
              >
                <div className="space-y-3">
                  <span className="inline-flex items-center rounded-full bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                    {(resource.category || 'other').replace(/_/g, ' ')}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground">{resource.title}</h3>
                  {resource.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">{resource.description}</p>
                  )}
                </div>
                <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
                  <span>{resource.date ? format(new Date(resource.date), 'MMM dd, yyyy') : 'Updated quarterly'}</span>
                  {href && (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-primary hover:underline"
                    >
                      {linkLabel}
                    </a>
                  )}
                </div>
              </article>
            )})}
          </div>
        )}
      </div>
    </Section>
  );
};
