import type { Meta, StoryObj } from "@storybook/react"

import CardLogoBlock from "@/features/page/blocks/cards-logo/card-logo"

const meta = {
  title: "Molecules/CardLogo",
  component: CardLogoBlock,
} satisfies Meta<typeof CardLogoBlock>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    card: {
      name: "Forbes",
      //@ts-ignore
      image: { asset: { url: "/logo-example.png" } },
      link: { label: "link", external: "https://google.co.uk", internal: null },
    },
  },
}
