import type { Meta, StoryObj } from "@storybook/react"

import { MediaBlock } from "@/features/page/blocks/media-block"

const meta = {
  title: "Molecules/MediaBlock",
  component: MediaBlock,
} satisfies Meta<typeof MediaBlock>

export default meta

type Story = StoryObj<typeof meta>

export const ImageBlockWithInfo: Story = {
  args: {
    mediaBlock: {
      //@ts-ignore
      image: { asset: { url: "/image-placeholder.png" } },
      eyebrow: "Eyebrow",
      heading: "Image block header",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      links: [
        {
          _type: "customUrl",
          label: "Learn more",
          external: "",
          internal: { slug: "/" },
        },
      ],
    },
  },
}

export const StandaloneImageBlock: Story = {
  args: {
    mediaBlock: {
      //@ts-ignore
      image: { asset: { url: "/icon-placeholder.png" } },
    },
  },
}

export const VideoBlockWithInfo: Story = {
  args: {
    mediaBlock: {
      //@ts-ignore
      video: {
        url: "https://www.youtube-nocookie.com/embed/mq3SFJPti4o",
        placeholderImage: {
          //@ts-ignore
          asset: {
            url: "https://polkadot.network/static/staking-yt-thumb-82711cb4001f01beeace618f4ce69e58.jpg",
          },
        },
      },
      eyebrow: "Eyebrow",
      heading: "Image block header",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      links: [
        {
          _type: "customUrl",
          label: "Learn more",
          external: "",
          internal: { slug: "/" },
        },
      ],
    },
  },
}

export const StandaloneVideoBlock: Story = {
  args: {
    mediaBlock: {
      //@ts-ignore
      video: {
        url: "https://www.youtube-nocookie.com/embed/mq3SFJPti4o",
        placeholderImage: {
          //@ts-ignore
          asset: {
            url: "https://polkadot.network/static/staking-yt-thumb-82711cb4001f01beeace618f4ce69e58.jpg",
          },
        },
      },
    },
  },
}
