import { getPostHeading, getPosts } from '@/sanity/queries/posts';
import type { headerSelection } from '@/sanity/selections/blocks/header';
import type { TypeFromSelection } from 'groqd';

import {
  BLOG_POSTTYPE,
  CASE_STUDY_POSTTYPE,
  POSTS_PER_PAGE,
  PRESS_RELEASE_POSTTYPE,
} from '@/constants/global';
import { Heading, cn } from '@shared/ui';

import {
  BreadcrumbBlock,
  type BreadcrumbProps,
} from '../page/blocks/breadcrumb';
import { Grid } from './grid';
import { Search } from './page-search';
import { PostPagination } from './pagination';
import { ScrollToView } from './scroll-to-view';

interface LayoutProps {
  page: number;
  type:
    | typeof BLOG_POSTTYPE
    | typeof PRESS_RELEASE_POSTTYPE
    | typeof CASE_STUDY_POSTTYPE;
  tagSlug: string;
  withHeader?: boolean;
}

const SEARCH_INDEX_MAP = {
  [BLOG_POSTTYPE]: 'blog',
  [CASE_STUDY_POSTTYPE]: 'case-studies',
  [PRESS_RELEASE_POSTTYPE]: 'newsroom',
};

export default async function Layout({ page, tagSlug, type }: LayoutProps) {
  const data = await getPosts(page, type, tagSlug, false);

  const postType = (() => {
    switch (type) {
      case BLOG_POSTTYPE:
        return 'blog';
      case CASE_STUDY_POSTTYPE:
        return 'case-studies';
      case PRESS_RELEASE_POSTTYPE:
        return 'press-releases';
    }
  })();

  const [postsData] = await getPostHeading(postType);

  const breadcrumb: BreadcrumbProps = {
    items: (() => {
      switch (type) {
        case 'Press Release':
          return [
            {
              slug: '/community/newsroom',
              title: 'Newsroom',
            },
            {
              slug: '/newsroom/press-releases',
              title: 'Press Releases',
            },
          ];
        case 'Case Study':
          return [
            {
              slug: '/platform',
              title: 'Platform',
            },
            {
              slug: '/case-studies',
              title: 'Case Studies',
            },
          ];
        case 'Blog':
          return [
            {
              slug: '/community',
              title: 'Community',
            },
            {
              slug: '/blog',
              title: 'Blog',
            },
          ];
        default:
          return [];
      }
    })(),
  };

  const header: TypeFromSelection<typeof headerSelection> = {
    image: postsData?.headerImage || null,
    // biome-ignore lint/suspicious/noExplicitAny: <TODO: Fix>
    isAlternate: (postsData as any).isAlternate,
    title: postsData?.heading || '',
    body: postsData?.body || '',
    video: null,
    links: null,
    mobileImage: null,
  };

  return (
    <>
      <ScrollToView page={Number(page)} />
      <header
        className="max-width mb-page mt-page flex flex-col"
        data-testid="platform-header"
      >
        <div
          className={cn(
            'flex max-w-4xl flex-col justify-center gap-copy lg:pt-16',
            header.image
              ? 'px-gutter pt-card'
              : 'mt-gutter px-gutter pt-header-top',
          )}
        >
          {breadcrumb && <BreadcrumbBlock items={breadcrumb.items} />}

          <Heading variant="h1">
            {header.title}
            {tagSlug &&
              ` - ${tagSlug?.charAt(0).toUpperCase()}${tagSlug.slice(1)}`}
          </Heading>

          {header.body && <p className="text-lg">{header.body}</p>}
        </div>
      </header>
      {data && (
        <div
          id="main-content"
          className="max-width col-span-full px-gutter"
          data-testid="main-content"
        >
          <div className="grid-system col-span-full mb-card">
            {tagSlug === '' && (
              <search className="col-span-full mb-8 lg:col-span-8 lg:mb-0">
                <Search indexName={SEARCH_INDEX_MAP[type]} />
              </search>
            )}

            <div
              className={cn(
                'col-span-full flex items-center lg:col-span-4 lg:justify-end',
                tagSlug !== '' && 'lg:col-span-full',
              )}
            >
              <span className="text-sm lg:px-gutter">
                Page:{' '}
                <span className="text-center font-bold">
                  {page} of {Math.ceil(data.totalCount / POSTS_PER_PAGE)}
                </span>
              </span>
            </div>
          </div>

          <section className="col-span-full">
            <Grid posts={data.posts} />
          </section>

          <PostPagination
            total={data.totalCount}
            limit={POSTS_PER_PAGE}
            page={page}
            type={type}
            tagSlug={tagSlug !== '' ? tagSlug : undefined}
          />
        </div>
      )}
    </>
  );
}
