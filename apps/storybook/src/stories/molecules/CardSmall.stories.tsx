import type { Meta, StoryObj } from "@storybook/react"

import CardSmallBlock from "../../../../web/features/page/blocks/card-small"

const meta = {
  title: "Molecules/CardSmall",
  component: CardSmallBlock,
} satisfies Meta<typeof CardSmallBlock>

export default meta

type Story = StoryObj<typeof meta>

export const Internal: Story = {
  args: {
    card: {
      heading: "Internal Link Card",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: { internal: "/home" },
    },
  },
}

export const External: Story = {
  args: {
    card: {
      heading: "External Link Card",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: { external: "https://google.co.uk" },
    },
  },
}

export const Static: Story = {
  args: {
    card: {
      heading: "Static Card",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  },
}

const cards = [Internal, External, Static]

export const All = {
  render: () => {
    return (
      <div className="grid gap-section p-gutter md:p-section">
        {cards.map((card, index) => (
          <CardSmallBlock key={index} card={card.args.card} />
        ))}
      </div>
    )
  },
}
