import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'ecosystemCard',
  title: 'Ecosystem Card',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      description: 'e.g. "DeFi", "NFTs", "Gaming", "Social"',
      type: 'string',
    }),
    defineField({
      name: 'categoryColor',
      title: 'Category Color',
      type: 'string',
      description: 'Hex color like #FF00AA',
      validation: (Rule) =>
        Rule.regex(/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/).error(
          'Use a 3 or 6 digit hex starting with #',
        ),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
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
