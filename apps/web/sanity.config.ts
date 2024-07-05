"use client"

import { deskStructure } from "@/sanity/desk"
import * as resolve from "@/sanity/plugins/resolve"
import { schema } from "@/sanity/schema"
import { codeInput } from "@sanity/code-input"
import { visionTool } from "@sanity/vision"
import { groqdPlaygroundTool } from "groqd-playground"
import { defineConfig } from "sanity"
import { vercelDeployTool } from "sanity-plugin-vercel-deploy"
import { presentationTool } from "sanity/presentation"
import { structureTool } from "sanity/structure"

import { env } from "@/env.mjs"

export default defineConfig({
  basePath: "/admin",
  name: "default",
  title: "polkadot",
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  // schema,
  schema: {
    ...schema,
    templates: (prev) => {
      const landingChild = {
        id: "landing-child",
        title: "Landing: Pages",
        schemaType: "page",
        parameters: [{ name: `parentId`, title: `Parent ID`, type: `string` }],
        // This value will be passed-in from desk structure
        value: ({ parentId }: { parentId: string }) => ({
          parent: { _type: "reference", _ref: parentId },
        }),
      }

      return [...prev, landingChild]
    },
  },
  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool({ defaultApiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION }),
    groqdPlaygroundTool(),
    codeInput(),
    presentationTool({
      resolve,
      previewUrl: {
        draftMode: {
          enable: "/api/draft",
        },
      },
    }),
    vercelDeployTool(),
  ],
})
