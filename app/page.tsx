import React from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import Layout from "@/components/layout/layout";
import { Blocks } from "@/components/blocks";

export const dynamic = 'force-dynamic';
export const revalidate = 300;

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
      <Blocks blocks={page?.blocks || []} />
    </Layout>
  );
}
