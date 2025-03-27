import { HBSPT_LIST } from '@/sanity/lib/lists';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'modal',
  title: 'Hubspot Modal Form',
  type: 'object',
  groups: [
    { title: 'Call to action', name: 'cta' },
    { title: 'Modal', name: 'modal' },
  ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'cta',
      title: 'Button label',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'modalHeading',
      title: 'Modal Heading',
      type: 'string',
      group: 'modal',
    }),
    defineField({
      name: 'formType',
      title: 'Form Type',
      type: 'string',
      group: 'modal',
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
      subtitle: '- Hubspot Modal Form block',
    }),
  },
});
