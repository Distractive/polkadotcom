import { Progress } from "@shared/ui/components/ui/progress"
import type { Meta, StoryObj } from "@storybook/react"

const meta = {
  title: "Atoms/Progress",
  component: Progress,
} satisfies Meta<typeof Progress>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    count: 5,
    current: 0,
  },
}
