import type { blogSelection } from '@/sanity/selections/blog/blog';
import type { TypeFromSelection } from 'groqd';

import type { BreadcrumbProps } from '@/features/page/blocks/breadcrumb';

export type PostData = TypeFromSelection<typeof blogSelection>;

export default function generateBreadcrumbs(
  type: string,
  post: PostData | undefined,
): BreadcrumbProps {
  const slug = post?.slug ? `/${post.slug}` : '';
  const parentSlug = post?.parent?.slug ? `/${post.parent.slug}` : '';
  const parentTitle = post?.parent?.header?.title ?? '';

  if (type === 'Press Release') {
    return {
      items: [
        {
          slug: '/community/newsroom',
          title: 'Newsroom',
        },
        {
          slug: '/newsroom/press-releases',
          title: 'Press Releases',
        },
      ],
    };
  }

  if (type === 'Case Study') {
    return {
      items: [
        {
          slug: parentSlug,
          title: parentTitle,
        },
        {
          slug: '/case-studies',
          title: 'Case Studies',
        },
      ],
    };
  }

  return {
    items: [
      {
        slug: parentSlug,
        title: parentTitle,
      },
      {
        slug: slug && parentSlug ? `${parentSlug}${slug}` : '',
        title: post?.heading ?? '',
      },
    ],
  };
}
