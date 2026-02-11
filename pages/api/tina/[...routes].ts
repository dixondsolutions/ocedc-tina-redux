import { TinaNodeBackend } from "@tinacms/datalayer";
import databaseClient from "@/tina/__generated__/databaseClient";

import { AuthJsBackendAuthProvider } from "tinacms-authjs";
import { authOptions } from "../../../tina/auth";

const authProvider = AuthJsBackendAuthProvider({
  authOptions,
});

const handler = TinaNodeBackend({
  authProvider: {
    ...authProvider,
    isAuthorized: async (req: any, res: any) => {
      const user = await authProvider.isAuthorized(req, res);
      if (user && user.isAuthorized) return user;

      // Allow public access for read-only queries
      // This enables client-side components to fetch data without login
      if (req.method === 'POST' && req.body && typeof req.body.query === 'string') {
        const query = req.body.query.trim();
        // Basic check to ensure it's not a mutation
        // Note: This is a simple heuristic. For higher security, use a proper GraphQL parser.
        if (!query.includes('mutation')) {
          return { isAuthorized: true };
        }
      }
      return { isAuthorized: false, errorMessage: "Unauthorized", errorCode: 401 };
    },
  },
  databaseClient,
});

import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  maxDuration: 60,
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  // Add CORS headers to allow TinaCMS admin UI to access the API
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Assert that we're running in a Node environment
  return handler(req, res);
};
