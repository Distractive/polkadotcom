import { createClient } from "@sanity/client"

import { env } from "./env.mjs"

// Initialize Sanity client
const client = createClient({
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: false,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
  experimental: {
    taint: true,
  },
  async redirects() {
    const redirects = await client.fetch(
      `*[_type == "redirects"]{
            "source":source,
            "destination":destination,
            permanent
          }`
    )
    return redirects
  },
}

export default nextConfig
