import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'sideBySide',
  title: 'Side by Side',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'video',
    }),
    defineField({
      title: 'Image',
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
    }),
    defineField({
      title: 'is image on left?',
      name: 'isImageOnLeft',
      type: 'boolean',
      initialValue: false,
      description:
        'Show the image on the left side of the content, on desktop only',
    }),
    defineField({
      name: 'isTextVerticallyCentered',
      title: 'Vertically center the text?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
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
        {
          type: 'customUrl',
        },
        { type: 'newsletterButton' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare: ({ title }) => ({
      title,
      subtitle: '- Side by side block',
    }),
  },
});
