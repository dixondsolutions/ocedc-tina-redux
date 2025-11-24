import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ cacheDir: '/Users/matthewlenox/Documents/ocedc-tina-redux/tina/__generated__/.cache/1763949321806', url: 'http://localhost:3000/api/tina/gql', token: 'undefined', queries,  });
export default client;
  