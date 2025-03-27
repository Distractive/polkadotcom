import type { Config } from 'tailwindcss';

import sharedConfig from '../tailwind-config';

const config = {
  ...sharedConfig,
  content: ['./*.{ts,tsx}'],
} satisfies Config;

export default config;
