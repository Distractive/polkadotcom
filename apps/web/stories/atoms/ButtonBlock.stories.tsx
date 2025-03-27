import type { Meta, StoryObj } from '@storybook/react';

import { ButtonBlock } from '@/features/page/blocks/button-block';

const meta = {
  title: 'Atoms/ButtonBlock',
  component: ButtonBlock,
  argTypes: {},
} satisfies Meta<typeof ButtonBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryButtonBlock: Story = {
  args: {
    buttonBlock: {
      _key: 'buttonBlock',
      link: {
        internal: { slug: 'learn-more' },
        label: 'Learn more',
        variant: 'primary',
      },
    },
  },
};

export const SecondaryButtonBlock: Story = {
  args: {
    buttonBlock: {
      _key: 'buttonBlocktwo',
      link: {
        internal: null,
        label: 'Learn more',
        variant: 'secondary',
        external: 'https://www.example.com',
      },
    },
  },
};
