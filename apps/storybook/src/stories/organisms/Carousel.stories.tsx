import type { Meta, StoryObj } from "@storybook/react"

import { CardsBlock } from "../../../../web/features/page/blocks/cards/cards"

const meta = {
  title: "Organisms/Carousel",
  component: CardsBlock,
} satisfies Meta<typeof CardsBlock>

export default meta

type Story = StoryObj<typeof meta>

export const Carousel: Story = {
  args: {
    cards: {
      _key: "",
      heading: "Section title goes here",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      isCarousel: true,
      items: [
        {
          _key: "one",
          headerImage: { asset: { url: "/image-placeholder.png" } },
          tags: ["Tag 1", "Tag 2", "Tag 3"],
          eyebrow: "Eyebrow",
          heading: "Headline",
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          link: { label: "Learn more", external: "https://google.co.uk" },
        },
        {
          _key: "two",
          headerImage: { asset: { url: "/image-placeholder.png" } },
          tags: ["Tag 1", "Tag 2", "Tag 3"],
          eyebrow: "Eyebrow",
          heading: "Headline",
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          link: { label: "Learn more", external: "https://google.co.uk" },
        },
        {
          _key: "three",
          headerImage: { asset: { url: "/image-placeholder.png" } },
          tags: ["Tag 1", "Tag 2", "Tag 3"],
          eyebrow: "Eyebrow",
          heading: "Headline",
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          link: { label: "Learn more", external: "https://google.co.uk" },
        },
        {
          _key: "four",
          headerImage: { asset: { url: "/image-placeholder.png" } },
          tags: ["Tag 1", "Tag 2", "Tag 3"],
          eyebrow: "Eyebrow",
          heading: "Headline",
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          link: { label: "Learn more", external: "https://google.co.uk" },
        },
        {
          _key: "five",
          headerImage: { asset: { url: "/image-placeholder.png" } },
          tags: ["Tag 1", "Tag 2", "Tag 3"],
          eyebrow: "Eyebrow",
          heading: "Headline",
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          link: { label: "Learn more", external: "https://google.co.uk" },
        },
      ],
    },
  },
}
