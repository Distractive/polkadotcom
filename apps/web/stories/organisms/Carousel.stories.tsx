import type { Meta, StoryObj } from '@storybook/react';

import { CardsBlock } from '@/features/page/blocks/cards/cards';

const meta = {
  title: 'Organisms/Carousel',
  component: CardsBlock,
} satisfies Meta<typeof CardsBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Carousel: Story = {
  args: {
    cards: {
      _key: '',
      heading: 'Section title goes here',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      isCarousel: true,
      items: [
        {
          _key: 'one',
          // @ts-ignore
          headerImage: { asset: { url: '/image-placeholder.png' } },
          tags: ['Tag 1', 'Tag 2', 'Tag 3'],
          eyebrow: 'Eyebrow 01',
          heading: 'Headline 01',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          link: {
            label: 'Learn more',
            external: 'https://google.co.uk',
            internal: null,
          },
        },
        {
          _key: 'two',
          // @ts-ignore
          headerImage: { asset: { url: '/image-placeholder.png' } },
          tags: ['Tag 1', 'Tag 2', 'Tag 3'],
          eyebrow: 'Eyebrow 02',
          heading: 'Headline 02',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          link: {
            label: 'Learn more',
            external: 'https://google.co.uk',
            internal: null,
          },
        },
        {
          _key: 'three',
          // @ts-ignore
          headerImage: { asset: { url: '/image-placeholder.png' } },
          tags: ['Tag 1', 'Tag 2', 'Tag 3'],
          eyebrow: 'Eyebrow 03',
          heading: 'Headline 03',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          link: {
            label: 'Learn more',
            external: 'https://google.co.uk',
            internal: null,
          },
        },
        {
          _key: 'four',
          // @ts-ignore
          headerImage: { asset: { url: '/image-placeholder.png' } },
          tags: ['Tag 1', 'Tag 2', 'Tag 3'],
          eyebrow: 'Eyebrow 04',
          heading: 'Headline 04',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          link: {
            label: 'Learn more',
            external: 'https://google.co.uk',
            internal: null,
          },
        },
        {
          _key: 'five',
          // @ts-ignore
          headerImage: { asset: { url: '/image-placeholder.png' } },
          tags: ['Tag 1', 'Tag 2', 'Tag 3'],
          eyebrow: 'Eyebrow 05',
          heading: 'Headline 05',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          link: {
            label: 'Learn more',
            external: 'https://google.co.uk',
            internal: null,
          },
        },
      ],
    },
  },
};
