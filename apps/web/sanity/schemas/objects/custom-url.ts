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
        list: ['primary', 'secondary'],
      },
    },
    {
      name: 'external',
      type: 'url',
      title: 'URL',
      hidden: ({ parent, value }) => !value && !!parent?.internal,
      validation: (Rule) =>
        Rule.uri({
          scheme: ['https', 'mailto'],
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
      ],
      hidden: ({ parent, value }) => !value && !!parent?.external,
    },
  ],
});
