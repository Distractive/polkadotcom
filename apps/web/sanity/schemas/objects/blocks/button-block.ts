import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'buttonBlock',
  title: 'ButtonBlock',
  type: 'object',
  fields: [
    defineField({
      name: 'link',
      title: 'Link',
      type: 'customUrl',
    }),
  ],
  preview: {
    select: {
      title: 'link.label',
    },
    prepare: ({ title }) => ({
      title,
      subtitle: '- Standalone Button block',
    }),
  },
});
