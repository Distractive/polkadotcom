import { useCallback, useRef } from 'react';

export function useQueryHook() {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback((query: string, search: (val: string) => void) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      search(
        query
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#x27;')
          .replace(/\//g, '&#x2F;')
          .trim(),
      );
    }, 500);
  }, []);
}
