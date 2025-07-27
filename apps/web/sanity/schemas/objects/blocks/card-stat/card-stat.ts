import { DocumentIcon, SearchIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const liveMetricOptions = [
  { title: 'Active Validators', value: 'getActiveValidators' },
  { title: 'Approved Referendums', value: 'getApprovedReferendums' },
  {
    title: 'Average Monthly Governance Voters',
    value: 'getAverageMonthlyGovernanceVoters',
  },
  { title: 'DAO Members', value: 'getDaoMembers' },
  { title: 'Percent DOT Supply Staked', value: 'getPercentDOTSupplyStaked' },
  { title: 'Total DOT Staked', value: 'getTotalDOTStaked' },
  { title: 'Total Fees (30-Day, USD)', value: 'getTotalFeesUSD30d' },
  { title: 'Total Nominators', value: 'getTotalNominators' },
  { title: 'Total Referendums', value: 'getTotalReferendums' },
  { title: 'Total Stablecoin (USD)', value: 'getTotalStablecoinsUSD' },
  {
    title: 'Total Stakers (Nominators + Pool Members)',
    value: 'getTotalStakers',
  },
  { title: 'Treasury Balance (USD)', value: 'getDailyTreasuryBalanceUSD' },
  {
    title: 'Total Unique Accounts (Ecosystem)',
    value: 'getTotalUniqueAccounts',
  },
  { title: 'Uptime (30-Day)', value: 'getPolkadotUptime30d' },
];

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
      name: 'icon',
      title: 'Icon',
      type: 'image',
      group: 'heading',
    }),
    defineField({
      name: 'makeIconFullWidth',
      title: 'Make icon full width?',
      type: 'boolean',
      group: 'heading',
    }),
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
        list: liveMetricOptions,
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
        'If the result is greater than 1 million, this option will truncate the value (e.g. 12,345,678 becomes 12.3. Use the heading field if you want to add "million" or "M" to the end of the metric).',
      title: 'Display in millions?',
      type: 'boolean',
      hidden: ({ parent }) => !parent?.useLiveMetric,
    }),
    defineField({
      name: 'heading',
      description:
        'For static metrics, use this field as normal for your heading.For live metrics, this field will append a heading to the metric. For example, if you want the header to say "*Metric Number* Approved Referenda", you can set the heading to " Approved Referenda". Be sure to add the preceding space if necessary.',
      title: 'Heading',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'fallbackHeading',
      description:
        'When using a live metric, you can use this field to set a fallback value in case the API call fails. Use a plus sign to indicate that the number is approximate, i.e. "930+ Approved Referenda".',
      title: 'Fallback Heading',
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
      useLiveMetric: 'useLiveMetric',
      liveMetric: 'liveMetric',
      heading: 'heading',
    },
    prepare(selection) {
      const { title, useLiveMetric, liveMetric, heading } = selection;

      if (useLiveMetric && liveMetric) {
        const metricOption = liveMetricOptions.find(
          (option) => option.value === liveMetric,
        );
        const metricTitle = metricOption?.title || liveMetric;

        return {
          title: `Live Metric: ${metricTitle}`,
          subtitle: title,
        };
      }

      return {
        title: heading || 'No heading',
        subtitle: title,
      };
    },
  },
});
