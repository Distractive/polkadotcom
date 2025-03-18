import 'dotenv/config';

import { createClient } from '@sanity/client';
import { algoliasearch } from 'algoliasearch';

interface SanityDoc {
  heading: string;
  eyebrow: string;
  altText: string;
  g_id: string;
  slug?: { current: string };
  title?: string;
  name?: string;
  term?: string;
  _type: string;
  custom_excerpt?: string;
  published_date?: string;
  tierthree: boolean;
  meta?: { meta_title?: string; meta_description?: string };
  body?: {
    children?: {
      text?: string;
    }[];
  }[];
  _id: string;
  post_type?: string;
  parent?: { _type: string; _ref: string };
  breadcrumb?: string;
  _rev: string;
  header?: {
    body?: string;
    title: string;
    isAlternative: boolean;
  };
  author: {
    _ref: string;
    _type: string;
  };
  tags: {
    _ref: string;
    _type: string;
    _key: string;
  }[];
  pageBuilder?: {
    pageBuilder?: {
      body: string;
      items?: { body: string; heading: string }[];
      heading: string;
    }[];
  };
  copy?: string;
}

interface AlgoliaRecord {
  objectID: string;
  heading: string;
  slug: string;
  title?: string;
  meta_description?: string;
  body?: string;
  name?: string;
  header_title?: string;
  page_builder_body?: string;
  page_builder_items_body?: string;
  page_builder_items_heading?: string;
  page_builder_heading?: string;
  custom_excerpt?: string;
}

function getEnvVar(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

function getConfig() {
  return {
    algoliaAppId: getEnvVar('NEXT_PUBLIC_ALGOLIA_APP_ID'),
    algoliaApiKey: getEnvVar('ALGOLIA_ADMIN_API_KEY'),
    pageIndexName: getEnvVar('NEXT_PUBLIC_ALGOLIA_INDEX_NAME'),
    blogIndexName: getEnvVar('NEXT_PUBLIC_ALGOLIA_BLOG_INDEX_NAME'),
    sanityProjectId: getEnvVar('NEXT_PUBLIC_SANITY_PROJECT_ID'),
    sanityDataset: getEnvVar('NEXT_PUBLIC_SANITY_DATASET'),
  };
}

const {
  algoliaAppId,
  algoliaApiKey,
  pageIndexName,
  blogIndexName,
  sanityProjectId,
  sanityDataset,
} = getConfig();

const algoliaClient = algoliasearch(algoliaAppId, algoliaApiKey);

const sanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: '2023-01-01',
  useCdn: false,
});

const QUERY = `*[
  !(_type in [
    "redirects",
    "glossaryEntry",
    "footer",
    "menu",
    "socialLink",
    "glossary",
    "image",
    "sanity.fileAsset",
    "not-found",
    "sanity.imageAsset",
    "navigation",
    "single",
    "notfound",
    "banner",
    "author",
    "media.tag",
    "platform",
    "getting_started_landing",
    "category"
  ])
]`;

function calculateSize(rec: AlgoliaRecord): number {
  return Buffer.byteLength(JSON.stringify(rec), 'utf8');
}

function ensureRecordSizeUnder10KB(
  record: AlgoliaRecord,
  safeSize = 9500,
): AlgoliaRecord {
  const candidateFields: (keyof AlgoliaRecord)[] = [
    'body',
    'header_title',
    'page_builder_body',
    'page_builder_items_body',
    'page_builder_items_heading',
    'page_builder_heading',
  ];

  let recordSize = calculateSize(record);
  let anyTruncated = true;

  while (recordSize > safeSize && anyTruncated) {
    anyTruncated = false;
    for (const field of candidateFields) {
      const content = record[field];
      if (
        typeof content === 'string' &&
        content.length > 0 &&
        recordSize > safeSize
      ) {
        const truncated = `${content.slice(0, Math.floor(content.length / 2)).trim()}...`;
        if (truncated.length < content.length) {
          record[field] = truncated;
          anyTruncated = true;
          recordSize = calculateSize(record);
        }
      }
    }
  }

  return record;
}

function getDocSlug(doc: SanityDoc): string {
  if (!doc.slug?.current) {
    return '';
  }
  const baseSlug = doc.slug.current;
  if (
    doc.post_type === 'Blog' ||
    doc.post_type === 'Press Release' ||
    doc.post_type === 'Case Study'
  ) {
    return `blog/${baseSlug}`;
  }
  return baseSlug;
}

function initializeAlgoliaDoc(doc: SanityDoc): AlgoliaRecord {
  return {
    objectID: doc._id,
    heading: doc.heading,
    slug: getDocSlug(doc),
    title: doc.title ?? doc.meta?.meta_title,
    name: doc.name,
    custom_excerpt: doc.custom_excerpt,
    meta_description: doc.meta?.meta_description,
    header_title: doc.header?.title,
    body: undefined,
    page_builder_body: undefined,
    page_builder_items_body: undefined,
    page_builder_items_heading: undefined,
    page_builder_heading: undefined,
  };
}

function mapSanityToAlgolia(doc: SanityDoc): AlgoliaRecord {
  const record: AlgoliaRecord = initializeAlgoliaDoc(doc);

  if (typeof doc.body === 'string') {
    record.body = doc.body;
  }

  if (doc.header?.body) {
    record.header_title = doc.header.body;
  }

  if (Array.isArray(doc.body)) {
    const bodyTextAcc = (doc.body ?? [])
      .flatMap((body) => body.children ?? [])
      .map((child) => child.text ?? '')
      .join('');
    record.body = `${record.body} ${bodyTextAcc}`.trim();
  }

  if (doc.pageBuilder?.pageBuilder) {
    const rootHeading = doc.pageBuilder.pageBuilder
      .map((pb) => pb.heading)
      .join('');
    const rootBody = doc.pageBuilder.pageBuilder.map((pb) => pb.body).join('');

    const itemsHeading = doc.pageBuilder.pageBuilder
      .flatMap((pb) => pb.items?.map((item) => item.heading) ?? [])
      .join('');
    const itemsBody = doc.pageBuilder.pageBuilder
      .flatMap((pb) => pb.items?.map((item) => item.body) ?? [])
      .join('');

    record.page_builder_heading = rootHeading;
    record.page_builder_body = rootBody;
    record.page_builder_items_heading = itemsHeading;
    record.page_builder_items_body = itemsBody;
  }

  return ensureRecordSizeUnder10KB(record);
}

async function migrate(indexName: string) {
  console.log(`Data to ${indexName} migration started`);

  try {
    const docs: SanityDoc[] = await sanityClient.fetch(QUERY);
    let records: AlgoliaRecord[] = docs.flatMap(mapSanityToAlgolia);

    if (indexName === 'blog') {
      records = records.filter((record) => record.slug.includes('blog'));
    } else {
      records = records.filter((record) => !record.slug.includes('blog'));
    }

    await algoliaClient.clearObjects({ indexName });
    await algoliaClient.saveObjects({
      indexName,
      objects: records as unknown as Record<string, unknown>[],
    });

    console.log(
      `Data successfully migrated to index ${indexName}. Migrated records: ${records.length}`,
    );
  } catch (err) {
    console.error(`Error indexing documents for ${indexName}:`, err);
  }
}

async function main() {
  await migrate(pageIndexName);
  await migrate(blogIndexName);
}

main().catch((err) => {
  console.error('Unhandled error in migration', err);
  process.exit(1);
});
