import React from "react";
import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import Layout from "@/components/layout/layout";
import { Blocks } from "@/components/blocks";
import { RefreshRouteOnSave } from "@/components/live-preview";
import { generatePageMetadata } from "@/lib/generate-page-metadata";

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    depth: 1,
    limit: 1,
  });
  return generatePageMetadata(docs[0] as any);
}

export default async function Home() {
  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    depth: 2,
    limit: 1,
  });

  const page = docs[0];

  return (
    <Layout>
      <RefreshRouteOnSave />
      <Blocks blocks={page?.blocks || []} />
    </Layout>
  );
}
