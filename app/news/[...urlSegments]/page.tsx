import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import config from '@payload-config';
import Layout from '@/components/layout/layout';
import PostContent from './post-content';
import { RefreshRouteOnSave } from '@/components/live-preview';
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
    collection: 'posts',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  });
  return generatePageMetadata(docs[0] as any);
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ urlSegments: string[] }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.urlSegments.join('/');

  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  });

  const post = docs[0];
  if (!post) {
    notFound();
  }

  return (
    <Layout>
      <RefreshRouteOnSave />
      <div className="pt-32 lg:pt-40">
        <PostContent post={JSON.parse(JSON.stringify(post))} />
      </div>
    </Layout>
  );
}

export async function generateStaticParams() {
  return [];
}
