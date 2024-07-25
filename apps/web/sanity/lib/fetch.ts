import type { ClientPerspective, QueryParams } from "@sanity/client"

import { env } from "@/env.mjs"

import { client } from "./client"
import { token } from "./token"

const DEFAULT_PARAMS = {} as QueryParams

export async function sanityFetch<QueryResponse>({
  query,
  params = DEFAULT_PARAMS,
  perspective,
  stega = perspective === "previewDrafts",
}: {
  query: string
  params?: QueryParams
  perspective?: Omit<ClientPerspective, "raw">
  stega?: boolean
}): Promise<QueryResponse> {
  // if the build flag is set to true then don't use sanity cdn
  // this is for when triggering builds only so we get fresh content
  const useCdn = env.BUILD_FLAG === "true" ? false : true
  if (perspective === "previewDrafts") {
    return client.fetch<QueryResponse>(query, params, {
      stega,
      perspective: "previewDrafts",
      token,
      useCdn: false,
      next: { revalidate: 0 },
    })
  }
  return client.fetch<QueryResponse>(query, params, {
    stega: false,
    perspective: "published",
    useCdn: useCdn,
  })
}
