import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'banner',
  title: 'Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'isBannerOn',
      title: 'Turn Banner On',
      type: 'boolean',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description:
        'Eyebrow text, recommended to be 28 characters or less. More than this will cause text wrapping on smaller mobile devices.',
    }),
    defineField({
      name: 'header',
      title: 'Header',
      type: 'string',
      description:
        'Main text, recommended to be 24 characters or less. More than this will cause text wrapping on smaller mobile devices.',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
    }),
    defineField({
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'object',
      description:
        "If you're trying to add an external link and don't see the field, clear the existing internal link.",
      fields: [
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
            { type: 'blog' },
            { type: 'press-releases' },
            { type: 'case-studies' },
          ],
          hidden: ({ parent, value }) => !value && !!parent?.external,
        },
      ],
    }),
  ],
});
