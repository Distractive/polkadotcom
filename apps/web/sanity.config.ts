"use client"

import { visionTool } from "@sanity/vision"
import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"

import { env } from "@/env.mjs"

export default defineConfig({
  basePath: "/admin",
  name: "default",
  title: "polkadot",
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  // schema,
  plugins: [
    structureTool({
      // structure: deskStructure,
    }),
    visionTool({ defaultApiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION }),
  ],
})
