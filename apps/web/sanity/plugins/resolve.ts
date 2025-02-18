import { defineDocuments, defineLocations } from 'sanity/presentation';

import { resolveHref } from '../lib/utils';

export const mainDocuments = defineDocuments([
  {
    route: '/:slug',
    filter: `_type == "landing" && slug.current == $slug`,
  },
  {
    route: '/blog/:slug',
    filter: `_type == "post" && slug.current == $slug`,
  },
]);

export const locations = {
  landing: defineLocations({
    select: { title: 'title', slug: 'slug.current' },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title || 'Untitled',
          href: resolveHref('landing', doc?.slug)!,
        },
      ],
    }),
  }),
  page: defineLocations({
    select: { title: 'title', slug: 'slug.current' },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title || 'Untitled',
          href: resolveHref('page', doc?.slug)!,
        },
      ],
    }),
  }),
  post: defineLocations({
    select: { title: 'title', slug: 'slug.current' },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title || 'Untitled',
          href: resolveHref('post', doc?.slug)!,
        },
      ],
    }),
  }),
};
