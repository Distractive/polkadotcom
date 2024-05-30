import type { Meta, StoryObj } from "@storybook/react"

import CardStatBlock from "../../../../web/features/page/blocks/cards-stats/card-stat"

const meta = {
  title: "Molecules/CardStat",
  component: CardStatBlock,
} satisfies Meta<typeof CardStatBlock>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    card: {
      heading: "1.3 million",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  },
}
