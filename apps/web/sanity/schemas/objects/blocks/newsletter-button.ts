import { HBSPT_LIST } from '@/sanity/lib/lists';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'newsletterButton',
  title: 'Newsletter Button',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Button Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'modalHeading',
      title: 'Modal Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'formType',
      title: 'Form Type',
      type: 'string',
      options: {
        list: HBSPT_LIST,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'variant',
      title: 'Button Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
        ],
      },
      initialValue: 'primary',
    }),
  ],
  preview: {
    select: {
      title: 'label',
      formType: 'formType',
    },
    prepare: ({ title, formType }) => ({
      title,
      subtitle: `Newsletter Button - ${formType}`,
    }),
  },
});
