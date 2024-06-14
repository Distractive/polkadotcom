import type { Meta, StoryObj } from "@storybook/react"

import { CardsTimelineBlock } from "@/features/page/blocks/cards-timeline/cards-timeline"

const meta = {
  title: "Organisms/CardsTimeline",
  component: CardsTimelineBlock,
} satisfies Meta<typeof CardsTimelineBlock>

export default meta

type Story = StoryObj<typeof meta>

export const Timeline: Story = {
  args: {
    cards: {
      //@ts-ignore
      _key: "parent",
      heading: "Our story",
      items: [
        {
          _key: "1",
          year: "2010",
          heading:
            "Polkadot and Mythical Games: Powering the Next Generation of Gaming",
          body: "Sapien fusce risus montes placerat molestie lectus. Adipiscing nam id proin tristique. Sapien fusce risus montes placerat molestie lectus. Adipiscing nam id proin tristique. Sapien fusce risus montes placerat molestie lectus. Adipiscing nam id proin tristique",
          link: {
            label: "Learn more",
            //@ts-ignore
            url: "https://example.com",
          },
        },
        {
          _key: "2",
          year: "2011",
          heading:
            "Polkadot and Mythical Games: Powering the Next Generation of Gaming",
          body: "Sapien fusce risus montes placerat molestie lectus. Adipiscing nam id proin tristique",
          link: {
            label: "Learn more",
            //@ts-ignore
            url: "https://example.com",
          },
        },
        {
          _key: "3",
          year: "2012",
          heading:
            "Polkadot and Mythical Games: Powering the Next Generation of Gaming. Polkadot and Mythical Games: Powering the Next Generation of Gaming",
          body: "Sapien fusce risus montes placerat molestie lectus. Adipiscing nam id proin tristique. Sapien fusce risus montes placerat molestie lectus. Adipiscing nam id proin tristique.",
          link: {
            label: "Learn more",
            //@ts-ignore
            url: "https://example.com",
          },
        },
        {
          _key: "4",
          year: "2013",
          heading:
            "Polkadot and Mythical Games: Powering the Next Generation of Gaming",
          body: "Sapien fusce risus montes placerat molestie lectus. Adipiscing nam id proin tristique",
          link: {
            label: "Learn more",
            //@ts-ignore
            url: "https://example.com",
          },
        },
        {
          _key: "5",
          year: "2014",
          heading:
            "Polkadot and Mythical Games: Powering the Next Generation of Gaming",
          body: "Sapien fusce risus montes placerat molestie lectus. Adipiscing nam id proin tristique",
          link: {
            label: "Learn more",
            //@ts-ignore
            url: "https://example.com",
          },
        },
        {
          _key: "6",
          year: "2015",
          heading:
            "Polkadot and Mythical Games: Powering the Next Generation of Gaming",
          body: "Sapien fusce risus montes placerat molestie lectus. Adipiscing nam id proin tristique",
          link: {
            label: "Learn more",
            //@ts-ignore
            url: "https://example.com",
          },
        },
        {
          _key: "7",
          year: "2016",
          heading:
            "Polkadot and Mythical Games: Powering the Next Generation of Gaming",
          body: "Sapien fusce risus montes placerat molestie lectus. Adipiscing nam id proin tristique",
          link: {
            label: "Learn more",
            //@ts-ignore
            url: "https://example.com",
          },
        },
      ],
    },
  },
}
