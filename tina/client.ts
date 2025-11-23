import { createClient } from "tinacms/dist/client";
import { queries } from "./__generated__/types";

// Use the standard Tina client which talks to the self-hosted API route.
// The API route (`/api/tina/gql`) is backed by the datalayer defined in `tina/database.ts`,
// so we don't need to call `@tinacms/graphql`'s `resolve` directly here.
const client = createClient({
  url: process.env.NEXT_PUBLIC_TINA_API_URL || "http://localhost:3000/api/tina/gql",
  queries,
});

export default client;
