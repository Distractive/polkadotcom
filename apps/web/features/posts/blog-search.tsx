'use client';

import { getSearchClient } from '@/services/algolia';
import { Icon, cn } from '@shared/ui';
import Link from 'next/link';
import {
  Hits,
  InstantSearch,
  SearchBox,
  useInstantSearch,
  useSearchBox,
} from 'react-instantsearch';

const indexName = process.env.NEXT_PUBLIC_ALGOLIA_BLOG_INDEX_NAME!;

const searchClient = getSearchClient();

// biome-ignore lint/suspicious/noExplicitAny: <Allowed>
function HitComponent({ hit }: { hit: any }) {
  return (
    <Link
      href={`/${hit.slug}`}
      className="text-blue line-clamp-1 h-10 overflow-hidden rounded-lg p-2 leading-roomy hover:bg-grey-300"
    >
      {hit.title}
    </Link>
  );
}

function NoResults() {
  const { results } = useInstantSearch();
  const { query } = useSearchBox();

  if (query && results && results.hits.length === 0) {
    return (
      <div className="p-4 text-gray-500">
        No results found for &quot;{query}&quot;
      </div>
    );
  }
  return null;
}

function Wrapper() {
  const { query } = useSearchBox();

  return (
    <>
      <div
        data-testid="blog-search"
        className={cn(
          'peer col-span-full flex items-center gap-1 self-stretch bg-grey-100 p-4 ring-1 ring-inset ring-grey-300 focus-within:ring-grey-500 hover:ring-grey-500 transition-all duration-300',
          query ? 'rounded-t-2xl' : 'rounded-2xl',
        )}
      >
        <Icon variant="magnify" className="size-6" />
        <SearchBox
          placeholder="Enter your search"
          classNames={{
            root: 'w-full',
            form: 'relative w-full',
            input: 'bg-grey-100 w-full outline-none placeholder:text-grey-500',
            submit: 'hidden',
            reset: 'hidden',
          }}
        />
      </div>
      <div
        className={cn(
          'transition-all duration-300 absolute w-full flex-col items-start justify-center overflow-auto rounded-b-2xl border border-t-0 border-grey-300 bg-grey-100 px-4 py-2 peer-focus-within:border-grey-500 peer-hover:border-grey-500',
          query
            ? 'pointer-events-auto top-14 max-h-64 opacity-100'
            : 'pointer-events-none top-10 h-0 opacity-80',
        )}
      >
        <NoResults />
        <Hits hitComponent={HitComponent} />
      </div>
    </>
  );
}

export function Search() {
  return (
    <div className="relative z-20">
      <InstantSearch indexName={indexName} searchClient={searchClient}>
        <Wrapper />
      </InstantSearch>
    </div>
  );
}
