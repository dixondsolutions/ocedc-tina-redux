import { TinaAuthJSOptions } from "tinacms-authjs";
import { databaseClient } from "./__generated__/databaseClient";

export const authOptions = TinaAuthJSOptions({
  databaseClient: databaseClient,
  secret: process.env.NEXTAUTH_SECRET!,
});
