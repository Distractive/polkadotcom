'use client';

import { useBlurOnLocationChange } from '@/hooks/use-blur-on-location-change';
import type { ReactNode } from 'react';

export default function FocusHandler({ children }: { children: ReactNode }) {
  useBlurOnLocationChange();

  return <>{children}</>;
}
