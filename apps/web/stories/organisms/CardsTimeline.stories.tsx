import type { Meta, StoryObj } from '@storybook/react';

import { CardsTimelineBlock } from '@/features/page/blocks/cards-timeline/cards-timeline';

const meta = {
  title: 'Organisms/CardsTimeline',
  component: CardsTimelineBlock,
} satisfies Meta<typeof CardsTimelineBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CarouselTimeline: Story = {
  args: {
    cards: {
      //@ts-ignore
      _key: 'parent',
      heading: 'Our story',
      content: [
        {
          _key: 'parent-content',
          _type: 'block',
          children: [
            {
              _key: 'parent-content-span',
              _type: 'span',
              marks: [],
              text: 'Timeline description or introduction text here.',
            },
          ],
        },
      ],
      items: [
        {
          _key: '1',
          year: '2010',
          image: null,
          content: [
            {
              _key: 'parent',
              _type: 'block',
              children: [
                {
                  _key: 'one',
                  _type: 'span',
                  marks: [],
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                },
                {
                  _key: 'two',
                  _type: 'span',
                  marks: [],
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                },
              ],
            },
          ],
        },
        {
          _key: '2',
          year: '2011',
          image: null,
          content: [
            {
              _key: 'parent',
              _type: 'block',
              children: [
                {
                  _key: 'one',
                  _type: 'span',
                  marks: [],
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                },
                {
                  _key: 'two',
                  _type: 'span',
                  marks: [],
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                },
              ],
            },
          ],
        },
        {
          _key: '3',
          year: '2012',
          image: null,
          content: [
            {
              _key: 'parent',
              _type: 'block',
              children: [
                {
                  _key: 'one',
                  _type: 'span',
                  marks: [],
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                },
                {
                  _key: 'two',
                  _type: 'span',
                  marks: [],
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                },
              ],
            },
          ],
        },
        {
          _key: '4',
          year: '2013',
          image: null,
          content: [
            {
              _key: 'parent',
              _type: 'block',
              children: [
                {
                  _key: 'one',
                  _type: 'span',
                  marks: [],
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                },
                {
                  _key: 'two',
                  _type: 'span',
                  marks: [],
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                },
              ],
            },
          ],
        },
        {
          _key: '5',
          year: '2014',
          image: null,
          content: [
            {
              _key: 'parent',
              _type: 'block',
              children: [
                {
                  _key: 'one',
                  _type: 'span',
                  marks: [],
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                },
                {
                  _key: 'two',
                  _type: 'span',
                  marks: [],
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                },
              ],
            },
          ],
        },
        {
          _key: '6',
          year: '2015',
          image: null,
          content: [
            {
              _key: 'parent',
              _type: 'block',
              children: [
                {
                  _key: 'one',
                  _type: 'span',
                  marks: [],
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                },
                {
                  _key: 'two',
                  _type: 'span',
                  marks: [],
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                },
              ],
            },
          ],
        },
      ],
    },
  },
};

export const CardTimeline: Story = {
  args: {
    cards: {
      //@ts-ignore
      _key: 'parent',
      heading: 'Our story',
      content: [
        {
          _key: 'parent-content',
          _type: 'block',
          children: [
            {
              _key: 'parent-content-span',
              _type: 'span',
              marks: [],
              text: 'Timeline description or introduction text here.',
            },
          ],
        },
      ],
      items: [
        {
          _key: '1',
          year: '2010',
          image: null,
          content: [
            {
              _key: 'parent',
              _type: 'block',
              children: [
                {
                  _key: 'one',
                  _type: 'span',
                  marks: [],
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                },
                {
                  _key: 'two',
                  _type: 'span',
                  marks: [],
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                },
              ],
            },
          ],
        },
        {
          _key: '2',
          year: '2011',
          image: null,
          content: [
            {
              _key: 'parent',
              _type: 'block',
              children: [
                {
                  _key: 'one',
                  _type: 'span',
                  marks: [],
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                },
                {
                  _key: 'two',
                  _type: 'span',
                  marks: [],
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                },
              ],
            },
          ],
        },
        {
          _key: '3',
          year: '2012',
          image: null,
          content: [
            {
              _key: 'parent',
              _type: 'block',
              children: [
                {
                  _key: 'one',
                  _type: 'span',
                  marks: [],
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                },
                {
                  _key: 'two',
                  _type: 'span',
                  marks: [],
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                },
              ],
            },
          ],
        },
      ],
    },
  },
};
