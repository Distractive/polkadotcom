'use client';

import { cn } from '@shared/ui';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const OFFSET = 5;
const ROTATE = 45;
const LINE_STYLES = 'h-[2px] w-5 bg-black';

export function Burger({ isOpen, setIsOpen }: Props) {
  const topCtrl = useAnimation();
  const middleCtrl = useAnimation();
  const bottomCtrl = useAnimation();

  useEffect(() => {
    if (isOpen) {
      topCtrl.start({ y: 0, rotate: ROTATE });
      middleCtrl.start({ opacity: 0 });
      bottomCtrl.start({ y: 0, rotate: -ROTATE });
    } else {
      topCtrl.start({ rotate: 0, y: -OFFSET });
      middleCtrl.start({ opacity: 1 });
      bottomCtrl.start({ rotate: 0, y: OFFSET });
    }
  }, [isOpen, topCtrl, middleCtrl, bottomCtrl]);

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-controls="page-menu"
      onClick={() => setIsOpen(!isOpen)}
      className={cn(
        'grid-pile h-full w-14 items-center justify-center lg:hidden',
        'rounded-full border border-grey-300 bg-white',
      )}
    >
      <motion.span
        animate={topCtrl}
        initial={{ y: -OFFSET }}
        className={LINE_STYLES}
      />
      <motion.span
        animate={middleCtrl}
        initial={{ opacity: 1 }}
        className={LINE_STYLES}
      />
      <motion.span
        animate={bottomCtrl}
        initial={{ y: OFFSET }}
        className={LINE_STYLES}
      />
    </button>
  );
}
