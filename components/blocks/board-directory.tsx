'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Section } from '../layout/section';

const getMediaUrl = (media: any): string | null => {
  if (!media) return null;
  if (typeof media === 'string') return media;
  return media.url || null;
};

const fallbackId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `id-${Math.random().toString(16).slice(2)}`;

type BoardMember = {
  id: string;
  name: string;
  title?: string | null;
  organization?: string | null;
  sector?: string | null;
  photo?: any;
  term?: string | null;
  committees?: (string | null)[] | null;
};

const sectorFilters = [
  { label: 'All', value: 'all' },
  { label: 'Public', value: 'public' },
  { label: 'Private', value: 'private' },
];

export const BoardDirectory = ({ data }: { data: any }) => {
  const [members, setMembers] = useState<BoardMember[]>([]);
  const [search, setSearch] = useState('');
  const [sector, setSector] = useState<'all' | 'public' | 'private'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('/api/board-members?limit=100&depth=1');
        const result = await response.json();
        const docs = (result.docs || []).map((doc: any) => ({
          id: doc.id || fallbackId(),
          name: doc.name,
          title: doc.title,
          organization: doc.organization,
          sector: doc.sector,
          photo: doc.photo,
          term: doc.term,
          committees: doc.committees,
        }));
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
    <Section background={data.style?.background || undefined} className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6">
        <div className="space-y-4 text-center">
          {data.highlight && (
            <span
              className="mx-auto inline-flex rounded-full border border-primary/30 bg-primary/5 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary"
            >
              {data.highlight}
            </span>
          )}
          {data.title && (
            <h2
              className="text-3xl font-bold uppercase tracking-wide text-foreground md:text-4xl"
            >
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

        <div className="flex flex-col gap-4 rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm ring-1 ring-border/50 md:flex-row md:items-center md:justify-between backdrop-blur-sm">
          <div className="flex gap-2">
            {sectorFilters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setSector(filter.value as typeof sector)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  sector === filter.value
                    ? 'bg-primary text-primary-foreground shadow'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
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
              className="w-full rounded-full border border-border bg-background px-4 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center text-muted-foreground">Loading board members…</div>
        ) : filteredMembers.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">No board members match your filters.</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {filteredMembers.map((member) => {
              const photoUrl = getMediaUrl(member.photo);
              return (
              <article
                key={member.id}
                className="group flex flex-col gap-4 rounded-3xl border border-border/50 bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="flex items-center gap-4">
                  {photoUrl ? (
                    <Image
                      src={photoUrl}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="h-20 w-20 rounded-2xl object-cover ring-2 ring-border group-hover:ring-primary/20 transition-all"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-muted text-2xl font-semibold text-muted-foreground">
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
                    <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.title}</p>
                    <p className="text-sm text-muted-foreground">{member.organization}</p>
                  </div>
                </div>

                {member.term && (
                  <p className="text-sm font-medium text-muted-foreground">
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
                            className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                          >
                            {committee}
                          </span>
                        ),
                    )}
                  </div>
                )}
              </article>
            )})}
          </div>
        )}
      </div>
    </Section>
  );
};
