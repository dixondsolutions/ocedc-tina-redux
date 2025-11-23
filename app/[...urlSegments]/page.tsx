import React from 'react';
import { notFound } from 'next/navigation';
import client from '@/tina/client';
import Layout from '@/components/layout/layout';

import ClientPage from './client-page';

export const revalidate = 300;

export default async function Page({
  params,
}: {
  params: Promise<{ urlSegments: string[] }>;
}) {
  const resolvedParams = await params;
  const filepath = resolvedParams.urlSegments.join('/');

  let data;
  try {
    data = await client.queries.page({
      relativePath: `${filepath}.mdx`,
    });
  } catch (error) {
    notFound();
  }

  return (
    <Layout rawPageData={data}>
      <ClientPage {...data} />
    </Layout>
  );
}

// During the build on platforms like Vercel there is no local HTTP server running,
// so calling the Tina client here would fail. Instead, we skip pre-generating
// any dynamic `[...urlSegments]` paths and let Next.js generate them on-demand
// at runtime using ISR (`revalidate` above).
export async function generateStaticParams() {
  return [];
}