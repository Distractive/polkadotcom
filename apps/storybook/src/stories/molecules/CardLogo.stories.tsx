import type { Meta, StoryObj } from "@storybook/react"

import CardLogoBlock from "../../../../web/features/page/blocks/card-logo"

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
      image: { asset: { url: "/logo-example.png" } },
      link: { external: "https://google.co.uk" },
    },
  },
}
