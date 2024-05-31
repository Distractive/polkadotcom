import type { Meta, StoryObj } from "@storybook/react"

import { VideoPlayer } from "@/components/video-player"

const meta = {
  title: "Atoms/VideoPlayer",
  component: VideoPlayer,
} satisfies Meta<typeof VideoPlayer>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    url: "https://www.youtube-nocookie.com/embed/mq3SFJPti4o",
    placeholder:
      "https://polkadot.network/static/staking-yt-thumb-82711cb4001f01beeace618f4ce69e58.jpg",
  },
}
