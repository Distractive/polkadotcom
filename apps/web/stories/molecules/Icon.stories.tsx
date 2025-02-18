import type { Meta, StoryObj } from '@storybook/react';

import { Icon, IconStyles } from '@shared/ui';

type IconVariants = keyof typeof IconStyles.variants;

const variants = Object.keys(IconStyles.variants) as IconVariants[];

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  argTypes: {
    variant: {
      description: 'Defines the variant of the icon',
      table: {
        type: { summary: variants.join('|') },
        defaultValue: { summary: 'arrowUp' },
      },
      control: 'select',
      options: variants,
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const All: Story = {
  render: () => {
    return (
      <>
        {variants.map((variant) => (
          <Icon variant={variant} key={`${variant}`} />
        ))}
      </>
    );
  },
};
