import { defineType } from 'sanity';

export default defineType({
  name: 'customUrl',
  title: 'Custom URL',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
    },
    {
      name: 'variant',
      title: 'Variant',
      description:
        'Choose the variant of the link (choose the blank field from the dropdown to remove the link)',
      type: 'string',
      options: {
        list: ['primary', 'secondary', 'tertiary'],
      },
    },
    {
      name: 'external',
      type: 'string',
      title: 'URL or Path',
      description:
        'External URL (https://...) or internal path (/blog, /case-studies)',
      hidden: ({ parent, value }) => !value && !!parent?.internal,
    },
    {
      name: 'internal',
      type: 'reference',
      to: [
        { type: 'page' },
        { type: 'landing' },
        { type: 'hygiene' },
        { type: 'post' },
        { type: 'glossary' },
        { type: 'glossaryEntry' },
      ],
      hidden: ({ parent, value }) => !value && !!parent?.external,
    },
  ],
});
