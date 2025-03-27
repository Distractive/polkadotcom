import { client } from './client';

export async function slugifier(input: {
  doc: { title: string; parent: { _ref: string } };
}) {
  let pageSlug = input.doc.title
    .toLowerCase()
    .replace(/\s+/g, '-') // slugify the title
    .slice(0, 200);

  // Remove all non-alphanumeric characters (but keep the hyphens)
  pageSlug = pageSlug.replace(/[^A-Za-z0-9-]/g, '');

  if (input.doc.parent) {
    const query = '*[_id == $parentID]';
    const params = { parentID: input.doc.parent._ref };

    const result = await client.fetch(query, params);

    if (result.length > 0) {
      const parentSlug = result[0].slug.current;
      return `${parentSlug}/${pageSlug}`;
    }

    return pageSlug;
  }

  return pageSlug;
}
