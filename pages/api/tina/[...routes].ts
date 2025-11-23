import { TinaNodeBackend } from "@tinacms/datalayer";
import databaseClient from "@/tina/__generated__/databaseClient";

const handler = TinaNodeBackend({
  authProvider: {
    isAuthorized: async () => ({ isAuthorized: true }),
  },
  databaseClient,
});

import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  // Assert that we're running in a Node environment
  return handler(req, res);
};
