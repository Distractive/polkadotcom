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
      //@ts-ignore
      icon: { asset: { url: "/icon-placeholder.png" } },
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
      //@ts-ignore
      icon: null,
      _key: "external",
      heading: "External Link Card",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: {
        label: "Learn more",
        external: "https://google.co.uk",
        internal: null,
      },
    },
  },
}

export const Static: Story = {
  args: {
    card: {
      //@ts-ignore
      icon: null,
      _key: "internal",
      heading: "Static Card",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: null,
    },
  },
}

export const ExternalWithIcon: Story = {
  args: {
    card: {
      //@ts-ignore
      icon: { asset: { url: "/icon-placeholder.png" } },
      _key: "external",
      heading: "External Link Card",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: {
        label: "External",
        external: "https://google.co.uk",
        internal: null,
      },
    },
  },
}

export const InternalWithIcon: Story = {
  args: {
    card: {
      //@ts-ignore
      icon: { asset: { url: "/icon-placeholder.png" } },
      _key: "internal",
      heading: "Internal Link Card",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: { label: "", external: null, internal: { slug: "home" } },
    },
  },
}

export const InternalWithEyebrow: Story = {
  args: {
    card: {
      //@ts-ignore
      icon: { asset: { url: "/icon-placeholder.png" } },
      _key: "internal",
      heading: "Internal Link Card",
      eyebrow: "Date",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: { label: "", external: null, internal: { slug: "home" } },
    },
  },
}

const cards = [
  Internal,
  External,
  Static,
  ExternalWithIcon,
  InternalWithIcon,
  InternalWithEyebrow,
]

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
