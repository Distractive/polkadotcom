import { makeSafeQueryRunner } from "groqd"

import { sanityFetch } from "./fetch"

export const runQuery = makeSafeQueryRunner(
  (query: string, params: Record<string, number | string> = {}) =>
    sanityFetch({ query, params })
)
