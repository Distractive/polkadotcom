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
      name: 'liveMetric',
      title: 'Select Live Metric',
      type: 'string',
      group: 'metric',
      options: {
        list: [
          { title: 'Active Validators', value: 'activeValidators' },
          {
            title: 'Percent DOT Supply Staked',
            value: 'percentDOTSupplyStaked',
          },
          { title: 'Total DOT Staked', value: 'totalDOTStaked' },
          { title: 'Total Fees (30-Day, USD)', value: 'totalFeesUSD30d' },
          { title: 'Total Nominators', value: 'totalNominators' },
          { title: 'Total Referendums', value: 'totalReferendums' },
          { title: 'Total Stablecoin (USD)', value: 'totalStablecoinsUSD' },
          {
            title: 'Total Stakers (Nominators + Pool Members)',
            value: 'totalStakers',
          },
          { title: 'Treasury Balance (USD)', value: 'treasuryBalanceUSD' },
          { title: 'Unique Accounts', value: 'uniqueAccounts' },
          { title: 'Uptime (30-Day)', value: 'polkadotUptime30d' },
        ],
        layout: 'dropdown',
      },
      hidden: ({ parent }) => !parent?.useLiveMetric,
    }),
    defineField({
      name: 'heading',
      description:
        'For static metrics, use this field for the metric number/percent/value. When using a live metric, you can use this field to set a fallback value in case the API call fails.',
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
  preview: {
    select: {
      title: 'body',
    },
  },
});
