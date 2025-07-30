import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function useScrollFadeIn(
  className = '.section-fade-in',
  animateClass = 'animate',
  options: { rootMargin?: string; threshold?: number } = {},
) {
  const pathname = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <need to rerun the effect when the pathname changes but we don't need to use it within the useEffect>
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(className),
    );

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(animateClass);
              obs.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: options.rootMargin ?? '0px 0px -20% 0px',
          threshold: options.threshold ?? 0,
        },
      );

      sections.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }
  }, [
    pathname,
    className,
    animateClass,
    options.rootMargin,
    options.threshold,
  ]);
}
