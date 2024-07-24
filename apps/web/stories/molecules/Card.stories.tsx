import type { Meta, StoryObj } from "@storybook/react"

import CardBlock from "@/features/page/blocks/cards/card"

const meta = {
  title: "Molecules/Card",
  component: CardBlock,
} satisfies Meta<typeof CardBlock>

export default meta

type Story = StoryObj<typeof meta>

export const HeaderImageStacked: Story = {
  args: {
    card: {
      headerImage: {
        _key: null,
        _type: "image",
        //@ts-ignore
        asset: {
          _id: "image-d92914ab49048397db217d3f3af0a49e80b725b3-1528x1144-png",
          _type: "sanity.imageAsset",
          _rev: "cgpMiGDnuaWoYhX2bKVMe3",
          path: "images/qf32zgfm/production/d92914ab49048397db217d3f3af0a49e80b725b3-1528x1144.png",
          size: 302070,
          url: "https://cdn.sanity.io/images/qf32zgfm/production/d92914ab49048397db217d3f3af0a49e80b725b3-1528x1144.png",
          _updatedAt: "2024-07-18T13:22:26Z",
          metadata: {
            dimensions: {
              _type: "sanity.imageDimensions",
              aspectRatio: 1.3356643356643356,
              height: 1144,
              width: 1528,
            },
          },
        },
      },
      tags: ["Tag 1", "Tag 2", "Tag 3"],
      eyebrow: "Eyebrow",
      heading: "Header Image Stacked",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: {
        label: "Learn more",
        external: "https://google.co.uk",
        internal: null,
      },
    },
  },
}

export const IconStacked: Story = {
  args: {
    card: {
      //@ts-ignore
      icon: {
        _key: null,
        _type: "image",
        //@ts-ignore
        asset: {
          _id: "image-6d3390dee8bf7b206fee4a405df3e1fddad57b76-500x500-svg",
          _type: "sanity.imageAsset",
          _rev: "WWsxaDec2tA4DDZKplUfkc",
          mimeType: "image/svg+xml",
          path: "images/qf32zgfm/production/6d3390dee8bf7b206fee4a405df3e1fddad57b76-500x500.svg",
          size: 4931,
          url: "https://cdn.sanity.io/images/qf32zgfm/production/6d3390dee8bf7b206fee4a405df3e1fddad57b76-500x500.svg",
          _updatedAt: "2024-07-22T13:39:58Z",
          metadata: {
            dimensions: {
              _type: "sanity.imageDimensions",
              aspectRatio: 1,
              height: 500,
              width: 500,
            },
          },
        },
      },
      tags: ["Tag 1", "Tag 2", "Tag 3"],
      eyebrow: "Eyebrow",
      heading: "Icon Stacked",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: {
        label: "Learn more",
        external: "https://google.co.uk",
        internal: null,
      },
    },
  },
}

export const HeaderImageIconStacked: Story = {
  args: {
    card: {
      //@ts-ignore
      headerImage: {
        _key: null,
        _type: "image",
        //@ts-ignore
        asset: {
          _id: "image-d92914ab49048397db217d3f3af0a49e80b725b3-1528x1144-png",
          _type: "sanity.imageAsset",
          _rev: "cgpMiGDnuaWoYhX2bKVMe3",

          path: "images/qf32zgfm/production/d92914ab49048397db217d3f3af0a49e80b725b3-1528x1144.png",
          size: 302070,
          url: "https://cdn.sanity.io/images/qf32zgfm/production/d92914ab49048397db217d3f3af0a49e80b725b3-1528x1144.png",
          _updatedAt: "2024-07-18T13:22:26Z",
          metadata: {
            dimensions: {
              _type: "sanity.imageDimensions",
              aspectRatio: 1.3356643356643356,
              height: 1144,
              width: 1528,
            },
          },
        },
      },
      //@ts-ignore
      icon: {
        _key: null,
        _type: "image",
        //@ts-ignore
        asset: {
          _id: "image-6d3390dee8bf7b206fee4a405df3e1fddad57b76-500x500-svg",
          _type: "sanity.imageAsset",
          _rev: "WWsxaDec2tA4DDZKplUfkc",
          mimeType: "image/svg+xml",
          path: "images/qf32zgfm/production/6d3390dee8bf7b206fee4a405df3e1fddad57b76-500x500.svg",
          size: 4931,
          url: "https://cdn.sanity.io/images/qf32zgfm/production/6d3390dee8bf7b206fee4a405df3e1fddad57b76-500x500.svg",
          _updatedAt: "2024-07-22T13:39:58Z",
          metadata: {
            dimensions: {
              _type: "sanity.imageDimensions",
              aspectRatio: 1,
              height: 500,
              width: 500,
            },
          },
        },
      },
      tags: ["Tag 1", "Tag 2", "Tag 3"],
      eyebrow: "Eyebrow",
      heading: "Header Image Icon Stacked",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: {
        label: "Learn more",
        external: "https://google.co.uk",
        internal: null,
      },
    },
  },
}

