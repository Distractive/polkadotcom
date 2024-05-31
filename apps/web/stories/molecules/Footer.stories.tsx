import type { Meta, StoryObj } from "@storybook/react"

import FooterLayout from "@/features/footer/layout"

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
            internal: null,
          },
          items: [
            {
              link: {
                label: "DOT 101",
                external: "https://google.co.uk",
                internal: null,
              },
            },
            {
              link: {
                label: "Polkadot Wallets",
                external: "https://google.co.uk",
                internal: null,
              },
            },
          ],
        },
        {
          heading: "Platform",
          link: {
            label: "Platform",
            internal: { slug: "/" },
            external: null,
          },
          items: [
            {
              link: {
                label: "Polkadot SDK",
                external: "https://google.co.uk",
                internal: null,
              },
            },
            {
              link: {
                label: "Polkadot Chain",
                external: "https://google.co.uk",
                internal: null,
              },
            },
          ],
        },
        {
          heading: "Developers",
          link: {
            label: "Developers",
            internal: { slug: "/" },
            external: null,
          },
          items: [
            {
              link: {
                label: "Polkadot SDK",
                external: "https://google.co.uk",
                internal: null,
              },
            },
            {
              link: {
                label: "Polkadot Chain",
                external: "https://google.co.uk",
                internal: null,
              },
            },
          ],
        },
        {
          heading: "Community",
          link: {
            label: "Community",
            internal: { slug: "/" },
            external: null,
          },
          items: [
            {
              link: {
                label: "Polkadot SDK",
                external: "https://google.co.uk",
                internal: null,
              },
            },
            {
              link: {
                label: "Polkadot Chain",
                external: "https://google.co.uk",
                internal: null,
              },
            },
          ],
        },
        {
          heading: "Legal",
          link: {
            label: "Legal",
            internal: { slug: "/" },
            external: null,
          },
          items: [
            {
              link: {
                label: "Polkadot SDK",
                external: "https://google.co.uk",
                internal: null,
              },
            },
            {
              link: {
                label: "Polkadot Chain",
                external: "https://google.co.uk",
                internal: null,
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
            //@ts-ignore
            asset: {
              url: "https://via.placeholder.com/26",
            },
          },
        },
        {
          url: "https://google.co.uk",
          title: "Twitter",
          image: {
            //@ts-ignore
            asset: {
              url: "https://via.placeholder.com/26",
            },
          },
        },
        {
          url: "https://google.co.uk",
          title: "Twitter",
          image: {
            //@ts-ignore
            asset: {
              url: "https://via.placeholder.com/26",
            },
          },
        },
        {
          url: "https://google.co.uk",
          title: "Twitter",
          image: {
            //@ts-ignore
            asset: {
              url: "https://via.placeholder.com/26",
            },
          },
        },
      ],
    },
  },
}
