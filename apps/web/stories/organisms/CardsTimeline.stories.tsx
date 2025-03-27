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
      items: [
        {
          _key: '1',
          year: '2010',
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
      items: [
        {
          _key: '1',
          year: '2010',
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
