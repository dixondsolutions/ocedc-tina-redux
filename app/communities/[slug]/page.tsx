import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import config from '@payload-config';
import Layout from '@/components/layout/layout';
import { RichText } from '@/components/rich-text';
import { RefreshRouteOnSave } from '@/components/live-preview';
import { PayloadRedirects } from '@/components/payload-redirects';
import { generatePageMetadata } from '@/lib/generate-page-metadata';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: 'communities',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  });
  return generatePageMetadata(docs[0] as any);
}

export default async function CommunityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: 'communities',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  });

  const community = docs[0];
  if (!community) {
    return <PayloadRedirects url={`/communities/${slug}`} />;
  }

  return (
    <Layout>
      <PayloadRedirects disableNotFound url={`/communities/${slug}`} />
      <RefreshRouteOnSave />
      <section className="bg-default">
        <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16">
          <div className="space-y-4 text-center">
            <Link href="/communities" className="text-sm font-semibold text-primary hover:underline">
              &larr; Back to Communities
            </Link>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Member Community</p>
            <h1 className="text-pretty text-4xl font-semibold md:text-5xl">{community.name}</h1>
            {community.population && (
              <p className="text-lg text-muted-foreground">
                Population: <span className="font-semibold text-foreground">{community.population}</span>
              </p>
            )}
          </div>

          <div className="space-y-6">
            {community.gallery && community.gallery.length > 0 && (
              <div className="grid gap-4 md:grid-cols-2">
                {community.gallery.map((item: any, index: number) => {
                  const imageUrl = typeof item.image === 'object' && item.image?.url ? item.image.url : null;
                  return imageUrl ? (
                    <div key={`gallery-${index}`} className="overflow-hidden rounded-3xl border border-border/60 bg-white shadow">
                      <Image
                        src={imageUrl}
                        alt={item.image?.alt || `${community.name} photo ${index + 1}`}
                        width={1200}
                        height={900}
                        className="h-64 w-full object-cover"
                      />
                    </div>
                  ) : null;
                })}
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              <article className="rounded-3xl border border-border/70 bg-white/90 p-6 shadow-sm dark:bg-slate-900/70">
                <h2 className="text-2xl font-semibold">Community Snapshot</h2>
                <div className="prose mt-4 max-w-none text-sm text-muted-foreground dark:prose-invert">
                  {community.description ? (
                    <RichText data={community.description} />
                  ) : (
                    <p>Additional narrative coming soon.</p>
                  )}
                </div>
                {community.keyEmployers && community.keyEmployers.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Key Employers</h3>
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                      {community.keyEmployers.map((employer: any) => (
                        <li key={employer.id || employer.name}>{employer.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>

              <article className="rounded-3xl border border-border/70 bg-white/90 p-6 shadow-sm dark:bg-slate-900/70">
                <h2 className="text-2xl font-semibold">Demographics &amp; Quality of Life</h2>
                <div className="prose mt-4 max-w-none text-sm text-muted-foreground dark:prose-invert">
                  {community.demographics ? (
                    <RichText data={community.demographics} />
                  ) : (
                    <p>Demographic profile available upon request.</p>
                  )}
                </div>
                <div className="mt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Municipal Contact</h3>
                  <div className="prose mt-3 max-w-none text-sm text-muted-foreground dark:prose-invert">
                    {community.contactInfo ? (
                      <RichText data={community.contactInfo} />
                    ) : (
                      <p>Email info@ocedc.org for direct introductions.</p>
                    )}
                  </div>
                </div>
                {community.profilePdf && typeof community.profilePdf === 'object' && community.profilePdf.url && (
                  <a
                    href={community.profilePdf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
                  >
                    Download Community Profile
                  </a>
                )}
              </article>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function generateStaticParams() {
  return [];
}
