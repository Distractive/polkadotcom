import type { Meta, StoryObj } from '@storybook/react';

import { EmbedFormBlock } from '@/features/page/blocks/form-embed';

const meta = {
  title: 'Organisms/FormBlock',
  component: EmbedFormBlock,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof EmbedFormBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Newsletter: Story = {
  args: {
    form: {
      _key: 'newsletter',
      heading: 'Newsletter form heading goes here',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
      formType: 'newsletter',
    },
  },
};

export const Contact: Story = {
  args: {
    form: {
      _key: 'contact',
      heading: 'Contact form heading goes here',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
      formType: 'contact',
    },
  },
};

const forms = [Newsletter, Contact];

export const All = {
  render: () => {
    return (
      <div className="flex flex-col gap-page">
        {forms.map((form, index) => (
          <EmbedFormBlock key={form.name} form={form.args.form} />
        ))}
      </div>
    );
  },
};
