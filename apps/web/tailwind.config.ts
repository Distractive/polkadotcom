import sharedConfig from '@shared/tailwind-config';
import type { Config } from 'tailwindcss';

const config = {
  ...sharedConfig,
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './features/**/*.{ts,tsx}',
    '../../packages/ui/components/**/*.{ts,tsx}',
  ],
  safelist: [
    'duration-100',
    'ease-in-out',
    'hover:text-pink',
    'focus:text-pink',
    'peer-focus:text-pink',
  ],
} satisfies Config;

export default config;
