'use client';

import { queryHook } from '@/services/algolia';
import { Icon } from '@shared/ui';
import Link from 'next/link';
import { useState } from 'react';
import { Highlight, Hits, SearchBox } from 'react-instantsearch';
import { CustomSnippet } from './custom-snippet';

export function MobileSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  if (!isSearchOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsSearchOpen(true)}
        className="p-2"
      >
        <Icon variant="magnify" className="size-10" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999]">
      <div className="fixed inset-0 w-screen h-screen bg-black/30 backdrop-blur-sm">
        {' '}
      </div>
      <div className="relative z-[10000]">
        <div className="flex justify-between items-center bg-white m-2 p-2 rounded-xl">
          <SearchBox
            queryHook={queryHook}
            placeholder="Search..."
            className="w-full"
            classNames={{
              form: 'w-full flex',
              input: 'rounded p-2 w-full outline-none focus:ring-0',
              submit: 'hidden',
              reset: 'hidden',
            }}
          />
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            className="ml-2 p-2 text-lg"
          >
            <Icon variant="close" className="size-10" />
          </button>
        </div>

        <div className="m-2 bg-white rounded-xl shadow-lg max-h-[80vh] overflow-scroll text-grey-700">
          <Hits
            hitComponent={({ hit }) =>
              hit.slug && (
                <div className="p-5 border-b border-grey-200">
                  <Link
                    href={`${hit.slug}`}
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <div className="flex justify-between items-center font-bold mb-5">
                      <div>
                        <Highlight attribute="title" hit={hit} />
                      </div>
                      <div>
                        <Icon variant="magnify" className="size-10" />
                      </div>
                    </div>
                    <p className="font-light mb-5">
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
                    </p>
                  </Link>
                </div>
              )
            }
          />
        </div>
      </div>
    </div>
  );
}
