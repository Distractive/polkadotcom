import { createClient } from '@sanity/client';
import { env } from './env.mjs';

const isTest = process.env.NODE_ENV === 'test';
const isStatic = process.env.NEXT_PUBLIC_BUILD_TYPE === 'static';

// Initialize Sanity client
const client = !isTest
  ? createClient({
      apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
      dataset: env.NEXT_PUBLIC_SANITY_DATASET,
      projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      useCdn: false,
    })
  : undefined;

// CSP sources
const cspSources = {
  'base-uri': ["'self'"],
  'connect-src': [
    "'self'",
    'analytics.google.com',
    'ekndrsoc.ust.stape.io',
    'https://*.api.sanity.io',
    'wss://qf32zgfm.api.sanity.io',
    'https://*.hotjar.com',
    'https://*.hotjar.io',
    'https://*.hsforms.com',
    'https://hubspot-forms-static-embed.s3.amazonaws.com',
    'https://*.spline.design',
    'https://*.stape.io',
    'https://api.sanity.io',
    'https://api.vercel.com',
    'https://app.spline.design',
    'https://consent.api.osano.com',
    'https://tattle.api.osano.com',
    'https://plausible.io',
    'https://vimeo.com',
    'wss://*.hotjar.com',
    'www.google-analytics.com',
    'https://*.algolia.net',
    'https://*.algolianet.com',
    'https://tracking-europe.ad360.media',
    'https://*.ad360.media',
    'https://*.reddit.com',
    'https://alb.reddit.com',
    'https://www.redditstatic.com',
    'https://pixel-config.reddit.com',
  ],
  'default-src': ["'self'"],
  'font-src': [
    "'self'",
    'https://*.hotjar.com',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ],
  'form-action': ["'self'", 'https://*.hsforms.com', 'https://*.hsforms.net'],
  'frame-ancestors': ["'self'", 'https://polkadot.com'],
  'frame-src': [
    "'self'",
    'http://js.hsforms.net/',
    'https://*.hsforms.com',
    'https://*.hsforms.net',
    'https://*.hotjar.com',
    'https://*.stape.io',
    'https://app.spline.design',
    'https://ekndrsoc.ust.stape.io',
    'https://player.vimeo.com',
    'https://www.youtube.com',
    'https://vercel.live/',
  ],
  'img-src': [
    "'self'",
    'data:',
    'https://*.doubleclick.net',
    'https://*.facebook.com',
    'https://www.facebook.com',
    'https://*.hotjar.com',
    'https://*.hsforms.com',
    'https://forms-na1.hsforms.com',
    'https://*.hubspot.com',
    'https://*.stape.io',
    'https://googleads.g.doubleclick.net',
    'https://lh3.googleusercontent.com',
    'https://www.google.com/pagead/*',
    'https://analytics.google.com/*',
    'https://analytics.google.com/g/s/collect',
    'https://analytics.twitter.com/*',
    'https://analytics.twitter.com',
    'https://cdn.sanity.io',
    'https://ekndrsoc.ust.stape.io',
    'https://i.ytimg.com',
    'https://plausible.io',
    'https://queue.simpleanalyticscdn.com',
    'https://stats.g.doubleclick.net/*',
    'https://t.co/*',
    'https://t.co/1/i/adsct',
    'https://www.googleadservices.com',
    'https://www.google-analytics.com',
    'https://www.googletagmanager.com',
    'https://*.reddit.com',
    'https://alb.reddit.com',
    'https://*.ad360.media',
  ],
  'object-src': ["'none'"],
  'script-src': [
    "'self'",
    "'unsafe-eval'",
    "'unsafe-inline'",
    'analytics.google.com',
    'www.google-analytics.com',
    'https://*.hotjar.com',
    'https://*.hotjar.io',
    'https://*.spline.design',
    'https://*.stape.io',
    'https://app.spline.design',
    'https://cdn.sanity.io',
    'https://cmp.osano.com',
    'https://connect.facebook.net',
    'https://connect.facebook.net/en_US/fbevents.js',
    'https://ekndrsoc.ust.stape.io',
    'https://js.hsforms.net',
    'https://osano.com',
    'https://plausible.io',
    'https://player.vimeo.com',
    'https://scripts.simpleanalyticscdn.com',
    'https://static.ads-twitter.com/uwt.js',
    'https://www.googletagmanager.com',
    'https://www.youtube.com',
    'https://www.redditstatic.com',
    'http://cdn.ad360.media',
    'https://cdn.ad360.media',
    'https://vercel.live/',
  ],
  'style-src': [
    "'self'",
    "'unsafe-inline'",
    'https://*.hotjar.com',
    'https://*.spline.design',
    'https://cdn.sanity.io',
    'https://fonts.googleapis.com',
    'https://www.googletagmanager.com',
  ],
  'worker-src': ["'self'", 'blob:', 'https://cmp.osano.com'],
};

const generateCSP = (sources) => {
  return Object.entries(sources)
    .map(([key, values]) => `${key} ${values.join(' ')}`)
    .join('; ');
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isStatic ? 'export' : 'standalone',
  trailingSlash: isStatic,
  basePath: '',
  distDir: isStatic ? 'out' : '.next',
  assetPrefix: '',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/qf32zgfm/**',
      },
      {
        protocol: 'https',
        hostname: 'queue.simpleanalyticscdn.com',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    taint: true,
    optimizeCss: false,
    fontLoaders: [],
    serverActions: false,
  },
  compiler: {
    removeConsole: isStatic,
  },
  reactStrictMode: true,
  ...(isStatic && {
    analytics: false,
  }),
  async redirects() {
    if (isTest) {
      return [];
    }

    const redirects = await client.fetch(
      `*[_type == "redirects"]{
        "source":source,
        "destination":destination,
        permanent
      }`,
    );

    return redirects;
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: generateCSP(cspSources),
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
