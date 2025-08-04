'use client';

import { ReactNode } from 'react';
import { useBlurOnLocationChange } from '@/hooks/use-blur-on-location-change';

export default function FocusHandler({ children }: { children: ReactNode }) {
  useBlurOnLocationChange();

  return <>{children}</>;
}