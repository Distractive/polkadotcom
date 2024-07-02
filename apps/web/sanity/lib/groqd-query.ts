import { makeSafeQueryRunner } from "groqd"

import { sanityFetch } from "./fetch"

export const runQuery = makeSafeQueryRunner(
  (
    query: string,
    params: Record<string, number | string> = {},
    preview = true
  ) =>
    sanityFetch({
      query,
      params,
      perspective: preview ? "previewDrafts" : "published",
    })
)