export const HeaderImageSideBySide: Story = {
  args: {
    card: {
      //@ts-ignore
      headerImage: {
        _key: null,
        _type: "image",
        //@ts-ignore
        asset: {
          _id: "image-d92914ab49048397db217d3f3af0a49e80b725b3-1528x1144-png",
          _type: "sanity.imageAsset",
          _rev: "cgpMiGDnuaWoYhX2bKVMe3",

          path: "images/qf32zgfm/production/d92914ab49048397db217d3f3af0a49e80b725b3-1528x1144.png",
          size: 302070,
          url: "https://cdn.sanity.io/images/qf32zgfm/production/d92914ab49048397db217d3f3af0a49e80b725b3-1528x1144.png",
          _updatedAt: "2024-07-18T13:22:26Z",
          metadata: {
            dimensions: {
              _type: "sanity.imageDimensions",
              aspectRatio: 1.3356643356643356,
              height: 1144,
              width: 1528,
            },
          },
        },
      },
      tags: ["Tag 1", "Tag 2", "Tag 3"],
      eyebrow: "Eyebrow",
      heading: "Header Image Side By Side",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: {
        label: "Learn more",
        external: "https://google.co.uk",
        internal: null,
      },
    },
    showSideBySide: true,
  },
}

export const HeaderImageIconSideBySide: Story = {
  args: {
    card: {
      //@ts-ignore
      headerImage: {
        _key: null,
        _type: "image",
        //@ts-ignore
        asset: {
          _id: "image-d92914ab49048397db217d3f3af0a49e80b725b3-1528x1144-png",
          _type: "sanity.imageAsset",
          _rev: "cgpMiGDnuaWoYhX2bKVMe3",

          path: "images/qf32zgfm/production/d92914ab49048397db217d3f3af0a49e80b725b3-1528x1144.png",
          size: 302070,
          url: "https://cdn.sanity.io/images/qf32zgfm/production/d92914ab49048397db217d3f3af0a49e80b725b3-1528x1144.png",
          _updatedAt: "2024-07-18T13:22:26Z",
          metadata: {
            dimensions: {
              _type: "sanity.imageDimensions",
              aspectRatio: 1.3356643356643356,
              height: 1144,
              width: 1528,
            },
          },
        },
      },
      //@ts-ignore
      icon: {
        _key: null,
        _type: "image",
        //@ts-ignore
        asset: {
          _id: "image-6d3390dee8bf7b206fee4a405df3e1fddad57b76-500x500-svg",
          _type: "sanity.imageAsset",
          _rev: "WWsxaDec2tA4DDZKplUfkc",
          mimeType: "image/svg+xml",
          path: "images/qf32zgfm/production/6d3390dee8bf7b206fee4a405df3e1fddad57b76-500x500.svg",
          size: 4931,
          url: "https://cdn.sanity.io/images/qf32zgfm/production/6d3390dee8bf7b206fee4a405df3e1fddad57b76-500x500.svg",
          _updatedAt: "2024-07-22T13:39:58Z",
          metadata: {
            dimensions: {
              _type: "sanity.imageDimensions",
              aspectRatio: 1,
              height: 500,
              width: 500,
            },
          },
        },
      },
      tags: ["Tag 1", "Tag 2", "Tag 3"],
      eyebrow: "Eyebrow",
      heading: "Header Image Icon Side by Side",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: {
        label: "Learn more",
        external: "https://google.co.uk",
        internal: null,
      },
    },
    showSideBySide: true,
  },
}

