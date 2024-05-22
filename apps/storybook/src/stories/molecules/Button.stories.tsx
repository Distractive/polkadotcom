import type { Meta, StoryObj } from "@storybook/react"

import { Button, ButtonStyles } from "@shared/ui"

type ButtonVariants = keyof typeof ButtonStyles.variants
type ButtonSizes = keyof typeof ButtonStyles.sizes

const variants = Object.keys(ButtonStyles.variants) as ButtonVariants[]
const sizes = Object.keys(ButtonStyles.sizes) as ButtonSizes[]

const meta = {
  title: "Atoms/Button",
  component: Button,
  argTypes: {
    variant: {
      description: "Defines the variant of the button",
      table: {
        type: { summary: variants.join("|") },
        defaultValue: { summary: "primary" },
      },
      control: "select",
      options: variants,
    },
    size: {
      description: "Defines the size of the button",
      table: {
        type: { summary: sizes.join("|") },
        defaultValue: { summary: "md" },
      },
      control: "select",
      options: sizes,
    },
    children: {
      description:
        "Children components, usually text or an icon, that will be rendered inside the button",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    className: {
      description: "Override or extend the styles applied to the component",
      table: {
        type: { summary: "string" },
      },
    },
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Learn more",
  },
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Learn more",
  },
}

export const Disabled: Story = {
  args: {
    variant: "disabled",
    children: "Learn more",
  },
}

export const Large: Story = {
  args: {
    ...Primary.args,
    size: "lg",
  },
}

export const Medium: Story = {
  args: {
    ...Primary.args,
    size: "md",
  },
}

export const Small: Story = {
  args: {
    ...Primary.args,
    size: "sm",
  },
}

export const All: Story = {
  render: () => {
    return (
      <>
        {variants.map((variant) => (
          <div className="flex items-baseline space-x-4" key={variant}>
            <div className="text-slate-500 text-md w-[100px]">{variant}:</div>
            <div className="mb-6 flex items-end space-x-4">
              {sizes.map((size) => (
                <Button
                  variant={variant}
                  size={size}
                  key={`${variant}-${size}`}
                  className="font-display"
                >
                  {`Button (${size})`}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </>
    )
  },
}
