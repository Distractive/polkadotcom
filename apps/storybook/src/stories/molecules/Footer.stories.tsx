import type { Meta, StoryObj } from "@storybook/react"

import FooterLayout from "../../../../web/features/footer/layout"

const meta = {
  title: "Features/Footer",
  component: FooterLayout,
  argTypes: {},
} satisfies Meta<typeof FooterLayout>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    footer: {
      menu: [
        {
          heading: "Get Started",
          link: {
            label: "Get Started",
            external: "https://google.co.uk",
          },
          items: [
            {
              link: {
                label: "DOT 101",
                external: "https://google.co.uk",
              },
            },
            {
              link: {
                label: "Polkadot Wallets",
              },
            },
          ],
        },
        {
          heading: "Platform",
          link: {
            label: "Platform",
            internal: "/google.co.uk",
          },
          items: [
            {
              link: {
                label: "Polkadot SDK",
              },
            },
            {
              link: {
                label: "Polkadot Chain",
              },
            },
          ],
        },
        {
          heading: "Developers",
          link: {
            label: "Developers",
            internal: "https://google.co.uk",
          },
          items: [
            {
              link: {
                label: "Polkadot SDK",
              },
            },
            {
              link: {
                label: "Polkadot Chain",
              },
            },
          ],
        },
        {
          heading: "Community",
          link: {
            label: "Community",
            internal: "https://google.co.uk",
          },
          items: [
            {
              link: {
                label: "Polkadot SDK",
              },
            },
            {
              link: {
                label: "Polkadot Chain",
              },
            },
          ],
        },
        {
          heading: "Legal",
          link: {
            label: "Legal",
            internal: "https://google.co.uk",
          },
          items: [
            {
              link: {
                label: "Polkadot SDK",
              },
            },
            {
              link: {
                label: "Polkadot Chain",
              },
            },
          ],
        },
      ],
      socialLinks: [
        {
          url: "https://google.co.uk",
          title: "Twitter",
          image: {
            asset: {
              url: "https://via.placeholder.com/26",
            },
          },
        },
        {
          url: "https://google.co.uk",
          title: "Twitter",
          image: {
            asset: {
              url: "https://via.placeholder.com/26",
            },
          },
        },
        {
          url: "https://google.co.uk",
          title: "Twitter",
          image: {
            asset: {
              url: "https://via.placeholder.com/26",
            },
          },
        },
        {
          url: "https://google.co.uk",
          title: "Twitter",
          image: {
            asset: {
              url: "https://via.placeholder.com/26",
            },
          },
        },
      ],
    },
  },
}
