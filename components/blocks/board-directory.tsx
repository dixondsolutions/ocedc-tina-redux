'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { PageBlocksBoardDirectory } from '@/tina/__generated__/types';
import client from '@/tina/__generated__/client';
import { Section, sectionBlockSchemaField } from '../layout/section';

const fallbackId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `id-${Math.random().toString(16).slice(2)}`;

type BoardMember = {
  id: string;
  name: string;
  title?: string | null;
  organization?: string | null;
  sector?: string | null;
  photo?: string | null;
  term?: string | null;
  committees?: (string | null)[] | null;
};

const sectorFilters = [
  { label: 'All', value: 'all' },
  { label: 'Public', value: 'public' },
  { label: 'Private', value: 'private' },
];

export const BoardDirectory = ({ data }: { data: PageBlocksBoardDirectory }) => {
  const [members, setMembers] = useState<BoardMember[]>([]);
  const [search, setSearch] = useState('');
  const [sector, setSector] = useState<'all' | 'public' | 'private'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const boardData = await client.queries.boardMembersConnection({
          last: 50,
        });
        const docs =
          boardData.data.boardMembersConnection.edges?.map((edge) => ({
            id: edge?.node?.id || edge?.cursor || fallbackId(),
            ...edge?.node,
          })) || [];
        setMembers(docs as BoardMember[]);
      } catch (error) {
        console.error('Error loading board members', error);
        setMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesSector = sector === 'all' || (member.sector || 'public') === sector;
      const matchesSearch =
        !search ||
        member.name.toLowerCase().includes(search.toLowerCase()) ||
        (member.organization || '').toLowerCase().includes(search.toLowerCase());
      return matchesSector && matchesSearch;
    });
  }, [members, search, sector]);

  return (
    <Section background={data.background!}>
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6">
        <div className="space-y-4 text-center">
          {data.highlight && (
            <span
              data-tina-field={tinaField(data, 'highlight')}
              className="mx-auto inline-flex rounded-full border border-primary/30 bg-primary/5 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary"
            >
              {data.highlight}
            </span>
          )}
          {data.title && (
            <h2
              data-tina-field={tinaField(data, 'title')}
              className="text-3xl font-bold uppercase tracking-wide text-foreground md:text-4xl"
            >
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

        <div className="flex flex-col gap-4 rounded-2xl border bg-white/80 p-4 shadow-sm ring-1 ring-black/5 dark:bg-slate-900/70 dark:ring-white/10 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-2">
            {sectorFilters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setSector(filter.value as typeof sector)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  sector === filter.value
                    ? 'bg-primary text-white shadow'
                    : 'bg-muted text-foreground hover:bg-muted/60'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <div className="w-full md:w-72">
            <label className="sr-only" htmlFor="board-search">
              Search board members
            </label>
            <input
              id="board-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name or organization"
              className="w-full rounded-full border border-border bg-white px-4 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center text-muted-foreground">Loading board members…</div>
        ) : filteredMembers.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">No board members match your filters.</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {filteredMembers.map((member) => (
              <article
                key={member.id}
                className="group flex flex-col gap-4 rounded-3xl border border-border/60 bg-white/60 p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg dark:bg-slate-900/70"
              >
                <div className="flex items-center gap-4">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="h-20 w-20 rounded-2xl object-cover ring-2 ring-primary/20"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-muted text-2xl font-semibold">
                      {member.name
                        .split(' ')
                        .map((part) => part[0])
                        .join('')
                        .slice(0, 2)}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                      {member.sector === 'private' ? 'Private Sector' : 'Public Sector'}
                    </p>
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.title}</p>
                    <p className="text-sm text-muted-foreground">{member.organization}</p>
                  </div>
                </div>

                {member.term && (
                  <p className="text-sm font-medium text-foreground/80">
                    Term: <span className="font-semibold text-foreground">{member.term}</span>
                  </p>
                )}

                {member.committees && member.committees.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {member.committees.map(
                      (committee) =>
                        committee && (
                          <span
                            key={committee}
                            className="rounded-full bg-primary/5 px-3 py-1 text-xs font-semibold text-primary"
                          >
                            {committee}
                          </span>
                        ),
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
};

export const boardDirectoryBlockSchema: Template = {
  name: 'boardDirectory',
  label: 'Board Directory',
  ui: {
    previewSrc: '/blocks/content.png',
    defaultItem: {
      title: 'Board of Directors',
      description: 'Public-private leadership guiding Ogle County’s economic agenda.',
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: 'string',
      label: 'Highlight',
      name: 'highlight',
    },
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
  ],
};

