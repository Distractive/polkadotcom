'use client';

import { useScrollFadeIn } from '@/animations/use-scroll-fade-in';

type Props = {
  children: React.ReactNode;
};

export function ScrollFadeWrapper({ children }: Props) {
  useScrollFadeIn();
  return <>{children}</>;
}
