import type { Meta, StoryObj } from "@storybook/react"

import { Heading, HeadingStyles } from "@shared/ui"

type HeadingVariants = keyof typeof HeadingStyles.variants

const variants = Object.keys(HeadingStyles.variants) as HeadingVariants[]

const meta = {
  title: "Atoms/Heading",
  component: Heading,
  argTypes: {
    variant: {
      description: "The heading variant",
      table: { type: { summary: variants.join("|") } },
      control: "select",
      options: variants,
    },
    children: {
      description: "The text to render inside the heading element",
    },
  },
} satisfies Meta<typeof Heading>

export default meta
type Story = StoryObj<typeof meta>

export const Heading1: Story = {
  args: {
    variant: "h1",
    children: "This is a h1",
  },
}

export const Heading2: Story = {
  args: {
    variant: "h2",
    children: "This is a h2",
  },
}

export const Heading3: Story = {
  args: {
    variant: "h3",
    children: "This is a h3",
  },
}

export const Heading4: Story = {
  args: {
    variant: "h4",
    children: "This is a h4",
  },
}

export const All: Story = {
  render: () => {
    return (
      <div className="grid gap-8">
        {variants.map((variant) => (
          <Heading variant={variant} key={variant}>
            {`This is a ${variant}`}
          </Heading>
        ))}
      </div>
    )
  },
}
