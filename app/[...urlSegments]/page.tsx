import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import config from '@payload-config';
import Layout from '@/components/layout/layout';
import { Blocks } from '@/components/blocks';
import { generatePageMetadata } from '@/lib/generate-page-metadata';

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ urlSegments: string[] }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.urlSegments.join('/');
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  });
  return generatePageMetadata(docs[0] as any);
}

export default async function Page({
  params,
}: {
  params: Promise<{ urlSegments: string[] }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.urlSegments.join('/');

  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  });

  const page = docs[0];
  if (!page) {
    notFound();
  }

  return (
    <Layout>
      <Blocks blocks={page.blocks || []} />
    </Layout>
  );
}

export async function generateStaticParams() {
  return [];
}
