import type { Meta, StoryObj } from '@storybook/react';

import { CardsStatBlock } from '@/features/page/blocks/cards-stats/cards-stat';

const meta = {
  title: 'Organisms/CardsStatsBlock',
  component: CardsStatBlock,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CardsStatBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    cards: {
      //@ts-ignore
      _key: 'parent',
      heading: 'Stats heading',
      content: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              _key: "content-span-1",
              text: "* The historical rewards rate is an annual average calculated from on-chain data. It is not indicative of future rewards, as the network conditions that affect the amount participants get are constantly in flux.",
              marks: []
            }
          ],
          _key: "content-block-1"
        }
      ],
      items: [
        {
          _key: '1',
          useLiveMetric: false,
          //@ts-ignore
          heading: 'Card Stat heading',
          body: 'Stat',
          content: null,
        },
        {
          _key: '2',
          useLiveMetric: false,
          //@ts-ignore
          heading: 'Card Stat heading',
          body: 'Stat',
          content: null,
        },
        {
          _key: '3',
          useLiveMetric: false,
          //@ts-ignore
          heading: 'Card Stat heading',
          body: 'Stat',
          content: null,
        },
      ],
    },
  },
};
