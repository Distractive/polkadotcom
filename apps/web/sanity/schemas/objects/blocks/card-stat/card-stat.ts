import { DocumentIcon, SearchIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'cardStat',
  title: 'Card Statistic',
  type: 'object',
  groups: [
    { title: 'Heading', name: 'heading', icon: SearchIcon },
    { title: 'Content', name: 'content', icon: DocumentIcon },
    { title: 'Metric', name: 'metric', icon: DocumentIcon },
  ],
  fields: [
    defineField({
      name: 'useLiveMetric',
      title: 'Use Live Metric',
      type: 'boolean',
      initialValue: false,
      group: 'metric',
    }),
    defineField({
      name: 'metric',
      title: 'Select Metric',
      type: 'string',
      group: 'metric',
      options: {
        list: [
          { title: '30-Day Fees (USD)', value: 'total_fees_usd_30d' },
          { title: 'Active Validators', value: 'active_validators' },
          { title: 'Nominators', value: 'nominators' },
        ],
        layout: 'dropdown',
      },
      hidden: ({ parent }) => !parent?.useLiveMetric,
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 5,
      group: 'content',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          marks: {
            decorators: [{ title: 'Strong', value: 'strong' }],
          },
        },
        { type: 'customUrl' },
      ],
    }),
  ],
});
