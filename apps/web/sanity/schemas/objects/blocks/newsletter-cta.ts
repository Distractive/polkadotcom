import { HBSPT_LIST } from '@/sanity/lib/lists';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'newsletterCTA',
  title: 'CTA - Newsletter',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
    defineField({
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
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
    }),
    defineField({
      name: 'formType',
      title: 'Form Type',
      type: 'string',
      options: {
        list: HBSPT_LIST,
      },
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare: ({ title }) => ({
      title,
      subtitle: '- Newsletter CTA',
    }),
  },
});
