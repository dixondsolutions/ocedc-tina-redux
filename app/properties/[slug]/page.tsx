import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import Layout from '@/components/layout/layout';
import client from '@/tina/client';

export const revalidate = 300;

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let propertyData;
  try {
    propertyData = await client.queries.properties({
      relativePath: `${slug}.md`,
    });
  } catch (error) {
    notFound();
  }

  const property = propertyData?.data?.properties;
  if (!property) {
    notFound();
  }

  const descriptionContent = property.description;

  return (
    <Layout rawPageData={propertyData}>
      <section className="bg-default">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16">
          <div className="space-y-4">
            <Link href="/sites-buildings" className="text-sm font-semibold text-primary hover:underline">
              ← Back to Sites &amp; Buildings
            </Link>
            <div className="flex flex-wrap items-center gap-3">
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
            <h1 className="text-pretty text-4xl font-semibold md:text-5xl">{property.name}</h1>
            <p className="text-lg text-muted-foreground">{property.location}</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
            <div className="space-y-6">
              {property.gallery && property.gallery.length > 0 && (
                <div className="grid gap-4 md:grid-cols-2">
                  {property.gallery.map(
                    (image: string | null, index: number) =>
                      image && (
                        <div key={`${image}-${index}`} className="overflow-hidden rounded-3xl border border-border/70 bg-white shadow">
                          <Image
                            src={image}
                            alt={`${property.name} photo ${index + 1}`}
                            width={1200}
                            height={900}
                            className="h-64 w-full object-cover"
                          />
                        </div>
                      ),
                  )}
                </div>
              )}

              <div className="rounded-3xl border border-border/70 bg-white/90 p-6 shadow-sm dark:bg-slate-900/70">
                <h2 className="text-2xl font-semibold">Project Snapshot</h2>
                <dl className="mt-6 grid gap-4 md:grid-cols-2">
                  <div>
                    <dt className="text-sm font-semibold text-muted-foreground">Total Size</dt>
                    <dd className="text-lg">{property.size}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-muted-foreground">Asking Price / Lease Rate</dt>
                    <dd className="text-lg">{property.price || 'Contact for pricing'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-muted-foreground">Zoning</dt>
                    <dd className="text-lg">{property.zoning || 'Industrial'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-muted-foreground">Rail Access</dt>
                    <dd className="text-lg">{property.railAccess ? 'On-site' : 'Near mainline service'}</dd>
                  </div>
                  <div className="md:col-span-2">
                    <dt className="text-sm font-semibold text-muted-foreground">Utilities</dt>
                    <dd className="mt-1 flex flex-wrap gap-2">
                      {property.utilities && property.utilities.length > 0 ? (
                        property.utilities.map(
                          (utility: string | null) =>
                            utility && (
                              <span key={utility} className="rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                                {utility}
                              </span>
                            ),
                        )
                      ) : (
                        <span className="text-muted-foreground">Standard municipal services available</span>
                      )}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-3xl border border-border/70 bg-white/90 p-6 shadow-sm dark:bg-slate-900/70">
                <h2 className="text-2xl font-semibold">Property Overview</h2>
                <div className="prose mt-4 max-w-none dark:prose-invert">
                  {descriptionContent && typeof descriptionContent === 'object' ? (
                    <TinaMarkdown content={descriptionContent as any} />
                  ) : (
                    <p>{descriptionContent || 'Detailed description coming soon.'}</p>
                  )}
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-border/70 bg-white/90 p-6 shadow-sm dark:bg-slate-900/70">
                <h3 className="text-xl font-semibold">Project Support</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  OCEDC coordinates due diligence, incentive modeling, and utility partner introductions for every prospect.
                </p>
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <p><strong>Contact:</strong> {property.contact || 'info@ocedc.org'}</p>
                  <p><strong>Status:</strong> {(property.status || 'available').replace(/_/g, ' ')}</p>
                </div>
                <div className="mt-6 flex flex-col gap-3">
                  <Link href="/contact" className="rounded-full bg-primary px-4 py-2 text-center text-sm font-semibold text-white shadow hover:bg-primary/90">
                    Start a Site Selection Conversation
                  </Link>
                  {property.specSheet && (
                    <a
                      href={property.specSheet}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-border px-4 py-2 text-center text-sm font-semibold text-foreground hover:border-primary/60 hover:text-primary"
                    >
                      Download Spec Sheet
                    </a>
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-border/70 bg-white/90 p-6 shadow-sm dark:bg-slate-900/70">
                <h3 className="text-xl font-semibold">Next Steps</h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  <li>Schedule a virtual or in-person site tour</li>
                  <li>Connect with local permitting and utilities</li>
                  <li>Review workforce, incentives, and logistics data</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function generateStaticParams() {
  let properties = await client.queries.propertiesConnection();
  const allProperties = properties;

  if (!allProperties.data.propertiesConnection.edges) {
    return [];
  }

  while (properties.data?.propertiesConnection.pageInfo.hasNextPage) {
    properties = await client.queries.propertiesConnection({
      after: properties.data.propertiesConnection.pageInfo.endCursor,
    });

    if (!properties.data.propertiesConnection.edges) {
      break;
    }

    allProperties.data.propertiesConnection.edges.push(...properties.data.propertiesConnection.edges);
  }

  return (
    allProperties.data?.propertiesConnection.edges?.map((edge) => ({
      slug: edge?.node?._sys.filename,
    })) || []
  );
}

