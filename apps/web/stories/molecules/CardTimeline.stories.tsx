import type { Meta, StoryObj } from "@storybook/react"

import CardTimelineBlock from "@/features/page/blocks/cards-timeline/card-timeline"

const meta = {
  title: "Molecules/CardTimeline",
  component: CardTimelineBlock,
} satisfies Meta<typeof CardTimelineBlock>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    card: {
      year: "2021",
      heading:
        "Polkadot and Mythical Games: Powering the Next Generation of Gaming",
      body: "Sapien fusce risus montes placerat molestie lectus. Adipiscing nam id proin tristique",
      link: {
        label: "Learn more",
        //@ts-ignore
        url: "https://example.com",
      },
    },
  },
}
