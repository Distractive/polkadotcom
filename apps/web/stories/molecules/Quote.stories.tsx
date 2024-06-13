import type { Meta, StoryObj } from "@storybook/react"

import { QuoteBlock } from "@/features/page/blocks/quote"

const meta = {
  title: "Molecules/Quote",
  component: QuoteBlock,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof QuoteBlock>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    quote: {
      //@ts-ignore
      image: { asset: { url: "/image-placeholder.png" } },
      heading:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  },
}
