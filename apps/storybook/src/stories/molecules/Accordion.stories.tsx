import type { Meta, StoryObj } from "@storybook/react"

// import { AccordionStyles } from "@shared/ui"

import { AccordionBlock } from "../../../../web/features/page/blocks/accordion"
import { dummyContentAccordion } from "../content/dummy/dAccordion"

const meta = {
  title: "AccordionBlock",
  component: AccordionBlock,
  argTypes: {},
} satisfies Meta<typeof AccordionBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Connected: Story = {
  args: {
    accordion: {
      _type: "accordion",
      title: "Accordion Title",
      hasNumbers: true,
      items: [
        {
          _key: "092dead156a5",
          heading: "Header",
          content: [...dummyContentAccordion].splice(0, 5),
        },
        {
          _key: "39560800d3a81572f4001af514a6eee4",
          heading: "Item Two",
          content: [...dummyContentAccordion].splice(0, 5),
        },
        {
          _key: "23232",
          heading: "Item Three",
          content: [...dummyContentAccordion].splice(0, 5),
        },
      ],
    },
  },
}
