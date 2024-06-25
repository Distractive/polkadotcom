import { getPostHeading, getPosts } from "@/sanity/queries/posts"
import { getSearchData } from "@/sanity/queries/search"
import type { headerSelection } from "@/sanity/selections/blocks/header"
import type { TypeFromSelection } from "groqd"

import {
  BLOG_POSTTYPE,
  POSTS_PER_PAGE,
  type PRESS_RELEASE_POSTTYPE,
} from "@/constants/global"
import { cn } from "@shared/ui"

import type { BreadcrumbProps } from "../page/blocks/breadcrumb"
import { HeaderBlock } from "../page/blocks/header"
import { Grid } from "./grid"
import { PostPagination } from "./pagination"
import { SearchBar } from "./search-bar"

interface LayoutProps {
  page: number
  type: typeof BLOG_POSTTYPE | typeof PRESS_RELEASE_POSTTYPE
  tagSlug: string
  withHeader?: boolean
}

export default async function Layout({
  page,
  tagSlug,
  type,
  withHeader = true,
}: LayoutProps) {
  const data = await getPosts(page, type, tagSlug)
  const postType = type == BLOG_POSTTYPE ? "blog" : "press-releases"
  const postsData = await getPostHeading(postType)
  const searchData = await getSearchData(type)
  const slugPath =
    type === "Blog"
      ? `/${postsData?.slug}`
      : `/${postsData?.parent?.slug}/${postsData?.slug}`

  const breadcrumb: BreadcrumbProps = {
    items: [
      {
        slug: `/${postsData?.parent?.slug}` ?? "",
        title: postsData?.parent?.header?.title,
      },
      {
        slug: slugPath,
        title: postsData?.heading,
      },
    ],
  }

  const header: TypeFromSelection<typeof headerSelection> = {
    image: postsData.headerImage,
    title: postsData.heading,
    body: postsData.body,
    video: null,
    links: null,
  }

  return (
    <>
      {withHeader && tagSlug === "" && (
        <HeaderBlock header={header} breadcrumb={breadcrumb} />
      )}
      <div className="max-width col-span-12 px-gutter">
        {tagSlug !== "" && (
          <div className="col-span-12 mt-gutter flex justify-center pb-gutter pt-header-top">
            <h1 className="font-display text-3xl capitalize">{tagSlug}</h1>
          </div>
        )}
        <div className="grid-system col-span-12 mb-card">
          {tagSlug === "" && (
            <search className="col-span-12 mb-8 lg:col-span-8 lg:mb-0">
              <SearchBar searches={searchData} postType={type} />
            </search>
          )}

          <div
            className={cn(
              "col-span-12 flex items-center lg:col-span-4 lg:justify-end",
              tagSlug !== "" && "lg:col-span-12"
            )}
          >
            <span className="text-sm lg:px-gutter">
              Page:
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
          tagSlug={tagSlug != "" ? tagSlug : undefined}
        />
      </div>
    </>
  )
}
