'use client';

import { useLayoutEffect } from 'react';

interface Props {
  page: number;
}

export function ScrollToView({ page }: Props) {
  useLayoutEffect(() => {
    if (page > 1) {
      const targetElement = document.getElementById('main-content');
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [page]);

  return null;
}
