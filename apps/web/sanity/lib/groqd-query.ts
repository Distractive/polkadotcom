import { makeSafeQueryRunner } from "groqd"

import { client } from "./client"

export const runQuery = makeSafeQueryRunner(
  (query: string, params: Record<string, number | string> = {}) =>
    client.fetch(query, params)
)
