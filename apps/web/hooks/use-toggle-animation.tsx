'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface Props {
  isVisible: boolean;
  display?: 'grid' | 'flex' | 'block';
  // biome-ignore lint/suspicious/noExplicitAny: <Allow>
  initial?: Record<string, any>;
  // biome-ignore lint/suspicious/noExplicitAny: <Allow>
  enter?: Record<string, any>;
}

export const useToggleAnimation = ({
  isVisible,
  display = 'grid',
  initial = { opacity: 0 },
  enter = { opacity: 1 },
}: Props) => {
  const ref = useRef(null);
  const controls = useAnimation();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!ref.current || !hasMounted) return;

    if (isVisible) {
      controls.set({ display });
      controls.start(enter);
    } else {
      controls.start(initial).then(() => {
        if (hasMounted) {
          controls.set({ display: 'none' });
        }
      });
    }
  }, [isVisible, display, initial, enter, controls, hasMounted]);

  return { ref, MotionWrapper: motion.div, animationControls: controls };
};
