import type { Meta, StoryObj } from "@storybook/react"

import { HeaderBlock } from "@/features/page/blocks/header"

const meta = {
  title: "Organisms/Header",
  component: HeaderBlock,
} satisfies Meta<typeof HeaderBlock>

export default meta

type Story = StoryObj<typeof meta>

export const TitleBody: Story = {
  args: {
    //@ts-ignore
    header: {
      title: "Title Body",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    breadcrumb: {
      items: [
        { slug: "/parent", title: "Parent page" },
        { slug: "/parent/child", title: "Child page" },
      ],
    },
  },
}

export const TitleBodyLink: Story = {
  args: {
    //@ts-ignore
    header: {
      title: "Title Body Link",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: {
        label: "Learn more",
        external: null,
        internal: { slug: "/" },
      },
    },
    breadcrumb: {
      items: [
        { slug: "/parent", title: "Parent page" },
        { slug: "/parent/child", title: "Child page" },
      ],
    },
  },
}

export const TitleBodyLinkImage: Story = {
  args: {
    header: {
      //@ts-ignore
      image: { asset: { url: "/image-placeholder.png" } },
      title: "Title Body Link Image",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: {
        label: "Learn more",
        external: "https://google.co.uk",
        internal: null,
      },
    },
    breadcrumb: {
      items: [
        { slug: "/parent", title: "Parent page" },
        { slug: "/parent/child", title: "Child page" },
      ],
    },
  },
}

export const TitleBodyLinkVideo: Story = {
  args: {
    header: {
      //@ts-ignore
      title: "Title Body Link Image",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: {
        label: "Learn more",
        external: "https://google.co.uk",
        internal: null,
      },
      video: {
        url: "https://www.youtube-nocookie.com/embed/mq3SFJPti4o",
        placeholderImage: {
          //@ts-ignore
          asset: {
            url: "https://polkadot.network/static/staking-yt-thumb-82711cb4001f01beeace618f4ce69e58.jpg",
          },
        },
      },
    },
    breadcrumb: {
      items: [
        { slug: "/parent", title: "Parent page" },
        { slug: "/parent/child", title: "Child page" },
      ],
    },
  },
}

export const TierOnePage: Story = {
  args: {
    header: {
      //@ts-ignore
      image: { asset: { url: "/image-placeholder.png" } },
      title: "A tier one page has no breadcrumb",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: {
        label: "Learn more",
        external: "https://google.co.uk",
        internal: null,
      },
    },
  },
}

export const TierTwoPage: Story = {
  args: {
    header: {
      //@ts-ignore
      image: { asset: { url: "/image-placeholder.png" } },
      title: "A tier two page has a breadcrumb",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: {
        label: "Learn more",
        external: "https://google.co.uk",
        internal: null,
      },
    },
    breadcrumb: {
      items: [
        { slug: "/parent", title: "Parent page" },
        { slug: "/parent/child", title: "Child page" },
      ],
    },
  },
}

const headers = [
  TitleBody,
  TitleBodyLink,
  TitleBodyLinkImage,
  TitleBodyLinkVideo,
  TierOnePage,
  TierTwoPage,
]

export const All = {
  render: () => {
    return (
      <div className="grid-system gap-section">
        {headers.map((header, index) => (
          <HeaderBlock
            key={index}
            header={header.args.header}
            breadcrumb={header.args.breadcrumb}
            // Borders for visual separation only
            className="border-b border-t border-grey-300"
          />
        ))}
      </div>
    )
  },
}
