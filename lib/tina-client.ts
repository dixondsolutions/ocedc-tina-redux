import { createClient } from "tinacms/dist/client";
import { queries } from "@/tina/__generated__/types";

const resolveApiUrl = () => {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/api/tina/gql`;
  }

  if (process.env.NEXT_PUBLIC_TINA_API_URL) {
    return process.env.NEXT_PUBLIC_TINA_API_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/api/tina/gql`;
  }

  return "http://localhost:3000/api/tina/gql";
};

const client = createClient({
  url: resolveApiUrl(),
  queries,
});

const originalRequest = client.request.bind(client);

client.request = (args, options = {}) => {
  const url = resolveApiUrl();
  if (typeof window === "undefined") {
    console.log("[Tina] request url:", url);
  }
  return originalRequest(
    {
      ...args,
      url,
    },
    options,
  );
};

export default client;

