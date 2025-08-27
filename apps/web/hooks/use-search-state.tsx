'use client';

import { type ReactNode, createContext, useContext, useState } from 'react';

interface SearchStateContextType {
  isSearchOpen: boolean;
  setIsSearchOpen: (isOpen: boolean) => void;
}

const SearchStateContext = createContext<SearchStateContextType | undefined>(
  undefined,
);

export function SearchStateProvider({ children }: { children: ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <SearchStateContext.Provider value={{ isSearchOpen, setIsSearchOpen }}>
      {children}
    </SearchStateContext.Provider>
  );
}

export function useSearchState() {
  const context = useContext(SearchStateContext);
  if (context === undefined) {
    throw new Error('useSearchState must be used within a SearchStateProvider');
  }
  return context;
}
