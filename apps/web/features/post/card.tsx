import type { postSelection } from '@/sanity/queries/posts';
import type { TypeFromSelection } from 'groqd';
import Image from 'next/image';
import Link from 'next/link';

import {
  BLOG_POSTTYPE,
  CASE_STUDY_POSTTYPE,
  PRESS_RELEASE_POSTTYPE,
} from '@/constants/global';
import { Card, CardContent, CardDescription, CardHeader, cn } from '@shared/ui';

interface Props {
  post: TypeFromSelection<typeof postSelection>;
  className?: string;
}

export default function BlogCard({ post, className }: Props) {
  const { slug, image, body, tags, title, post_type, custom_excerpt } = post;

  // Because not all blog posts have a custom excerpt imported
  // we have to loop round the content to find the first text block to show
  const excerpt =
    body && custom_excerpt
      ? custom_excerpt
      : body
          .find((item) =>
            item.children?.some((child) => child._type === 'span'),
          )
          ?.children.filter((child) => child._type === 'span')
          .map((span) => span.text)
          .join('');

  return (
    <Card
      key={slug}
      className={cn(
        'group relative h-full overflow-hidden rounded-2xl border border-grey-400 bg-white  transition-shadow duration-200 ease-in-out focus-within:shadow-card focus-within:backdrop-blur-0 md:cursor-pointer md:hover:shadow-card md:hover:backdrop-blur-0',
        slug &&
          'focus-within:shadow-card focus-within:backdrop-blur-0 md:cursor-pointer md:hover:shadow-card md:hover:backdrop-blur-0',
        className,
      )}
    >
      {image && (
        <CardHeader className={cn('relative z-10 aspect-video')}>
          <Image
            src={image.asset.url}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
            width={image.asset.metadata.dimensions?.width}
            height={image.asset.metadata.dimensions?.height}
            priority
          />
        </CardHeader>
      )}
      <CardContent className="grid w-full p-card">
        {tags && (
          <ul className="mb-6 flex flex-wrap gap-3">
            {tags.map((tag) => (
              <li
                key={tag.slug}
                className="mb-1 flex rounded bg-grey-200 px-3 py-1 text-left text-sm leading-relaxed text-black hover:bg-black hover:text-white"
              >
                <a
                  className="relative z-20"
                  tabIndex={-1}
                  href={
                    {
                      [BLOG_POSTTYPE]: `/blog/tag/${tag.slug}`,
                      [PRESS_RELEASE_POSTTYPE]: `/newsroom/press-releases/tag/${tag.slug}`,
                      [CASE_STUDY_POSTTYPE]: `/case-studies/tag/${tag.slug}`,
                    }[post_type] || '/'
                  }
                >
                  {tag.name}
                </a>
              </li>
            ))}
          </ul>
        )}
        {title && (
          <h2
            className={cn(
              'mb-1 text-lg font-bold transition-colors duration-200 ease-in-out',
              'group-focus-within:text-pink md:group-hover:text-pink',
            )}
          >
            <Link
              tabIndex={0}
              href={
                {
                  [BLOG_POSTTYPE]: `/blog/${post.slug}`,
                  [PRESS_RELEASE_POSTTYPE]: `/newsroom/press-releases/${post.slug}`,
                  [CASE_STUDY_POSTTYPE]: `/case-studies/${post.slug}`,
                }[post_type] || '/'
              }
              className="outline-none after:absolute after:inset-0 after:z-10 after:cursor-pointer"
            >
              {title}
            </Link>
          </h2>
        )}
        {body && (
          <CardDescription className="line-clamp-3 text-grey-900">
            {excerpt}
          </CardDescription>
        )}
      </CardContent>
    </Card>
  );
}
