import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'countdownTimer',
  title: 'Countdown Timer',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'targetDate',
      title: 'Target Date and Time',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare: ({ title }) => ({
      title,
      subtitle: 'Countdown Timer',
    }),
  },
});
