import type { Meta, StoryObj } from "@storybook/react"

import BlogCard from "@/features/post/card"

const meta = {
  title: "Molecules/BlogCard",
  component: BlogCard,
} satisfies Meta<typeof BlogCard>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    post: {
      title: "Unlocking DOT Opportunities: Staking, Crowdloans, and More",
      _id: "123456",
      slug: "blogpost-1",
      // @ts-ignore
      image: { asset: { url: "/image-placeholder.png" } },
      tags: [
        { name: "Technology", slug: "technology" },
        { name: "Staking", slug: "staking" },
        { name: "Polkadot", slug: "polkadot" },
        { name: "Parachains", slug: "parachains" },
      ],
      custom_excerpt:
        "Unlock powerful insights for the Polkadot & Kusama ecosystem with comprehensive on-chain data and custom dashboards on Dune Analytics.",
      body: [
        {
          _type: "block",
          _key: "1223456",
          children: [
            {
              _key: "12234560",
              _type: "span",
              text: "Today marks a pivotal moment for the blockchain community as Polkadot data is available for the first time on Dune, a leading open-source analytics platform for blockchain data. The result of a strategic partnership between Colorful Notion and Dune, this integration moves the Polkadot ecosystem towards enhanced visibility and in-depth analysis, enabling users to unlock new data-driven insights. By leveraging Dune's robust analytical tools, users can now delve deeper into Polkadot’s expansive ecosystem, fostering informed decision-making and strategic planning. This leap in capability will revolutionize how we measure, compare, and understand the Polkadot ecosystem.",
              marks: [],
            },
          ],
          markDefs: [],
          style: "normal",
        },
      ],
    },
  },
}

export const NoTags: Story = {
  args: {
    post: {
      title: "Unlocking DOT Opportunities: Staking, Crowdloans, and More",
      _id: "123456",
      slug: "blogpost-1",
      // @ts-ignore
      image: { asset: { url: "/image-placeholder.png" } },
      custom_excerpt:
        "Unlock powerful insights for the Polkadot & Kusama ecosystem with comprehensive on-chain data and custom dashboards on Dune Analytics.",
      body: [
        {
          _type: "block",
          _key: "1223456",
          children: [
            {
              _key: "12234560",
              _type: "span",
              text: "Today marks a pivotal moment for the blockchain community as Polkadot data is available for the first time on Dune, a leading open-source analytics platform for blockchain data. The result of a strategic partnership between Colorful Notion and Dune, this integration moves the Polkadot ecosystem towards enhanced visibility and in-depth analysis, enabling users to unlock new data-driven insights. By leveraging Dune's robust analytical tools, users can now delve deeper into Polkadot’s expansive ecosystem, fostering informed decision-making and strategic planning. This leap in capability will revolutionize how we measure, compare, and understand the Polkadot ecosystem.",
              marks: [],
            },
          ],
          markDefs: [],
          style: "normal",
        },
      ],
    },
  },
}