export const BackgroundImageStacked: Story = {
  args: {
    card: {
      //@ts-ignore
      headerImage: {
        _key: null,
        _type: "image",
        //@ts-ignore
        asset: {
          _id: "image-d92914ab49048397db217d3f3af0a49e80b725b3-1528x1144-png",
          _type: "sanity.imageAsset",
          _rev: "cgpMiGDnuaWoYhX2bKVMe3",

          path: "images/qf32zgfm/production/d92914ab49048397db217d3f3af0a49e80b725b3-1528x1144.png",
          size: 302070,
          url: "https://cdn.sanity.io/images/qf32zgfm/production/d92914ab49048397db217d3f3af0a49e80b725b3-1528x1144.png",
          _updatedAt: "2024-07-18T13:22:26Z",
          metadata: {
            dimensions: {
              _type: "sanity.imageDimensions",
              aspectRatio: 1.3356643356643356,
              height: 1144,
              width: 1528,
            },
          },
        },
      },
      tags: ["Tag 1", "Tag 2", "Tag 3"],
      eyebrow: "Eyebrow",
      heading: "Background Image Stacked",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: {
        label: "Learn more",
        external: "https://google.co.uk",
        internal: null,
      },
      useAsBackgroundImage: true,
    },
  },
}

export const BackgroundImageIconSideBySide: Story = {
  args: {
    card: {
      //@ts-ignore
      headerImage: {
        _key: null,
        _type: "image",
        //@ts-ignore
        asset: {
          _id: "image-d92914ab49048397db217d3f3af0a49e80b725b3-1528x1144-png",
          _type: "sanity.imageAsset",
          _rev: "cgpMiGDnuaWoYhX2bKVMe3",

          path: "images/qf32zgfm/production/d92914ab49048397db217d3f3af0a49e80b725b3-1528x1144.png",
          size: 302070,
          url: "https://cdn.sanity.io/images/qf32zgfm/production/d92914ab49048397db217d3f3af0a49e80b725b3-1528x1144.png",
          _updatedAt: "2024-07-18T13:22:26Z",
          metadata: {
            dimensions: {
              _type: "sanity.imageDimensions",
              aspectRatio: 1.3356643356643356,
              height: 1144,
              width: 1528,
            },
          },
        },
      },
      //@ts-ignore
      icon: {
        _key: null,
        _type: "image",
        //@ts-ignore
        asset: {
          _id: "image-6d3390dee8bf7b206fee4a405df3e1fddad57b76-500x500-svg",
          _type: "sanity.imageAsset",
          _rev: "WWsxaDec2tA4DDZKplUfkc",
          mimeType: "image/svg+xml",
          path: "images/qf32zgfm/production/6d3390dee8bf7b206fee4a405df3e1fddad57b76-500x500.svg",
          size: 4931,
          url: "https://cdn.sanity.io/images/qf32zgfm/production/6d3390dee8bf7b206fee4a405df3e1fddad57b76-500x500.svg",
          _updatedAt: "2024-07-22T13:39:58Z",
          metadata: {
            dimensions: {
              _type: "sanity.imageDimensions",
              aspectRatio: 1,
              height: 500,
              width: 500,
            },
          },
        },
      },
      tags: ["Tag 1", "Tag 2", "Tag 3"],
      eyebrow: "Eyebrow",
      heading: "Background Image Icon Side by Side",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: {
        label: "Learn more",
        external: "https://google.co.uk",
        internal: null,
      },
      useAsBackgroundImage: true,
    },
    showSideBySide: true,
  },
}

const cards = [
  HeaderImageSideBySide,
  HeaderImageIconSideBySide,
  HeaderImageStacked,
  IconStacked,
  HeaderImageIconStacked,
  BackgroundImageStacked,
  BackgroundImageIconSideBySide,
]

export const All = {
  render: () => {
    return (
      <div className="grid gap-section p-gutter md:p-section">
        {cards.map((card, index) => (
          <CardBlock key={index} card={card.args.card} />
        ))}
      </div>
    )
  },
}
