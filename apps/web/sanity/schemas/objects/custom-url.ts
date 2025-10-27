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
      validation: (Rule) =>
        Rule.custom((value: string) => {
          if (!value) return true;

          if (value.startsWith('/')) return true;

          if (value.startsWith('https://') || value.startsWith('mailto:'))
            return true;

          return 'Must be a relative path starting with / or an external URL starting with https://';
        }),
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
        { type: 'caseStudy' },
      ],
      hidden: ({ parent, value }) => !value && !!parent?.external,
    },
  ],
});
