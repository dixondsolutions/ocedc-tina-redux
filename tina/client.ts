import { createClient } from "tinacms/dist/client";
import { queries } from "./__generated__/types";

const browserApiUrl = typeof window !== "undefined" ? `${window.location.origin}/api/tina/gql` : undefined;
const serverApiUrl =
  typeof window === "undefined" && process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}/api/tina/gql`
    : undefined;

const apiUrl =
  process.env.NEXT_PUBLIC_TINA_API_URL ||
  serverApiUrl ||
  browserApiUrl ||
  "http://localhost:3000/api/tina/gql";

const client = createClient({
  url: apiUrl,
  queries,
});

export default client;
