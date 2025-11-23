import generatedClient from "@/tina/__generated__/client";

const client = generatedClient;
const originalRequest = client.request.bind(client);

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

client.request = (args, options = {}) => {
  const url = resolveApiUrl();
  return originalRequest(
    {
      ...args,
      url,
    },
    options,
  );
};

export default client;

