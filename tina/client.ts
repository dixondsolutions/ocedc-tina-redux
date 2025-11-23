import { createClient } from "tinacms/dist/client";
import { queries } from "./__generated__/types";

import databaseClient from "./database";

const client = createClient({ 
  url: process.env.NEXT_PUBLIC_TINA_API_URL || 'http://localhost:3000/api/tina/gql', 
  queries 
});

client.request = async (query: any, variables: any) => {
  console.log('client.request called');
  if (typeof window === 'undefined') {
    const database = await databaseClient;
    // Hack to prevent resolve from trying to fetch from API
    const apiUrl = process.env.NEXT_PUBLIC_TINA_API_URL;
    const vercelUrl = process.env.VERCEL_URL;
    delete process.env.NEXT_PUBLIC_TINA_API_URL;
    delete process.env.VERCEL_URL;

    console.log('TINA_PUBLIC_IS_LOCAL:', process.env.TINA_PUBLIC_IS_LOCAL);
    console.log('Database client type:', typeof database);
    console.log('Database client keys:', Object.keys(database || {}));
    console.log('Has request method:', typeof database?.request);
    // @ts-ignore
    const { resolve } = await import('@tinacms/graphql');
    const result = await resolve({
      database,
      query,
      variables: variables || {},
      user: { isAuthorized: true },
    });
    if (result.errors) {
      console.error('TinaCMS Resolve Errors:', result.errors.map((e: any) => e.message || e).join('\n'));
      throw new Error(result.errors.map((e: any) => e.message || e).join('\n'));
    }
    return result.data;
  }
  
  const res = await fetch(client.apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const json = await res.json();
  if (json.errors) {
    throw new Error(JSON.stringify(json.errors));
  }
  return json.data;
};

export default client;
