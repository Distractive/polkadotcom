import * as fs from 'node:fs';
import path from 'node:path';
import { Feed } from 'feed';
/** @type {import('next-sitemap').IConfig} */
import { createClient } from 'next-sanity';

const baseUrl = 'https://polkadot.com';
const siteName = 'Polkadot';
const siteDescription = 'Polkadot - The Platform for Web3';
const docTypes = ['post', 'page', 'landing'];

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
      _id,
      title,
      slug,
      post_type,
      _updatedAt,
      published_date,
      custom_excerpt,
      author->{name, image{asset->{url}}},
      "tags": tags[]->{ name, slug },
      image{asset->{url, metadata{dimensions}}}
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

async function generateRssFeed(documents) {
  console.log('Generating RSS feed...');

  const feed = new Feed({
    title: `${siteName} - All Content`,
    description: siteDescription,
    id: baseUrl,
    link: baseUrl,
    language: 'en',
    favicon: `${baseUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${siteName}`,
    updated: new Date(),
    feedLinks: {
      rss: `${baseUrl}/feed.xml`,
    },
    author: {
      name: siteName,
      link: baseUrl,
    },
  });

  documents.forEach((doc) => {
    if (!doc.slug || !doc.slug.current) {
      return;
    }

    if (doc._type !== 'post') {
      return;
    }

    let contentPath;
    let contentType;

    switch (doc.post_type) {
      case 'Case Study':
        contentPath = `case-studies/${doc.slug.current}`;
        contentType = 'Case Study';
        break;
      case 'Press Release':
        contentPath = `newsroom/press-releases/${doc.slug.current}`;
        contentType = 'Press Release';
        break;
      default:
        contentPath = `blog/${doc.slug.current}`;
        contentType = 'Blog';
        break;
    }

    const url = `${baseUrl}/${contentPath}`;
    const publishDate = doc.published_date
      ? new Date(doc.published_date)
      : new Date(doc._updatedAt);

    feed.addItem({
      title: doc.title || 'Untitled',
      id: url,
      link: url,
      description: doc.custom_excerpt || '',
      content: doc.custom_excerpt || '',
      author: doc.author
        ? [
            {
              name: doc.author.name,
              link: `${baseUrl}/about`,
            },
          ]
        : [],
      date: publishDate,
      image: doc.image?.asset.url,
      category: [
        { name: contentType },
        ...(doc.tags?.map((tag) => ({ name: tag.name })) || []),
      ],
    });
  });

  feed.items.sort((a, b) => b.date - a.date);

  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'feed.xml'), feed.rss2());

  console.log('RSS feed generated successfully!');
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
    const sanityData = await fetchDataFromSanity();

    await generateRssFeed(sanityData);

    const result = [];

    result.push({ loc: '/', lastmod: new Date().toISOString() });

    result.push({
      loc: '/feed.xml',
      lastmod: new Date().toISOString(),
    });

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
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [],
  },
};
