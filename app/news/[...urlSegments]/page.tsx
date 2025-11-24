import React from 'react';
import client from '@/tina/__generated__/databaseClient';
import Layout from '@/components/layout/layout';
import NewsArticleClientPage from './client-page';

export const dynamic = 'force-dynamic';
export const revalidate = 300;

export default async function PostPage({
  params,
}: {
  params: Promise<{ urlSegments: string[] }>;
}) {
  const resolvedParams = await params;
  const filepath = resolvedParams.urlSegments.join('/');
  const data = await client.queries.post({
    relativePath: `${filepath}.mdx`,
  });

  return (
    <Layout rawPageData={data}>
      <div className="pt-32 lg:pt-40">
        <NewsArticleClientPage {...JSON.parse(JSON.stringify(data))} />
      </div>
    </Layout>
  );
}

// See note in `app/[...urlSegments]/page.tsx` – calling the Tina client at build
// time in this function will fail on Vercel because there is no HTTP server
// listening on localhost. We instead rely on on-demand generation for posts.
export async function generateStaticParams() {
  return [];
}
