import type { Meta, StoryObj } from '@storybook/react';

import { VideoBlock } from '@/features/page/blocks/video';

const meta = {
  title: 'Atoms/Video',
  component: VideoBlock,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof VideoBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    video: {
      url: 'https://www.youtube-nocookie.com/embed/mq3SFJPti4o',
      placeholderImage: {
        //@ts-ignore
        asset: {
          url: 'https://polkadot.network/static/staking-yt-thumb-82711cb4001f01beeace618f4ce69e58.jpg',
        },
      },
    },
  },
};
