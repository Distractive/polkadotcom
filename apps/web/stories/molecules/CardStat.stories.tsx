import type { Meta, StoryObj } from '@storybook/react';

import CardStatBlock from '@/features/page/blocks/cards-stats/card-stat';

const meta = {
  title: 'Molecules/CardStat',
  component: CardStatBlock,
} satisfies Meta<typeof CardStatBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    card: {
      _key: 'internal',
      useLiveMetric: false,
      heading: '1.3 million',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      content: null,
    },
  },
};

export const PrimaryWithSource: Story = {
  args: {
    card: {
      _key: 'internal',
      useLiveMetric: false,
      heading: '1.3 million',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      content: [
        {
          _key: 'parent',
          _type: 'block',
          children: [
            {
              _key: 'one',
              _type: 'span',
              marks: [],
              text: 'Source: ',
            },
            {
              _key: 'two',
              _type: 'span',
              marks: ['link'],
              text: 'holders/total accounts',
            },
          ],
          markDefs: [
            {
              _key: 'link',
              _type: 'link',
              href: 'https://www.example.com',
              variant: 'primary',
            },
          ],
        },
      ],
    },
  },
};
