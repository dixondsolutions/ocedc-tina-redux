'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { MapPin, SlidersHorizontal } from 'lucide-react';
import client from '@/tina/__generated__/client';
import { PageBlocksPropertyExplorer } from '@/tina/__generated__/types';
import { Section, sectionBlockSchemaField } from '../layout/section';

const fallbackId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `property-${Math.random().toString(16).slice(2)}`;

type PropertyRecord = {
  id: string;
  name: string;
  location?: string | null;
  type?: string | null;
  size?: string | null;
  price?: string | null;
  utilities?: (string | null)[] | null;
  railAccess?: boolean | null;
  zoning?: string | null;
  status?: string | null;
  gallery?: (string | null)[] | null;
  _sys: {
    filename: string;
  };
};

const utilityOptions = [
  { label: 'Electric', value: 'electric' },
  { label: 'Gas', value: 'gas' },
  { label: 'Water', value: 'water' },
  { label: 'Sewer', value: 'sewer' },
  { label: 'Fiber', value: 'fiber' },
];

const sizeFilters = [
  { label: 'All sizes', value: 'all' },
  { label: 'Up to 25 acres', value: '0-25' },
  { label: '26-100 acres', value: '26-100' },
  { label: '100+ acres', value: '100+' },
  { label: '50k+ sq ft', value: 'sqft' },
];

const parseSizeNumber = (size?: string | null) => {
  if (!size) return 0;
  const numberMatch = size.replace(/,/g, '').match(/[\d.]+/);
  if (!numberMatch) return 0;
  return parseFloat(numberMatch[0]);
};

const sizeMatcher = (size: string | null | undefined, filter: string) => {
  if (!size || filter === 'all') return true;
  const numeric = parseSizeNumber(size);
  const acres = /acre/i.test(size);
  if (filter === 'sqft') {
    return /sq ?ft/i.test(size) || (!acres && numeric >= 50000);
  }
  if (!acres) {
    return filter === 'sqft' || filter === 'all';
  }
  if (filter === '0-25') return numeric <= 25;
  if (filter === '26-100') return numeric > 25 && numeric <= 100;
  if (filter === '100+') return numeric > 100;
  return true;
};

