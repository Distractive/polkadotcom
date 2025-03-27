import { useBreakpoint } from '@/hooks/use-breakpoint';
import { Configure, InstantSearch } from 'react-instantsearch';

import { getSearchClient } from '@/services/algolia';
import { DesktopSearch } from './desktop';
import { MobileSearch } from './mobile';
import './search.styles.css';

const searchClient = getSearchClient();

export function Search() {
  const isMobile = useBreakpoint('--screen-lg');

  return (
    <InstantSearch indexName={'page'} searchClient={searchClient}>
      <Configure
        attributesToSnippet={[
          'meta_description:50',
          'page_builder_body:50',
          'page_builder_items_body:50',
          'page_builder_items_heading:50',
          'page_builder_heading:50',
          'body:200',
        ]}
        snippetEllipsisText="…"
      />
      {isMobile ? <MobileSearch /> : <DesktopSearch />}
    </InstantSearch>
  );
}
