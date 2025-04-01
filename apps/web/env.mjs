import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
    NEXT_PUBLIC_SANITY_DATASET: z.string().min(1),
    NEXT_PUBLIC_SANITY_API_VERSION: z.string().min(1),
    NEXT_PUBLIC_GA_ID: z.string().min(1),
    SANITY_API_READ_TOKEN: z.string().min(1).optional(),
    VERCEL_ENV: z.string().min(1),
    BUILD_FLAG: z.string().min(1),
    NEXT_PUBLIC_BUILD_TYPE: z.string().min(1).optional().default('dynamic'),
    ALGOLIA_ADMIN_API_KEY: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
    NEXT_PUBLIC_SANITY_DATASET: z.string().min(1),
    NEXT_PUBLIC_SANITY_API_VERSION: z.string().min(1),
    NEXT_PUBLIC_GA_ID: z.string().min(1),
    NEXT_PUBLIC_BUILD_TYPE: z.string().min(1).optional().default('dynamic'),
    NEXT_PUBLIC_ALGOLIA_APP_ID: z.string(),
    NEXT_PUBLIC_ALGOLIA_SEARCH_KEY: z.string(),
    NEXT_PUBLIC_DEPLOYMENT: z
      .enum(['production', 'staging'])
      .optional()
      .default('staging'),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
    SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN,
    VERCEL_ENV: process.env.VERCEL_ENV,
    BUILD_FLAG: process.env.BUILD_FLAG,
    NEXT_PUBLIC_BUILD_TYPE: process.env.NEXT_PUBLIC_BUILD_TYPE,
    ALGOLIA_ADMIN_API_KEY: process.env.ALGOLIA_ADMIN_API_KEY,
    NEXT_PUBLIC_ALGOLIA_APP_ID: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    NEXT_PUBLIC_ALGOLIA_SEARCH_KEY: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY,
    NEXT_PUBLIC_DEPLOYMENT: process.env.NEXT_PUBLIC_DEPLOYMENT,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
