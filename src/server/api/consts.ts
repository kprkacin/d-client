import { env } from "@/env.mjs";

export const fetchOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${env.DEV_IMDB_KEY}`,
  },
};
