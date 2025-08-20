'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function useBlurOnLocationChange() {
  const pathname = usePathname();

  useEffect(() => {
    const blurActive = () => {
      setTimeout(() => {
        const activeEl = document.activeElement as HTMLElement | null;
        if (activeEl && typeof activeEl.blur === 'function') {
          activeEl.setAttribute('tabindex', '0');
          activeEl.blur();
          document.body.focus();
        }
      }, 0);
    };

    blurActive();

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button')) {
        blurActive();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const target = e.target as HTMLElement;
        if (target.closest('a, button')) {
          blurActive();
        }
      }
    };

    window.addEventListener('click', handleClick, true);
    window.addEventListener('keydown', handleKeyDown, true);

    return () => {
      window.removeEventListener('click', handleClick, true);
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, []);
}
