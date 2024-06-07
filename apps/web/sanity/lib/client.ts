import type { QueryParams } from "@sanity/client"
import { createClient } from "next-sanity"

import { env } from "@/env.mjs"

export const client = createClient({
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: false,
  perspective: "published",
})

const DEFAULT_PARAMS = {} as QueryParams

export async function sanityFetch<QueryResponse>({
  query,
  params = DEFAULT_PARAMS,
}: {
  query: string
  params?: QueryParams
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, params, {})
}
