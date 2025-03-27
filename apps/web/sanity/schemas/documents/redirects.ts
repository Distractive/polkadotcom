import { defineField, defineType } from 'sanity';

export const redirectType = defineType({
  name: 'redirects',
  title: 'Redirects',
  type: 'document',
  description: 'Redirect for next.config.js',
  fields: [
    defineField({
      name: 'source',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'destination',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'permanent',
      type: 'boolean',
    }),
  ],
  initialValue: {
    permanent: true,
  },
});