export const PropertyExplorer = ({ data }: { data: PageBlocksPropertyExplorer }) => {
  const [properties, setProperties] = useState<PropertyRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [railOnly, setRailOnly] = useState(false);
  const [sizeFilter, setSizeFilter] = useState('all');
  const [utilityFilter, setUtilityFilter] = useState<string[]>([]);
  const [view, setView] = useState<'list' | 'map'>('list');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const propertyData = await client.queries.propertiesConnection({
          last: 100,
        });
        const docs =
          propertyData.data.propertiesConnection.edges?.map((edge) => ({
            id: edge?.node?.id || edge?.cursor || fallbackId(),
            ...edge?.node,
          })) || [];
        setProperties(docs as PropertyRecord[]);
      } catch (error) {
        console.error('Error loading properties', error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filtered = useMemo(() => {
    return properties.filter((property) => {
      const matchesType = typeFilter === 'all' || property.type === typeFilter;
      const matchesRail = !railOnly || property.railAccess;
      const matchesUtilities =
        utilityFilter.length === 0 ||
        utilityFilter.every((utility) => property.utilities?.includes(utility));
      const matchesSize = sizeMatcher(property.size, sizeFilter);
      const matchesSearch =
        !search ||
        property.name.toLowerCase().includes(search.toLowerCase()) ||
        (property.location || '').toLowerCase().includes(search.toLowerCase());
      return matchesType && matchesRail && matchesUtilities && matchesSize && matchesSearch;
    });
  }, [properties, typeFilter, railOnly, utilityFilter, sizeFilter, search]);

  const toggleUtility = (utility: string) => {
    setUtilityFilter((prev) =>
      prev.includes(utility) ? prev.filter((item) => item !== utility) : [...prev, utility],
    );
  };

  return (
    <Section background={data.background!}>
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

        <div className="grid gap-4 rounded-3xl border border-border bg-white/80 p-6 shadow-md ring-1 ring-black/5 dark:bg-slate-900/80 dark:ring-white/10 md:grid-cols-4">
          <label className="flex flex-col gap-2 text-sm font-semibold text-muted-foreground">
            Search
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Property name or community"
              className="rounded-2xl border border-border bg-white px-4 py-2 text-sm shadow-inner focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-semibold text-muted-foreground">
            Property Type
            <select
              value={typeFilter}
              onChange={(event) => setTypeFilter(event.target.value)}
              className="rounded-2xl border border-border bg-white px-4 py-2 text-sm shadow-inner focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="all">All assets</option>
              <option value="site">Sites</option>
              <option value="building">Buildings</option>
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-semibold text-muted-foreground">
            Size
            <select
              value={sizeFilter}
              onChange={(event) => setSizeFilter(event.target.value)}
              className="rounded-2xl border border-border bg-white px-4 py-2 text-sm shadow-inner focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              {sizeFilters.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center justify-between gap-2 rounded-2xl border border-border bg-white px-4 py-2 text-sm font-semibold text-muted-foreground shadow-inner">
            Rail Access Only
            <input
              type="checkbox"
              checked={railOnly}
              onChange={(event) => setRailOnly(event.target.checked)}
              className="size-4 rounded border-border text-primary focus:ring-primary/40"
            />
          </label>

          <div className="md:col-span-4">
            <p className="text-sm font-semibold text-muted-foreground">Utilities</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {utilityOptions.map((utility) => (
                <button
                  key={utility.value}
                  type="button"
                  onClick={() => toggleUtility(utility.value)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide transition ${
                    utilityFilter.includes(utility.value)
                      ? 'bg-primary text-white shadow'
                      : 'bg-muted text-foreground hover:bg-muted/70'
                  }`}
                >
                  {utility.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex rounded-full border border-border bg-white/70 p-1 text-sm font-semibold shadow-sm">
            {(['list', 'map'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setView(mode)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 transition ${
                  view === mode ? 'bg-primary text-white shadow' : 'text-muted-foreground'
                }`}
              >
                {mode === 'list' ? <SlidersHorizontal className="size-4" /> : <MapPin className="size-4" />}
                <span className="capitalize">{mode} view</span>
              </button>
            ))}
          </div>

          {data.ctaHref && data.ctaLabel && (
            <Link
              href={data.ctaHref}
              data-tina-field={tinaField(data, 'ctaHref')}
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow hover:bg-primary/90"
            >
              {data.ctaLabel}
            </Link>
          )}
        </div>

        {loading ? (
          <div className="py-16 text-center text-muted-foreground">Loading available properties…</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground">No properties match your filters yet.</div>
        ) : view === 'list' ? (
          <div className="grid gap-6 md:grid-cols-2">
            {filtered.map((property) => (
              <article
                key={property.id}
                className="flex h-full flex-col gap-4 rounded-3xl border border-border/70 bg-white/80 p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg dark:bg-slate-900/70"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                    {property.type}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                      property.status === 'available'
                        ? 'bg-emerald-100 text-emerald-700'
                        : property.status === 'under_contract'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {(property.status || 'available').replace(/_/g, ' ')}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    <Link href={`/properties/${property._sys.filename}`} className="hover:underline">
                      {property.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground">{property.location}</p>
                </div>

                <dl className="grid grid-cols-2 gap-3 rounded-2xl bg-muted/70 p-4 text-sm">
                  <div>
                    <dt className="font-semibold text-muted-foreground">Size</dt>
                    <dd className="text-foreground">{property.size}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-muted-foreground">Asking</dt>
                    <dd className="text-foreground">{property.price || 'Contact for details'}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-muted-foreground">Zoning</dt>
                    <dd className="text-foreground">{property.zoning || 'Industrial'}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-muted-foreground">Rail</dt>
                    <dd className="text-foreground">{property.railAccess ? 'Yes' : 'Nearby'}</dd>
                  </div>
                </dl>

                {property.utilities && property.utilities.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {property.utilities.map(
                      (utility) =>
                        utility && (
                          <span key={utility} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-muted-foreground shadow">
                            {utility}
                          </span>
                        ),
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 text-sm font-semibold">
                  <Link href={`/properties/${property._sys.filename}`} className="text-primary hover:underline">
                    View details →
                  </Link>
                  <Link href="/contact" className="text-muted-foreground hover:text-primary">
                    Connect with OCEDC
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
            <div className="overflow-hidden rounded-3xl border border-border shadow-lg">
              <iframe
                title="Ogle County Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d190255.3385834626!2d-89.5572836!3d42.0405672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880890098e98c55f%3A0x6040856098480!2sOgle%20County%2C%20IL!5e0!3m2!1sen!2sus!4v1629482758293!5m2!1sen!2sus"
                className="h-[420px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="space-y-4 rounded-3xl border border-border bg-white/90 p-4 shadow-sm dark:bg-slate-900/70">
              <p className="text-sm font-medium text-muted-foreground">
                {filtered.length} active listings match your filters. Select any site for a deeper dive or tap back to list
                view for full specifications.
              </p>
              <div className="flex flex-col gap-3 overflow-auto">
                {filtered.map((property) => (
                  <Link
                    key={property.id}
                    href={`/properties/${property._sys.filename}`}
                    className="rounded-2xl border border-border/60 bg-white px-4 py-3 text-sm font-semibold text-foreground shadow hover:border-primary/60 hover:text-primary dark:bg-slate-900/70"
                  >
                    {property.name} · {property.size} · {property.location}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
};

export const propertyExplorerBlockSchema: Template = {
  name: 'propertyExplorer',
  label: 'Property Explorer',
  ui: {
    previewSrc: '/blocks/content.png',
    defaultItem: {
      title: 'Explore Sites & Buildings',
      description: 'Filter available properties by size, utilities, and rail access.',
      ctaLabel: 'Submit a project',
      ctaHref: '/contact',
    },
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
      label: 'CTA Label',
      name: 'ctaLabel',
    },
    {
      type: 'string',
      label: 'CTA Link',
      name: 'ctaHref',
    },
  ],
};

