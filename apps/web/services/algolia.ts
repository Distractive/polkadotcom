import { type SearchClient, algoliasearch } from 'algoliasearch';

const algoliaAppId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!;
const algoliaApiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!;

class AlgoliaSingleton {
  private static instance: ReturnType<typeof algoliasearch>;

  private constructor() {}

  static getInstance() {
    if (!AlgoliaSingleton.instance) {
      AlgoliaSingleton.instance = algoliasearch(algoliaAppId, algoliaApiKey);
    }

    return AlgoliaSingleton.instance;
  }
}

export function getSearchClient(): SearchClient {
  const baseClient = AlgoliaSingleton.getInstance();

  return {
    ...baseClient,
    // biome-ignore lint/suspicious/noExplicitAny: <Allowed>
    search(requests: any[]) {
      if (requests.every(({ params }) => !params.query)) {
        return Promise.resolve({
          results: requests.map(() => ({
            hits: [],
            nbHits: 0,
            nbPages: 0,
            page: 0,
            processingTimeMS: 0,
            hitsPerPage: 0,
            exhaustiveNbHits: false,
            query: '',
            params: '',
          })),
        });
      }

      return baseClient.search(requests);
    },
  };
}

function sanitizeString(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

export function queryHook(query: string, search: (value: string) => void) {
  return setTimeout(() => search(sanitizeString(query)), 1500);
}
