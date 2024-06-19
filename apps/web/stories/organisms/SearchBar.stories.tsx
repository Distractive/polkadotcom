import type { Meta, StoryObj } from "@storybook/react"

import { BLOG_POSTTYPE } from "@/constants/global"
import { SearchBar } from "@/features/posts/search-bar"

const meta = {
  title: "Molecules/SearchBar",
  component: SearchBar,
} satisfies Meta<typeof SearchBar>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    postType: BLOG_POSTTYPE,
    searches: [
      {
        title: "Revamping Polkadot Governance with Polkadot OpenGov",
        _id: "44f1-90fa-27145f45608412364",
        slug: "revamping-polkadot-governance-with-polkadot-opengov",
      },
      {
        title:
          "Polkadot OpenGov: Polkadot’s Next Generation of Decentralised Governance",
        _id: "44f1-90fa-27145f525456084",
        slug: "polkadot-opengov:-polkadots-next-generation-of-decentralised-governance",
      },
      {
        title: "A Walkthrough of Polkadot’s Governance",
        _id: "3040bb68-ee2b-44f1-90fa-27144525f456084",
        slug: "a-walkthrough-of-polkadots-governance",
      },
      {
        title:
          "Polkadot Showcases Industry-Leading Scalability in Positive End to 2023",
        _id: "30464b59-e18d-4319-b9df-6b8f5f69cb84",
        slug: "polkadot_q4_update_data",
      },
      {
        title:
          "Polkadot Blockchain Academy: Targeted Education for Builders and Founders",
        _id: "3653a507-ed27-49ff-b9e9-865c2378ac42",
        slug: "polkadot-blockchain-academy-meeting-the-needs-of-builders-and-founders-alike",
      },
      {
        title:
          "Five New Parachains, Staking Growth & Technical Upgrades as Expansion Continues",
        _id: "3ed6d819-9142-4efd-b109-c4d729ef5d25",
        slug: "five-new-parachains-staking-growth-technical-upgrades-as-polkadot-expansion-continues",
      },
      {
        title:
          "The Polkadot Alpha Program: A New Era of Collaborative Building",
        _id: "46d720f4-db82-4dab-b035-a2847a725cb0",
        slug: "the-polkadot-alpha-program-a-new-era-for-decentralized-building-collaboration",
      },
      {
        title: "Polkadot Governance",
        _id: "48a84018-6e37-4296-a364-13030376ce46",
        slug: "polkadot-governance",
      },
      {
        title: "How Polkadot's Blockspace Empowers Developers",
        _id: "51080053-51bc-43c6-81ef-14d5e9f3a8a3",
        slug: "how-polkadots-blockspace-empowers-developers",
      },
      {
        title: "Polkadot Decoded 2024 Call for Speakers now open",
        _id: "54c9ef1c-bcab-4a19-b9a0-c64981f96668",
        slug: "polkadot-decoded-2024-call-for-speakers-now-open",
      },
      {
        title:
          "Polkadot Blockchain Academy Adds Remote Option for Select Students",
        _id: "6ea21123-e5a6-4065-b54d-045c696f6bfe",
        slug: "polkadot-blockchain-academy-remote-learning-developers",
      },
      {
        title:
          "Elevating Polkadot's Performance and Scale with Asynchronous Backing",
        _id: "8c9dbfa5-9125-430a-846a-0ecad5615de5",
        slug: "elevating-polkadots-performance-and-scale-with-asynchronous-backing",
      },
      {
        title: "Polkadot 2023 Roundup",
        _id: "ae0330b2-d664-4d52-b353-3b0cd67d54fe",
        slug: "polkadot-2023-roundup",
      },
      {
        title: "Polkadot Consensus Part 1: Enhanced Economic Security via NPoS",
        _id: "cc711c28-b8bd-4d67-9e19-5838f39110c9",
        slug: "polkadot-consensus-part-1-enhanced-economic-security-via-npos",
      },
      {
        title: "Call for Speakers at sub0 Asia is open! Get involved now...",
        _id: "f0fb535b-2b92-4fd9-8d68-d3b1fed2b732",
        slug: "call-for-speakers-at-sub0-asia",
      },
      {
        title:
          "Empowering Next-Level Insights:  Dune Brings Polkadot and Kusama Analytics into Focus",
        _id: "f8827bfa-9694-4fd1-8e18-3f0e9d97d1b8",
        slug: "polkadot-kusama-analytics-dune",
      },
    ],
  },
}
