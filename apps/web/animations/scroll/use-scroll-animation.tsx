import { useEffect, useMemo, useRef, useState } from 'react';

export interface UseScrollFadeInOptions {
  rootMargin?: string;
  threshold?: number;
}

export function useScrollAnimation(options: UseScrollFadeInOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const observerOptions = useMemo(
    () => ({
      rootMargin: options.rootMargin ?? '0px 0px -10% 0px',
      threshold: options.threshold ?? 0,
    }),
    [options.rootMargin, options.threshold],
  );

  useEffect(() => {
    setIsVisible(false);

    const element = ref.current;
    if (!element || typeof window === 'undefined') return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      }, observerOptions);

      observer.observe(element);
      return () => observer.disconnect();
    }
    setIsVisible(true);
  }, [observerOptions]);

  return { ref, isVisible };
}
