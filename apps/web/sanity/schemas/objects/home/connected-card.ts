import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'connectedCard',
  title: 'Connected Card',
  type: 'object',
  fields: [
    defineField({
      name: 'headerImage',
      title: 'Header Image',
      type: 'image',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 5,
    }),

    defineField({
      name: 'link',
      title: 'Link',
      type: 'customUrl',
    }),
  ],
});
