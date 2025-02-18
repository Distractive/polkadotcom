import 'server-only';

import { experimental_taintUniqueValue } from 'react';

import { env } from '@/env.mjs';

export const token = env.SANITY_API_READ_TOKEN;

if (!token) {
  throw new Error('Missing SANITY_API_READ_TOKEN');
}

experimental_taintUniqueValue(
  'Do not pass the sanity API read token to the client.',
  process,
  token,
);
