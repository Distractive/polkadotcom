import type { Meta, StoryObj } from '@storybook/react';

import { CardsBlock } from '@/features/page/blocks/cards/cards';

const meta = {
  title: 'Organisms/CardsBlock',
  component: CardsBlock,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CardsBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    cards: {
      //@ts-ignore
      _key: 'parent',
      heading: 'A heading goes here for the cards block',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      showSideBySide: true,
      isCarousel: false,
      items: [
        {
          _key: '1',
          //@ts-ignore
          headerImage: { asset: { url: '/image-placeholder.png' } },
          //@ts-ignore
          icon: { asset: { url: '/icon-placeholder.png' } },
          tags: ['Tag 1', 'Tag 2', 'Tag 3'],
          eyebrow: 'Eyebrow',
          heading: 'Header Image Icon Stacked',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          link: {
            label: 'Learn more',
            external: 'https://google.co.uk',
            internal: null,
          },
        },
        {
          _key: '2',
          //@ts-ignore
          headerImage: { asset: { url: '/image-placeholder.png' } },
          //@ts-ignore
          icon: { asset: { url: '/icon-placeholder.png' } },
          tags: ['Tag 1', 'Tag 2', 'Tag 3'],
          eyebrow: 'Eyebrow',
          heading: 'Header Image Icon Stacked',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          link: {
            label: 'Learn more',
            external: 'https://google.co.uk',
            internal: null,
          },
        },
        {
          _key: '3',
          //@ts-ignore
          headerImage: { asset: { url: '/image-placeholder.png' } },
          //@ts-ignore
          icon: { asset: { url: '/icon-placeholder.png' } },
          tags: ['Tag 1', 'Tag 2', 'Tag 3'],
          eyebrow: 'Eyebrow',
          heading: 'Header Image Icon Stacked',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          link: {
            label: 'Learn more',
            external: 'https://google.co.uk',
            internal: null,
          },
        },
        {
          _key: '4',
          //@ts-ignore
          headerImage: { asset: { url: '/image-placeholder.png' } },
          //@ts-ignore
          icon: { asset: { url: '/icon-placeholder.png' } },
          tags: ['Tag 1', 'Tag 2', 'Tag 3'],
          eyebrow: 'Eyebrow',
          heading: 'Header Image Icon Stacked',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          link: {
            label: 'Learn more',
            external: 'https://google.co.uk',
            internal: null,
          },
        },
        {
          _key: '5',
          //@ts-ignore
          headerImage: { asset: { url: '/image-placeholder.png' } },
          //@ts-ignore
          icon: { asset: { url: '/icon-placeholder.png' } },
          tags: ['Tag 1', 'Tag 2', 'Tag 3'],
          eyebrow: 'Eyebrow',
          heading: 'Header Image Icon Stacked',
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

export const SideBySideLayoutWithIconsAndNoBackgroundImage: Story = {
  args: {
    cards: {
      //@ts-ignore
      _key: 'parent',
      heading:
        'Heading for side by side layout with icons and no background image',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      showSideBySide: true,
      items: [
        {
          _key: '1',
          //@ts-ignore
          icon: { asset: { url: '/icon-placeholder.png' } },
          useAsBackgroundImage: false,
          headerImage: null,
          link: null,
          heading: 'Heading',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          _key: '2',
          //@ts-ignore
          icon: { asset: { url: '/icon-placeholder.png' } },
          useAsBackgroundImage: false,
          headerImage: null,
          link: null,
          heading: 'Heading',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          _key: '3',
          //@ts-ignore
          icon: { asset: { url: '/icon-placeholder.png' } },
          useAsBackgroundImage: false,
          headerImage: null,
          link: null,
          heading: 'Heading',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          _key: '4',
          //@ts-ignore
          icon: { asset: { url: '/icon-placeholder.png' } },
          useAsBackgroundImage: false,
          headerImage: null,
          link: null,
          heading: 'Heading',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
      ],
    },
  },
};
