import type { Hit } from 'algoliasearch';
import { Snippet } from 'react-instantsearch';

export function CustomSnippet({
  hit,
  attributes,
  // biome-ignore lint/suspicious/noExplicitAny: <Allowed>
}: { hit: Hit<any>; attributes: string[] }) {
  for (const attribute of attributes) {
    const attributeResult = hit._highlightResult?.[attribute];

    if (attributeResult && attributeResult.matchLevel !== 'none') {
      return <Snippet attribute={attribute} hit={hit} />;
    }
  }
}
