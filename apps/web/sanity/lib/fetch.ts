"use server"

import { draftMode } from "next/headers"
import type { ClientPerspective, QueryParams } from "@sanity/client"

import { env } from "@/env.mjs"

import { client } from "./client"
import { token } from "./token"

const DEFAULT_PARAMS = {} as QueryParams

export async function sanityFetch<QueryResponse>({
  query,
  params = DEFAULT_PARAMS,
  perspective = draftMode().isEnabled ? "previewDrafts" : "published",
  // stega = perspective === "previewDrafts" || env.VERCEL_ENV === "preview",
  stega = perspective === "previewDrafts",
}: {
  query: string
  params?: QueryParams
  perspective?: Omit<ClientPerspective, "raw">
  stega?: boolean
}): Promise<QueryResponse> {
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
    stega,
    perspective: "published",
    useCdn: true,
  })
}
