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
      initialValue: {
        asset: {
          _type: 'reference',
          _ref: 'image-62d84523d14243c6c33f2bf57c57da38142fe3bb-525x416-png',
        },
      },
    }),
    defineField({
      name: 'adjustImageForOverflow',
      title: 'Adjust Image Padding?',
      description:
        "Turn this on to compensate for the paper airplane in the default image overflowing its container. Turn this off if you're using a different image.",
      type: 'boolean',
      initialValue: true,
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
      initialValue: "Don't miss a beat",
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
      initialValue: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Subscribe to the Polkadot newsletter to get your regular dose of ecosystem updates and events straight to your inbox.',
              marks: [],
            },
          ],
          markDefs: [],
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
      initialValue: 'e2c50b46-5b6d-4d7e-b8cf-728a4ecc8da3',
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
