import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'cards',
  title: 'Cards',
  type: 'object',
  description: 'Create a list of cards',
  groups: [
    { title: 'Config', name: 'config' },
    { title: 'Heading', name: 'heading' },
    { title: 'Content', name: 'contents' },
  ],
  fields: [
    defineField({
      name: 'isCarousel',
      title: 'Is Carousel?',
      description: 'If true, the cards will be displayed in a carousel',
      type: 'boolean',
      initialValue: false,
      group: 'config',
      hidden: ({ parent, value }) =>
        (!value && !!parent?.hasTags) || !!parent?.showSideBySide,
    }),
    defineField({
      name: 'hasTags',
      title: 'Has Tags?',
      description: 'If true, the card list will have tags filter',
      type: 'boolean',
      initialValue: false,
      group: 'config',
      hidden: ({ parent, value }) =>
        (!value && !!parent?.isCarousel) || !!parent?.showSideBySide,
    }),
    defineField({
      name: 'useFourColumns',
      title: 'Use 4 columns?',
      description:
        'If true, layout will use 4 columns instead of 3 at extra-large screen sizes',
      type: 'boolean',
      initialValue: false,
      group: 'config',
      // hidden: ({ parent, value }) =>
      //   (!value && !!parent?.isCarousel) || !!parent?.showSideBySide,
    }),
    defineField({
      title: 'Heading',
      name: 'heading',
      type: 'string',
      group: 'heading',
    }),
    defineField({
      title: 'Body',
      name: 'body',
      type: 'text',
      rows: 3,
      group: 'heading',
    }),
    defineField({
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        "Add tags to filter the cards. Only works if 'Has Tags?' is enabled",
      hidden: ({ parent, value }) => !value && !parent?.hasTags,
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'card',
        }),
      ],
      group: 'contents',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      hasTags: 'hasTags',
      isCarousel: 'isCarousel',
    },
    prepare: ({ title, hasTags, isCarousel }) => ({
      title,
      subtitle: hasTags
        ? '- Card block with tags'
        : isCarousel
          ? '- Cardblock as carousel'
          : '- Card block',
    }),
  },
});
