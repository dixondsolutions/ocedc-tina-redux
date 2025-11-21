import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import Layout from '@/components/layout/layout';
import client from '@/tina/__generated__/client';

export const revalidate = 300;

export default async function CommunityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let communityData;
  try {
    communityData = await client.queries.communities({
      relativePath: `${slug}.md`,
    });
  } catch (error) {
    notFound();
  }

  const community = communityData?.data?.communities;
  if (!community) {
    notFound();
  }

  return (
    <Layout rawPageData={communityData}>
      <section className="bg-default">
        <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16">
          <div className="space-y-4 text-center">
            <Link href="/communities" className="text-sm font-semibold text-primary hover:underline">
              ← Back to Communities
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
                {community.gallery.map(
                  (image: string, index: number) =>
                    image && (
                      <div key={`${image}-${index}`} className="overflow-hidden rounded-3xl border border-border/60 bg-white shadow">
                        <Image
                          src={image}
                          alt={`${community.name} photo ${index + 1}`}
                          width={1200}
                          height={900}
                          className="h-64 w-full object-cover"
                        />
                      </div>
                    ),
                )}
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              <article className="rounded-3xl border border-border/70 bg-white/90 p-6 shadow-sm dark:bg-slate-900/70">
                <h2 className="text-2xl font-semibold">Community Snapshot</h2>
                <div className="prose mt-4 max-w-none text-sm text-muted-foreground dark:prose-invert">
                  {community.description ? (
                    typeof community.description === 'object' ? (
                      <TinaMarkdown content={community.description as any} />
                    ) : (
                      <p>{community.description}</p>
                    )
                  ) : (
                    <p>Additional narrative coming soon.</p>
                  )}
                </div>
                {community.keyEmployers && community.keyEmployers.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Key Employers</h3>
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                      {community.keyEmployers.map((employer: string) => (
                        <li key={employer}>{employer}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>

              <article className="rounded-3xl border border-border/70 bg-white/90 p-6 shadow-sm dark:bg-slate-900/70">
                <h2 className="text-2xl font-semibold">Demographics & Quality of Life</h2>
                <div className="prose mt-4 max-w-none text-sm text-muted-foreground dark:prose-invert">
                  {community.demographics ? (
                    typeof community.demographics === 'object' ? (
                      <TinaMarkdown content={community.demographics as any} />
                    ) : (
                      <p>{community.demographics}</p>
                    )
                  ) : (
                    <p>Demographic profile available upon request.</p>
                  )}
                </div>
                <div className="mt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Municipal Contact</h3>
                  <div className="prose mt-3 max-w-none text-sm text-muted-foreground dark:prose-invert">
                    {community.contactInfo ? (
                      typeof community.contactInfo === 'object' ? (
                        <TinaMarkdown content={community.contactInfo as any} />
                      ) : (
                        <p>{community.contactInfo}</p>
                      )
                    ) : (
                      <p>Email info@ocedc.org for direct introductions.</p>
                    )}
                  </div>
                </div>
                {community.profilePdf && (
                  <a
                    href={community.profilePdf}
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
  let communities = await client.queries.communitiesConnection();
  const allCommunities = communities;

  if (!allCommunities.data.communitiesConnection.edges) {
    return [];
  }

  while (communities.data?.communitiesConnection.pageInfo.hasNextPage) {
    communities = await client.queries.communitiesConnection({
      after: communities.data.communitiesConnection.pageInfo.endCursor,
    });

    if (!communities.data.communitiesConnection.edges) {
      break;
    }

    allCommunities.data.communitiesConnection.edges.push(...communities.data.communitiesConnection.edges);
  }

  return (
    allCommunities.data?.communitiesConnection.edges?.map((edge) => ({
      slug: edge?.node?._sys.filename,
    })) || []
  );
}

