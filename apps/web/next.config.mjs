import { createClient } from "@sanity/client"

import { env } from "./env.mjs"

// Initialize Sanity client
const client = createClient({
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: false,
})

// CSP sources
const cspSources = {
  "default-src": ["'self'"],
  "script-src": [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    "https://cdn.sanity.io",
    "https://js.hsforms.net",
    "https://plausible.io",
    "https://app.spline.design",
    "https://*.spline.design",
    "https://cmp.osano.com",
    "https://*.osano.com",
    "https://osano.com",
    "https://*.hotjar.com",
    "https://*.hotjar.io",
    "https://www.youtube.com",
    "https://www.googletagmanager.com",
  ],
  "style-src": [
    "'self'",
    "'unsafe-inline'",
    "https://cdn.sanity.io",
    "https://*.spline.design",
    "https://*.hotjar.com",
    "https://www.googletagmanager.com",
    "https://fonts.googleapis.com",
  ],
  "img-src": [
    "'self'",
    "data:",
    "https://cdn.sanity.io",
    "https://plausible.io",
    "https://*.hotjar.com",
    "https://*.hsforms.com",
    "https://*.hubspot.com",
    "https://forms-na1.hsforms.com",
    "https://lh3.googleusercontent.com",
  ],
  "connect-src": [
    "'self'",
    "wss://qf32zgfm.api.sanity.io",
    "https://api.sanity.io",
    "https://*.api.sanity.io",
    "https://api.vercel.com",
    "wss://qf32zgfm.api.sanity.io",
    "https://*.hubspot.com",
    "https://plausible.io",
    "https://app.spline.design",
    "https://*.hsforms.com",
    "https://*.spline.design",
    "https://*.hotjar.com",
    "https://*.hotjar.io",
    "wss://*.hotjar.com",
    "https://hubspot-forms-static-embed.s3.amazonaws.com",
    "https://tattle.api.osano.com",
    "https://consent.api.osano.com",
    "https://api.vercel.com",
  ],
  "font-src": [
    "'self'",
    "https://fonts.gstatic.com",
    "https://fonts.googleapis.com",
    "https://*.hotjar.com",
  ],
  "object-src": ["'none'"],
  "frame-src": [
    "'self'",
    "https://*.hsforms.net",
    "https://app.spline.design",
    "https://*.hotjar.com",
    "https://www.youtube.com",
    "https://*.hsforms.com",
  ],
  "worker-src": ["'self'", "blob:", "https://cmp.osano.com"],
  "frame-ancestors": ["'self'", "https://polkadot.com"],
  "base-uri": ["'self'"],
  "form-action": ["'self'", "https://*.hsforms.net", "https://*.hsforms.com"],
}

// Function to generate CSP string
const generateCSP = (sources) => {
  return Object.entries(sources)
    .map(([key, values]) => `${key} ${values.join(" ")}`)
    .join("; ")
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/qf32zgfm/production/**",
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
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: generateCSP(cspSources),
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ]
  },
}

export default nextConfig
