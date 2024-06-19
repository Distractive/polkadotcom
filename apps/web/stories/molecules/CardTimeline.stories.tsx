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
    //@ts-ignore
    card: {
      year: "2021",
      content: [
        {
          _key: "parent",
          _type: "block",

          children: [
            {
              _key: "one",
              _type: "span",
              marks: [],
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            },
            {
              _key: "two",
              _type: "span",
              marks: [],
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            },
          ],
        },
      ],
    },
  },
}
