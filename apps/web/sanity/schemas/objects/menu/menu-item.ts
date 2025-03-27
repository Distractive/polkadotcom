import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'menuItem',
  title: 'Menu Item',
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
  },
});
