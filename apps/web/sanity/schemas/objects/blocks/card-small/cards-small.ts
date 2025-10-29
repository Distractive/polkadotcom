import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'cardsSmall',
  title: 'Cards Small',
  type: 'object',
  description: 'Create a list of small cards',
  groups: [
    { title: 'Config', name: 'config' },
    { title: 'Heading', name: 'heading' },
    { title: 'Content', name: 'contents' },
  ],
  fields: [
    defineField({
      title: 'Center the heading on desktop?',
      name: 'isHeadingCenteredDesktop',
      type: 'boolean',
      group: 'heading',
    }),
    defineField({
      title: 'Center the heading on tablet/mobile?',
      name: 'isHeadingCenteredMobile',
      type: 'boolean',
      group: 'heading',
    }),
    defineField({
      title: 'Heading',
      name: 'heading',
      type: 'string',
      group: 'heading',
    }),
    defineField({
      name: 'useRichText',
      title: 'Use Rich Text?',
      type: 'boolean',
      initialValue: false,
      description:
        'Toggle to use rich text (for links, bold, multiple paragraphs,etc.) instead of plain body copy. Toggling this option will not delete anything, it only hides the unused field in the UI.',
      group: 'heading',
    }),
    defineField({
      title: 'Body',
      name: 'body',
      type: 'text',
      rows: 3,
      group: 'heading',
      hidden: ({ parent }) => !!parent?.useRichText,
    }),
    defineField({
      name: 'richBody',
      title: 'Rich Text',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Smallprint', value: 'smallprint' },
          ],
          marks: {
            decorators: [{ title: 'Strong', value: 'strong' }],
          },
        },
        {
          type: 'break',
          initialValue: { style: 'lineBreak' },
        },
      ],
      group: 'heading',
      hidden: ({ parent }) => !parent?.useRichText,
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'cardSmall',
        }),
      ],
      group: 'contents',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      description:
        'An image that sits behind the cards, anchored to the top and right hand side of the list. Appears on desktop only.',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare: ({ title }) => ({
      title,
      subtitle: '- Small Cards block',
    }),
  },
});
