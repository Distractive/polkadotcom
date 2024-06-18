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
      title: [
        {
          _key: "parent",
          _type: "block",
          children: [
            {
              _key: "b1a5bf3836810",
              _type: "span",
              marks: [],
              text: "The new staking dashboard is seamless to operate so that it",
            },
            {
              _key: "2ee530b968de",
              _type: "span",
              marks: ["highlight"],
              text: "empowers any token holder",
            },
            {
              _key: "4da5bffaba11",
              _type: "span",
              marks: [],
              text: "to contribute to the security and maintenance of the network - irrespective of technical knowledge.",
            },
          ],
          style: "h3",
        },
      ],
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  },
}
