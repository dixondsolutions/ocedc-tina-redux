import React from 'react';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import config from '@payload-config';
import Layout from '@/components/layout/layout';
import PostContent from './post-content';

export const revalidate = 300;

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
      <div className="pt-32 lg:pt-40">
        <PostContent post={JSON.parse(JSON.stringify(post))} />
      </div>
    </Layout>
  );
}

export async function generateStaticParams() {
  return [];
}
