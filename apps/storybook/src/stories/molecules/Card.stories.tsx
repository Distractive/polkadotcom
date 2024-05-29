import type { Meta, StoryObj } from "@storybook/react"

import { cn } from "@shared/ui"

import CardBlock from "../../../../web/features/page/blocks/card"

const meta = {
  title: "Molecules/Card",
  component: CardBlock,
} satisfies Meta<typeof CardBlock>

export default meta

type Story = StoryObj<typeof meta>

export const HeaderImageStacked: Story = {
  args: {
    card: {
      headerImage: { asset: { url: "/image-placeholder.png" } },
      tags: ["Tag 1", "Tag 2", "Tag 3"],
      eyebrow: "Eyebrow",
      heading: "Header Image Stacked",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: { label: "Learn more", external: "https://google.co.uk" },
    },
  },
}

export const IconStacked: Story = {
  args: {
    card: {
      icon: { asset: { url: "/icon-placeholder.png" } },
      tags: ["Tag 1", "Tag 2", "Tag 3"],
      eyebrow: "Eyebrow",
      heading: "Icon Stacked",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: { label: "Learn more", external: "https://google.co.uk" },
    },
  },
}

export const HeaderImageIconStacked: Story = {
  args: {
    card: {
      headerImage: { asset: { url: "/image-placeholder.png" } },
      icon: { asset: { url: "/icon-placeholder.png" } },
      tags: ["Tag 1", "Tag 2", "Tag 3"],
      eyebrow: "Eyebrow",
      heading: "Header Image Icon Stacked",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: { label: "Learn more", external: "https://google.co.uk" },
    },
  },
}

export const HeaderImageSideBySide: Story = {
  args: {
    card: {
      headerImage: { asset: { url: "/image-placeholder.png" } },
      tags: ["Tag 1", "Tag 2", "Tag 3"],
      eyebrow: "Eyebrow",
      heading: "Header Image Side By Side",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: { label: "Learn more", external: "https://google.co.uk" },
    },
    showSideBySide: true,
  },
}

export const HeaderImageIconSideBySide: Story = {
  args: {
    card: {
      headerImage: { asset: { url: "/image-placeholder.png" } },
      icon: { asset: { url: "/icon-placeholder.png" } },
      tags: ["Tag 1", "Tag 2", "Tag 3"],
      eyebrow: "Eyebrow",
      heading: "Header Image Icon Side by Side",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: { label: "Learn more", external: "https://google.co.uk" },
    },
    showSideBySide: true,
  },
}

export const BackgroundImageStacked: Story = {
  args: {
    card: {
      headerImage: { asset: { url: "/image-placeholder.png" } },
      tags: ["Tag 1", "Tag 2", "Tag 3"],
      eyebrow: "Eyebrow",
      heading: "Background Image Stacked",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: { label: "Learn more", external: "https://google.co.uk" },
      useAsBackgroundImage: true,
    },
  },
}

export const BackgroundImageIconSideBySide: Story = {
  args: {
    card: {
      headerImage: { asset: { url: "/image-placeholder.png" } },
      icon: { asset: { url: "/icon-placeholder.png" } },
      tags: ["Tag 1", "Tag 2", "Tag 3"],
      eyebrow: "Eyebrow",
      heading: "Background Image Icon Side by Side",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: { label: "Learn more", external: "https://google.co.uk" },
      useAsBackgroundImage: true,
    },
    showSideBySide: true,
  },
}

const cards = [
  HeaderImageSideBySide,
  HeaderImageIconSideBySide,
  HeaderImageStacked,
  IconStacked,
  HeaderImageIconStacked,
  BackgroundImageStacked,
  BackgroundImageIconSideBySide,
]

export const All = {
  render: () => {
    return (
      <div className="grid gap-section p-gutter md:p-section">
        {cards.map((card, index) => (
          <CardBlock key={index} card={card.args.card} />
        ))}
      </div>
    )
  },
}
