import { TinaNodeBackend } from "@tinacms/datalayer";
import databaseClient from "@/tina/__generated__/databaseClient";

import { AuthJsBackendAuthProvider } from "tinacms-authjs";
import { authOptions } from "../../../tina/auth";

const handler = TinaNodeBackend({
  authProvider: AuthJsBackendAuthProvider({
    authOptions,
  }),
  databaseClient,
});

import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  // Assert that we're running in a Node environment
  return handler(req, res);
};
