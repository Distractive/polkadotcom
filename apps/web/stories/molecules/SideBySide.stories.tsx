import type { Meta, StoryObj } from "@storybook/react"

import { SideBySideBlock } from "@/features/page/blocks/side-by-side"

const meta = {
  title: "Molecules/SideBySide",
  component: SideBySideBlock,
  argTypes: {},
} satisfies Meta<typeof SideBySideBlock>

export default meta
type Story = StoryObj<typeof meta>

export const ImageOnLeft: Story = {
  args: {
    content: {
      _type: "sideBySide",
      heading: "Side By Side",
      // @ts-ignore
      image: { asset: { url: "/image-placeholder.png" } },
      _key: "d1b1",
      isImageOnLeft: true,
      content: [
        {
          _key: "parent",
          _type: "block",
          children: [
            {
              _key: "one",
              _type: "span",
              marks: [],
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            },
            {
              _key: "two",
              _type: "span",
              marks: [],
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            },
          ],
        },
      ],
    },
  },
}

export const ImageOnRight: Story = {
  args: {
    content: {
      heading: "Side By Side",
      // @ts-ignore
      image: { asset: { url: "/image-placeholder.png" } },
      isImageOnLeft: false,
      content: [
        {
          _key: "parent",
          _type: "block",
          children: [
            {
              _key: "one",
              _type: "span",
              marks: [],
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            },
            {
              _key: "two",
              _type: "span",
              marks: [],
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            },
          ],
        },
      ],
    },
  },
}
