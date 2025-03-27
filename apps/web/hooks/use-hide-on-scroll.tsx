'use client';

import { useEffect, useRef, useState } from 'react';
import { useBreakpoint } from './use-breakpoint';

import { motion, useAnimation } from 'framer-motion';

export function useHideOnScroll() {
  const isMobile = useBreakpoint('--screen-lg');
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (isMobile) {
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > lastScrollY) {
        controls.start({ y: '-150%', pointerEvents: 'none' });
      } else {
        controls.start({ y: '0%', pointerEvents: 'auto' });
      }

      setLastScrollY(scrollY <= 0 ? 0 : scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, controls, lastScrollY]);

  return {
    ref,
    MotionWrapper: motion.div,
    animationControls: isMobile ? undefined : controls,
    isMobile,
  };
}
