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

const getBypassHeaders = (): Record<string, string> => {
  const token =
    process.env.VERCEL_PROTECTION_BYPASS ||
    process.env.VERCEL_DEPLOYMENT_PROTECTION_BYPASS;
  if (!token) {
    return {};
  }
  return {
    "x-vercel-protection-bypass": token,
    cookie: `__vercel_protection_bypass=${token}`,
  };
};

client.request = (args, options = {}) => {
  const url = resolveApiUrl();
  const serverOptions =
    typeof window === "undefined"
      ? {
          ...options,
          fetchOptions: {
            ...(options.fetchOptions || {}),
            headers: {
              ...(options.fetchOptions?.headers || {}),
              ...getBypassHeaders(),
            },
          },
        }
      : options;
  return originalRequest(
    {
      ...args,
      url,
    },
    serverOptions,
  );
};

export default client;

