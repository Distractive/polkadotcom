// /** @type {import('next-sitemap').IConfig} */
import { createClient } from 'next-sanity';

const baseUrl = 'https://polkadot.com';
const docTypes = ['post', 'page', 'landing'];

// Create Sanity client
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-05-03',
  useCdn: false,
});

async function fetchDataFromSanity() {
  const query = `
    *[_type in [${docTypes.map((type) => `"${type}"`).join(', ')}] && _id in path("drafts.**") == false] {
      _type,
      slug,
      post_type,
      _updatedAt,
    }
  `;
  try {
    const data = await sanityClient.fetch(query);
    return data;
  } catch (error) {
    console.error('Sanity query error:', error);
    return [];
  }
}

export default {
  siteUrl: baseUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    '/blog/tag/*/page/*',
    '/case-studies/tag/*/page/*',
    '/newsroom/press-releases/tag/*/page/*',
  ],
  additionalPaths: async (config) => {
    const result = [];

    // Add home page
    result.push({ loc: '/', lastmod: new Date().toISOString() });

    const sanityData = await fetchDataFromSanity();

    // Add Sanity pages to result
    sanityData.forEach((doc) => {
      if (!doc.slug || !doc.slug.current) {
        return;
      }

      let path;
      switch (doc._type) {
        case 'post':
          switch (doc.post_type) {
            case 'Case Study':
              path = `/case-studies/${doc.slug.current}`;
              break;
            case 'Press Release':
              path = `/newsroom/press-releases/${doc.slug.current}`;
              break;
            default:
              path = `/blog/${doc.slug.current}`;
              break;
          }
          break;
        case 'page':
          path = `/${doc.slug.current}`;
          break;
        case 'landing':
          path = `/${doc.slug.current}`;
          break;
        default:
          return;
      }

      result.push({
        loc: path,
        lastmod: new Date(doc._updatedAt).toISOString(),
      });
    });

    return result;
  },
  transform: async (config, path) => {
    return {
      loc: path,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};

