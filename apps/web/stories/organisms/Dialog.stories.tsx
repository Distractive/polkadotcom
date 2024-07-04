import type { Meta, StoryObj } from "@storybook/react"

import { DialogBlock } from "@/features/page/blocks/dialog"

const meta = {
  title: "Organisms/DialogBlock",
  component: DialogBlock,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof DialogBlock>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
