import type { Meta, StoryObj } from "@storybook/react"

import CardSmallBlock from "@/features/page/blocks/cards-small/card-small"

const meta = {
  title: "Molecules/CardSmall",
  component: CardSmallBlock,
} satisfies Meta<typeof CardSmallBlock>

export default meta

type Story = StoryObj<typeof meta>

export const Internal: Story = {
  args: {
    card: {
      _key: "internal",
      heading: "Internal Link Card",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: { label: "", external: null, internal: { slug: "home" } },
    },
  },
}

export const External: Story = {
  args: {
    card: {
      _key: "internal",
      heading: "External Link Card",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: { label: "", external: "https://google.co.uk", internal: null },
    },
  },
}

export const Static: Story = {
  args: {
    card: {
      _key: "internal",
      heading: "Static Card",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: null,
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
