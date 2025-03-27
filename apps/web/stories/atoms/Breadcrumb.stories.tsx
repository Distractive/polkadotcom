import type { Meta, StoryObj } from '@storybook/react';

import { HeaderBlock } from '@/features/page/blocks/header';

const meta = {
  title: 'Atoms/Breadcrumb',
  component: HeaderBlock,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof HeaderBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    //@ts-ignore
    header: {
      title: 'Title Body',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    breadcrumb: {
      items: [
        { slug: '/parent', title: 'Parent page' },
        { slug: '/parent/child', title: 'Child page' },
        { slug: '/parent/child/infant', title: 'Infant page' },
      ],
    },
  },
};

export const StressTest: Story = {
  args: {
    //@ts-ignore
    header: {
      title: 'Title Body',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    breadcrumb: {
      items: [
        {
          slug: '/parent',
          title: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
        },
        {
          slug: '/parent/child',
          title: 'Orbi in nisl quis justo vulputate fringilla vita',
        },
        { slug: '/parent/child/infant', title: 'Ut eleifend elit mauris' },
      ],
    },
  },
};
