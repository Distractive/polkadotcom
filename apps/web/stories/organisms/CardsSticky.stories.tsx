import type { Meta, StoryObj } from '@storybook/react';

import { CardsStickyBlock } from '@/features/page/blocks/cards-sticky/cards';

const meta = {
  title: 'Organisms/CardsStickyBlock',
  component: CardsStickyBlock,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CardsStickyBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ImageCardsWithAllProps: Story = {
  args: {
    cards: {
      //@ts-ignore
      _key: 'ImageCardsWithAllProps',
      heading: 'Sticky image cards with all possible props',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      items: [
        {
          _key: '1',
          //@ts-ignore
          image: {
            asset: {
              _id: 'image-c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400-jpg',
              _type: 'sanity.imageAsset',
              _rev: '0mhgbWkjiNeDxVX8gZFkK4',
              extension: 'jpg',
              mimeType: 'image/jpeg',
              originalFilename: 'Image-card.jpg',
              path: 'images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              sha1hash: 'c675257cff3d6cc12173b1692a76fc40dc11ce2a',
              size: 65963,
              url: 'https://cdn.sanity.io/images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              _updatedAt: '2024-05-26T12:21:28Z',
              metadata: {
                dimensions: {
                  _type: 'sanity.imageDimensions',
                  aspectRatio: 1.62,
                  height: 400,
                  width: 648,
                },
              },
            },
          },
          eyebrow: 'Eyebrow',
          heading: 'Heading for sticky card with image',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          link: {
            label: 'Learn more',
            variant: 'secondary',
            external: 'https://google.co.uk',
            internal: null,
          },
        },
        {
          _key: '2',
          //@ts-ignore
          image: {
            asset: {
              _id: 'image-c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400-jpg',
              _type: 'sanity.imageAsset',
              _rev: '0mhgbWkjiNeDxVX8gZFkK4',
              extension: 'jpg',
              mimeType: 'image/jpeg',
              originalFilename: 'Image-card.jpg',
              path: 'images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              sha1hash: 'c675257cff3d6cc12173b1692a76fc40dc11ce2a',
              size: 65963,
              url: 'https://cdn.sanity.io/images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              _updatedAt: '2024-05-26T12:21:28Z',
              metadata: {
                dimensions: {
                  _type: 'sanity.imageDimensions',
                  aspectRatio: 1.62,
                  height: 400,
                  width: 648,
                },
              },
            },
          },
          eyebrow: 'Eyebrow',
          heading: 'Heading for sticky card with image',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          link: {
            label: 'Learn more',
            variant: 'primary',
            external: 'https://google.co.uk',
            internal: null,
          },
        },
        {
          _key: '3',
          //@ts-ignore
          image: {
            asset: {
              _id: 'image-c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400-jpg',
              _type: 'sanity.imageAsset',
              _rev: '0mhgbWkjiNeDxVX8gZFkK4',
              extension: 'jpg',
              mimeType: 'image/jpeg',
              originalFilename: 'Image-card.jpg',
              path: 'images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              sha1hash: 'c675257cff3d6cc12173b1692a76fc40dc11ce2a',
              size: 65963,
              url: 'https://cdn.sanity.io/images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              _updatedAt: '2024-05-26T12:21:28Z',
              metadata: {
                dimensions: {
                  _type: 'sanity.imageDimensions',
                  aspectRatio: 1.62,
                  height: 400,
                  width: 648,
                },
              },
            },
          },
          eyebrow: 'Eyebrow',
          heading: 'Heading for sticky card with image',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          link: {
            label: 'Learn more',
            variant: 'primary',
            external: 'https://google.co.uk',
            internal: null,
          },
        },
        {
          _key: '4',
          //@ts-ignore
          image: {
            asset: {
              _id: 'image-c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400-jpg',
              _type: 'sanity.imageAsset',
              _rev: '0mhgbWkjiNeDxVX8gZFkK4',
              extension: 'jpg',
              mimeType: 'image/jpeg',
              originalFilename: 'Image-card.jpg',
              path: 'images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              sha1hash: 'c675257cff3d6cc12173b1692a76fc40dc11ce2a',
              size: 65963,
              url: 'https://cdn.sanity.io/images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              _updatedAt: '2024-05-26T12:21:28Z',
              metadata: {
                dimensions: {
                  _type: 'sanity.imageDimensions',
                  aspectRatio: 1.62,
                  height: 400,
                  width: 648,
                },
              },
            },
          },
          eyebrow: 'Eyebrow',
          heading: 'Heading for sticky card with image',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          link: {
            label: 'Learn more',
            variant: 'primary',
            external: 'https://google.co.uk',
            internal: null,
          },
        },
      ],
    },
  },
};

export const ImageCardsSeenInDesign: Story = {
  args: {
    cards: {
      //@ts-ignore
      _key: 'ImageCardsSeenInDesign',
      heading: 'Sticky image cards seen in design',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      items: [
        {
          _key: '1',
          //@ts-ignore
          image: {
            asset: {
              _id: 'image-c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400-jpg',
              _type: 'sanity.imageAsset',
              _rev: '0mhgbWkjiNeDxVX8gZFkK4',
              extension: 'jpg',
              mimeType: 'image/jpeg',
              originalFilename: 'Image-card.jpg',
              path: 'images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              sha1hash: 'c675257cff3d6cc12173b1692a76fc40dc11ce2a',
              size: 65963,
              url: 'https://cdn.sanity.io/images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              _updatedAt: '2024-05-26T12:21:28Z',
              metadata: {
                dimensions: {
                  _type: 'sanity.imageDimensions',
                  aspectRatio: 1.62,
                  height: 400,
                  width: 648,
                },
              },
            },
          },
          heading: 'Heading for sticky card with image',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          link: {
            label: 'Learn more',
            variant: 'secondary',
            external: 'https://google.co.uk',
            internal: null,
          },
        },
        {
          _key: '2',
          //@ts-ignore
          image: {
            asset: {
              _id: 'image-c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400-jpg',
              _type: 'sanity.imageAsset',
              _rev: '0mhgbWkjiNeDxVX8gZFkK4',
              extension: 'jpg',
              mimeType: 'image/jpeg',
              originalFilename: 'Image-card.jpg',
              path: 'images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              sha1hash: 'c675257cff3d6cc12173b1692a76fc40dc11ce2a',
              size: 65963,
              url: 'https://cdn.sanity.io/images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              _updatedAt: '2024-05-26T12:21:28Z',
              metadata: {
                dimensions: {
                  _type: 'sanity.imageDimensions',
                  aspectRatio: 1.62,
                  height: 400,
                  width: 648,
                },
              },
            },
          },
          heading: 'Heading for sticky card with image',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          link: {
            label: 'Learn more',
            variant: 'secondary',
            external: 'https://google.co.uk',
            internal: null,
          },
        },
        {
          _key: '3',
          //@ts-ignore
          image: {
            asset: {
              _id: 'image-c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400-jpg',
              _type: 'sanity.imageAsset',
              _rev: '0mhgbWkjiNeDxVX8gZFkK4',
              extension: 'jpg',
              mimeType: 'image/jpeg',
              originalFilename: 'Image-card.jpg',
              path: 'images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              sha1hash: 'c675257cff3d6cc12173b1692a76fc40dc11ce2a',
              size: 65963,
              url: 'https://cdn.sanity.io/images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              _updatedAt: '2024-05-26T12:21:28Z',
              metadata: {
                dimensions: {
                  _type: 'sanity.imageDimensions',
                  aspectRatio: 1.62,
                  height: 400,
                  width: 648,
                },
              },
            },
          },
          heading: 'Heading for sticky card with image',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          link: {
            label: 'Learn more',
            variant: 'secondary',
            external: 'https://google.co.uk',
            internal: null,
          },
        },
        {
          _key: '4',
          //@ts-ignore
          image: {
            asset: {
              _id: 'image-c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400-jpg',
              _type: 'sanity.imageAsset',
              _rev: '0mhgbWkjiNeDxVX8gZFkK4',
              extension: 'jpg',
              mimeType: 'image/jpeg',
              originalFilename: 'Image-card.jpg',
              path: 'images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              sha1hash: 'c675257cff3d6cc12173b1692a76fc40dc11ce2a',
              size: 65963,
              url: 'https://cdn.sanity.io/images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              _updatedAt: '2024-05-26T12:21:28Z',
              metadata: {
                dimensions: {
                  _type: 'sanity.imageDimensions',
                  aspectRatio: 1.62,
                  height: 400,
                  width: 648,
                },
              },
            },
          },
          heading: 'Heading for sticky card with image',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          link: {
            label: 'Learn more',
            variant: 'secondary',
            external: 'https://google.co.uk',
            internal: null,
          },
        },
      ],
    },
  },
};

export const IconCardsWithAllProps: Story = {
  args: {
    cards: {
      //@ts-ignore
      _key: 'IconCardsWithAllProps',
      heading: 'Sticky icon cards with all possible props',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      items: [
        {
          _key: '1',
          //@ts-ignore
          icon: {
            asset: {
              _id: 'image-c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400-jpg',
              _type: 'sanity.imageAsset',
              _rev: '0mhgbWkjiNeDxVX8gZFkK4',
              extension: 'jpg',
              mimeType: 'image/jpeg',
              originalFilename: 'Image-card.jpg',
              path: 'images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              sha1hash: 'c675257cff3d6cc12173b1692a76fc40dc11ce2a',
              size: 65963,
              url: 'https://cdn.sanity.io/images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              _updatedAt: '2024-05-26T12:21:28Z',
              metadata: {
                dimensions: {
                  _type: 'sanity.imageDimensions',
                  aspectRatio: 1.62,
                  height: 400,
                  width: 648,
                },
              },
            },
          },
          eyebrow: 'Eyebrow',
          heading: 'Heading for sticky card with icon',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          link: {
            label: 'Learn more',
            variant: 'secondary',
            external: 'https://google.co.uk',
            internal: null,
          },
        },
        {
          _key: '2',
          //@ts-ignore
          icon: {
            asset: {
              _id: 'image-c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400-jpg',
              _type: 'sanity.imageAsset',
              _rev: '0mhgbWkjiNeDxVX8gZFkK4',
              extension: 'jpg',
              mimeType: 'image/jpeg',
              originalFilename: 'Image-card.jpg',
              path: 'images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              sha1hash: 'c675257cff3d6cc12173b1692a76fc40dc11ce2a',
              size: 65963,
              url: 'https://cdn.sanity.io/images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              _updatedAt: '2024-05-26T12:21:28Z',
              metadata: {
                dimensions: {
                  _type: 'sanity.imageDimensions',
                  aspectRatio: 1.62,
                  height: 400,
                  width: 648,
                },
              },
            },
          },
          eyebrow: 'Eyebrow',
          heading: 'Heading for sticky card with icon',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          link: {
            label: 'Learn more',
            variant: 'primary',
            external: 'https://google.co.uk',
            internal: null,
          },
        },
        {
          _key: '3',
          //@ts-ignore
          icon: {
            asset: {
              _id: 'image-c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400-jpg',
              _type: 'sanity.imageAsset',
              _rev: '0mhgbWkjiNeDxVX8gZFkK4',
              extension: 'jpg',
              mimeType: 'image/jpeg',
              originalFilename: 'Image-card.jpg',
              path: 'images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              sha1hash: 'c675257cff3d6cc12173b1692a76fc40dc11ce2a',
              size: 65963,
              url: 'https://cdn.sanity.io/images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              _updatedAt: '2024-05-26T12:21:28Z',
              metadata: {
                dimensions: {
                  _type: 'sanity.imageDimensions',
                  aspectRatio: 1.62,
                  height: 400,
                  width: 648,
                },
              },
            },
          },
          eyebrow: 'Eyebrow',
          heading: 'Heading for sticky card with icon',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          link: {
            label: 'Learn more',
            variant: 'primary',
            external: 'https://google.co.uk',
            internal: null,
          },
        },
        {
          _key: '4',
          //@ts-ignore
          icon: {
            asset: {
              _id: 'image-c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400-jpg',
              _type: 'sanity.imageAsset',
              _rev: '0mhgbWkjiNeDxVX8gZFkK4',
              extension: 'jpg',
              mimeType: 'image/jpeg',
              originalFilename: 'Image-card.jpg',
              path: 'images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              sha1hash: 'c675257cff3d6cc12173b1692a76fc40dc11ce2a',
              size: 65963,
              url: 'https://cdn.sanity.io/images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              _updatedAt: '2024-05-26T12:21:28Z',
              metadata: {
                dimensions: {
                  _type: 'sanity.imageDimensions',
                  aspectRatio: 1.62,
                  height: 400,
                  width: 648,
                },
              },
            },
          },
          eyebrow: 'Eyebrow',
          heading: 'Heading for sticky card with icon',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          link: {
            label: 'Learn more',
            variant: 'primary',
            external: 'https://google.co.uk',
            internal: null,
          },
        },
      ],
    },
  },
};

export const IconCardsSeenInDesign: Story = {
  args: {
    cards: {
      //@ts-ignore
      _key: 'IconCardsSeenInDesign',
      heading: 'Sticky icon cards seen in design',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      items: [
        {
          _key: '1',
          //@ts-ignore
          icon: {
            asset: {
              _id: 'image-c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400-jpg',
              _type: 'sanity.imageAsset',
              _rev: '0mhgbWkjiNeDxVX8gZFkK4',
              extension: 'jpg',
              mimeType: 'image/jpeg',
              originalFilename: 'Image-card.jpg',
              path: 'images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              sha1hash: 'c675257cff3d6cc12173b1692a76fc40dc11ce2a',
              size: 65963,
              url: 'https://cdn.sanity.io/images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              _updatedAt: '2024-05-26T12:21:28Z',
              metadata: {
                dimensions: {
                  _type: 'sanity.imageDimensions',
                  aspectRatio: 1.62,
                  height: 400,
                  width: 648,
                },
              },
            },
          },
          heading: 'Heading for sticky card with icon',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          _key: '2',
          //@ts-ignore
          icon: {
            asset: {
              _id: 'image-c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400-jpg',
              _type: 'sanity.imageAsset',
              _rev: '0mhgbWkjiNeDxVX8gZFkK4',
              extension: 'jpg',
              mimeType: 'image/jpeg',
              originalFilename: 'Image-card.jpg',
              path: 'images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              sha1hash: 'c675257cff3d6cc12173b1692a76fc40dc11ce2a',
              size: 65963,
              url: 'https://cdn.sanity.io/images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              _updatedAt: '2024-05-26T12:21:28Z',
              metadata: {
                dimensions: {
                  _type: 'sanity.imageDimensions',
                  aspectRatio: 1.62,
                  height: 400,
                  width: 648,
                },
              },
            },
          },
          heading: 'Heading for sticky card with icon',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          _key: '3',
          //@ts-ignore
          icon: {
            asset: {
              _id: 'image-c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400-jpg',
              _type: 'sanity.imageAsset',
              _rev: '0mhgbWkjiNeDxVX8gZFkK4',
              extension: 'jpg',
              mimeType: 'image/jpeg',
              originalFilename: 'Image-card.jpg',
              path: 'images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              sha1hash: 'c675257cff3d6cc12173b1692a76fc40dc11ce2a',
              size: 65963,
              url: 'https://cdn.sanity.io/images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              _updatedAt: '2024-05-26T12:21:28Z',
              metadata: {
                dimensions: {
                  _type: 'sanity.imageDimensions',
                  aspectRatio: 1.62,
                  height: 400,
                  width: 648,
                },
              },
            },
          },
          heading: 'Heading for sticky card with icon',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          _key: '4',
          //@ts-ignore
          icon: {
            asset: {
              _id: 'image-c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400-jpg',
              _type: 'sanity.imageAsset',
              _rev: '0mhgbWkjiNeDxVX8gZFkK4',
              extension: 'jpg',
              mimeType: 'image/jpeg',
              originalFilename: 'Image-card.jpg',
              path: 'images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              sha1hash: 'c675257cff3d6cc12173b1692a76fc40dc11ce2a',
              size: 65963,
              url: 'https://cdn.sanity.io/images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              _updatedAt: '2024-05-26T12:21:28Z',
              metadata: {
                dimensions: {
                  _type: 'sanity.imageDimensions',
                  aspectRatio: 1.62,
                  height: 400,
                  width: 648,
                },
              },
            },
          },
          heading: 'Heading for sticky card with icon',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
      ],
    },
  },
};

export const ImageCardsWithLessProps: Story = {
  args: {
    cards: {
      //@ts-ignore
      _key: 'ImageCardsWithAllProps',
      heading: 'Sticky image cards with all possible props',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      items: [
        {
          _key: '1',
          //@ts-ignore
          image: {
            asset: {
              _id: 'image-c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400-jpg',
              _type: 'sanity.imageAsset',
              _rev: '0mhgbWkjiNeDxVX8gZFkK4',
              extension: 'jpg',
              mimeType: 'image/jpeg',
              originalFilename: 'Image-card.jpg',
              path: 'images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              sha1hash: 'c675257cff3d6cc12173b1692a76fc40dc11ce2a',
              size: 65963,
              url: 'https://cdn.sanity.io/images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              _updatedAt: '2024-05-26T12:21:28Z',
              metadata: {
                dimensions: {
                  _type: 'sanity.imageDimensions',
                  aspectRatio: 1.62,
                  height: 400,
                  width: 648,
                },
              },
            },
          },
          heading: 'Heading for sticky card with image',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          _key: '2',
          //@ts-ignore
          image: {
            asset: {
              _id: 'image-c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400-jpg',
              _type: 'sanity.imageAsset',
              _rev: '0mhgbWkjiNeDxVX8gZFkK4',
              extension: 'jpg',
              mimeType: 'image/jpeg',
              originalFilename: 'Image-card.jpg',
              path: 'images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              sha1hash: 'c675257cff3d6cc12173b1692a76fc40dc11ce2a',
              size: 65963,
              url: 'https://cdn.sanity.io/images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              _updatedAt: '2024-05-26T12:21:28Z',
              metadata: {
                dimensions: {
                  _type: 'sanity.imageDimensions',
                  aspectRatio: 1.62,
                  height: 400,
                  width: 648,
                },
              },
            },
          },
          heading: 'Heading for sticky card with image',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          _key: '3',
          //@ts-ignore
          image: {
            asset: {
              _id: 'image-c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400-jpg',
              _type: 'sanity.imageAsset',
              _rev: '0mhgbWkjiNeDxVX8gZFkK4',
              extension: 'jpg',
              mimeType: 'image/jpeg',
              originalFilename: 'Image-card.jpg',
              path: 'images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              sha1hash: 'c675257cff3d6cc12173b1692a76fc40dc11ce2a',
              size: 65963,
              url: 'https://cdn.sanity.io/images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              _updatedAt: '2024-05-26T12:21:28Z',
              metadata: {
                dimensions: {
                  _type: 'sanity.imageDimensions',
                  aspectRatio: 1.62,
                  height: 400,
                  width: 648,
                },
              },
            },
          },
          heading: 'Heading for sticky card with image',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          _key: '4',
          //@ts-ignore
          image: {
            asset: {
              _id: 'image-c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400-jpg',
              _type: 'sanity.imageAsset',
              _rev: '0mhgbWkjiNeDxVX8gZFkK4',
              extension: 'jpg',
              mimeType: 'image/jpeg',
              originalFilename: 'Image-card.jpg',
              path: 'images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              sha1hash: 'c675257cff3d6cc12173b1692a76fc40dc11ce2a',
              size: 65963,
              url: 'https://cdn.sanity.io/images/qf32zgfm/production/c675257cff3d6cc12173b1692a76fc40dc11ce2a-648x400.jpg',
              _updatedAt: '2024-05-26T12:21:28Z',
              metadata: {
                dimensions: {
                  _type: 'sanity.imageDimensions',
                  aspectRatio: 1.62,
                  height: 400,
                  width: 648,
                },
              },
            },
          },
          heading: 'Heading for sticky card with image',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
      ],
    },
  },
};

const cardsBlocks = [
  ImageCardsWithAllProps,
  ImageCardsSeenInDesign,
  IconCardsWithAllProps,
  IconCardsSeenInDesign,
  ImageCardsWithLessProps,
];

export const All = {
  render: () => {
    return (
      <div className="flex flex-col gap-page">
        {cardsBlocks.map((block, index) => (
          <CardsStickyBlock key={block.name} cards={block.args.cards} />
        ))}
      </div>
    );
  },
};
