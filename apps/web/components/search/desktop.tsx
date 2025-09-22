'use client';

import { useQueryHook } from '@/hooks/use-search-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import {
  Highlight,
  Hits,
  SearchBox,
  useInstantSearch,
  useSearchBox,
} from 'react-instantsearch';
import { useSearchState } from '../../hooks/use-search-state';
import { CustomSnippet } from './custom-snippet';
import { useOnSearchClose } from './useOnSearchClose';

function NoResults() {
  const { results } = useInstantSearch();
  const { query } = useSearchBox();

  if (query && results && results.hits.length === 0) {
    return (
      <div className={'p-4'}>No results found for &quot;{query}&quot;</div>
    );
  }
  return null;
}

export function DesktopSearch() {
  const { isSearchOpen, setIsSearchOpen } = useSearchState();
  const queryHook = useQueryHook();

  const containerRef = useRef<HTMLDivElement>(null);

  useOnSearchClose(containerRef, () => {
    setIsSearchOpen(false);
  });

  return (
    <div
      ref={containerRef}
      data-testid="search-button"
      className={`relative ${
        isSearchOpen
          ? 'w-[20rem] transition-all duration-300 ease-in-out'
          : 'w-10 transition-all'
      }`}
    >
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="p-2 flex-shrink-0"
        >
          <Image
            src="/icons/magnifying-glass.svg"
            alt="Search"
            width={32}
            height={18}
            className="w-8 h-auto"
          />
        </button>
        {isSearchOpen && (
          <div className="flex-1">
            <SearchBox
              queryHook={queryHook}
              placeholder="Search..."
              classNames={{
                form: 'w-full flex flex-row items-center',
                input:
                  'rounded border-none outline-none focus:ring-0 focus:border-0 flex-1 p-1 bg-white/0 placeholder-white',
                submit: 'hidden',
                reset: 'flex-shrink-0 ml-2',
              }}
            />
          </div>
        )}
      </div>
      {isSearchOpen && (
        <div
          className={
            'm-5 absolute left-[-1rem] mt-8 bg-white shadow-lg max-h-[80vh] text-grey-700 z-[999999] customRounded w-[30rem]'
          }
        >
          <div className="max-h-[80vh] overflow-y-auto overflow-x-hidden">
            <NoResults />
            <Hits
              hitComponent={({ hit }) =>
                hit.slug && (
                  <div
                    className={`p-4 ${hit.__position === 1 ? 'border-0' : 'border-t border-grey-200'}`}
                  >
                    <Link
                      href={`${hit.slug}`}
                      onClick={() => setIsSearchOpen(false)}
                    >
                      <div className="flex items-center text-l font-bold hover:bg-grey-100 p-2">
                        <Image
                          src="/icons/magnifying-glass.svg"
                          alt="Search"
                          width={32}
                          height={18}
                          className="w-6 h-auto brightness-0 mr-3 flex-shrink-0"
                        />
                        <div className="flex-1">
                          <Highlight attribute="title" hit={hit} />
                        </div>
                      </div>
                      <div className="grid grid-cols-10 font-light hover:bg-grey-100 p-2">
                        <div className="col-span-1"> </div>
                        <div className="col-span-9">
                          <CustomSnippet
                            hit={hit}
                            attributes={[
                              'page_builder_body',
                              'page_builder_items_body',
                              'page_builder_items_heading',
                              'meta_description',
                              'page_builder_heading',
                              'body',
                            ]}
                          />
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
