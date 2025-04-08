'use client';

import { queryHook } from '@/services/algolia';
import { Icon } from '@shared/ui';
import Link from 'next/link';
import { useRef, useState } from 'react';
import {
  Highlight,
  Hits,
  SearchBox,
  useInstantSearch,
} from 'react-instantsearch';
import { CustomSnippet } from './custom-snippet';
import { useOnSearchClose } from './useOnSearchClose';

export function DesktopSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { results } = useInstantSearch();

  const containerRef = useRef<HTMLDivElement>(null);

  useOnSearchClose(containerRef, () => {
    setIsSearchOpen(false);
  });

  return (
    <div
      ref={containerRef}
      data-testid="search-button"
      className={`relative transition-all duration-300 ${
        isSearchOpen ? 'w-[30rem]' : 'w-10'
      }`}
    >
      {isSearchOpen ? (
        <>
          <SearchBox
            queryHook={queryHook}
            placeholder="Search..."
            classNames={{
              form: 'w-full flex justify-between',
              input:
                'rounded border-none outline-none focus:ring-0 focus:border-0 w-[85%]',
              submit: 'hidden',
            }}
          />
          <div
            className={`m-5 absolute left-0 right-0 mt-8 bg-white shadow-lg max-h-[80vh] overflow-scroll text-grey-700 z-[999999] ${!results?.hits?.length && 'customHidden'} customRounded`}
          >
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
                      <div className="grid grid-cols-10 text-l font-bold hover:bg-grey-100 p-2">
                        <Icon variant="magnify" className="size-8 col-span-1" />
                        <div className="col-span-9">
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
        </>
      ) : (
        <button
          type="button"
          onClick={() => setIsSearchOpen(true)}
          className="p-2"
        >
          <Icon variant="magnify" className="size-10" />
        </button>
      )}
    </div>
  );
}
