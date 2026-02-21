import React from 'react';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import config from '@payload-config';
import Layout from '@/components/layout/layout';
import { Blocks } from '@/components/blocks';

export const revalidate = 300;

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
