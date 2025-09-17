'use client';

import { useScrollAnimation } from '@/animations/scroll/use-scroll-animation';
import type { UseScrollFadeInOptions } from '@/animations/scroll/use-scroll-animation';

type Props = {
  children: React.ReactNode;
  options?: UseScrollFadeInOptions;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function ScrollFadeWrapper({
  children,
  options,
  className = '',
  ...props
}: Props) {
  const { ref, isVisible } = useScrollAnimation(options);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(64px)',
        transition: 'opacity 1s ease-in, transform 1s ease',
      }}
      {...props}
    >
      {children}
    </div>
  );
}
