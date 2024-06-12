import { createClient } from "next-sanity"

import { env } from "@/env.mjs"

export const client = createClient({
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: false,
  perspective: "published",
  stega: {
    enabled: false,
    studioUrl: "/admin",
  },
})
