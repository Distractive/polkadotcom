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
          { title: 'Active Validators', value: 'getActiveValidators' },
          {
            title: 'Approved Referendums',
            value: 'getApprovedReferendums',
          },
          {
            title: 'Average Monthly Governance Voters',
            value: 'getAverageMonthlyGovernanceVoters',
          },
          {
            title: 'Percent DOT Supply Staked',
            value: 'getPercentDOTSupplyStaked',
          },
          { title: 'Total DOT Staked', value: 'getTotalDOTStaked' },
          { title: 'Total Fees (30-Day, USD)', value: 'getTotalFeesUSD30d' },
          { title: 'Total Nominators', value: 'getTotalNominators' },
          { title: 'Total Referendums', value: 'getTotalReferendums' },
          { title: 'Total Stablecoin (USD)', value: 'getTotalStablecoinsUSD' },
          {
            title: 'Total Stakers (Nominators + Pool Members)',
            value: 'getTotalStakers',
          },
          { title: 'Treasury Balance (USD)', value: 'getTreasuryBalanceUSD' },
          { title: 'Unique Accounts', value: 'getUniqueAccounts' },
          { title: 'Uptime (30-Day)', value: 'getPolkadotUptime30d' },
        ],
        layout: 'dropdown',
      },
      hidden: ({ parent }) => !parent?.useLiveMetric,
    }),
    defineField({
      name: 'addDollarSign',
      title: 'Add a dollar sign?',
      type: 'boolean',
      hidden: ({ parent }) => !parent?.useLiveMetric,
    }),
    defineField({
      name: 'displayInMillions',
      description:
        'If the result is greater than 1 million, this option will truncate the value (e.g. 12,345,678 becomes 12.3 million).',
      title: 'Display in millions?',
      type: 'boolean',
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
        {
          type: 'customUrl',
          options: {
            isNested: true,
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'body',
    },
  },
});
