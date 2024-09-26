import { draftMode } from "next/headers"
import { getPostHeading, getPosts } from "@/sanity/queries/posts"
import { getSearchData } from "@/sanity/queries/search"
import type { headerSelection } from "@/sanity/selections/blocks/header"
import type { TypeFromSelection } from "groqd"

import {
  BLOG_POSTTYPE,
  POSTS_PER_PAGE,
  type PRESS_RELEASE_POSTTYPE,
} from "@/constants/global"
import { cn, Heading } from "@shared/ui"

import {
  BreadcrumbBlock,
  type BreadcrumbProps,
} from "../page/blocks/breadcrumb"
import { HeaderBlock } from "../page/blocks/header"
import { Grid } from "./grid"
import { PostPagination } from "./pagination"
import { ScrollToView } from "./scroll-to-view"
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
  const isDraftMode = draftMode().isEnabled
  const data = await getPosts(page, type, tagSlug, isDraftMode)
  const postType = type == BLOG_POSTTYPE ? "blog" : "press-releases"
  const postsData = await getPostHeading(postType)
  const searchData = await getSearchData(type)

  const slugPath =
    type === "Blog"
      ? `/${postsData?.slug}`
      : `/${postsData?.parent?.slug}/${postsData?.slug}`

  console.log("tagSlug", tagSlug)

  let breadcrumb: BreadcrumbProps = { items: [] }

  // Hard code press release breadcrumb due to URL structure of parent pages
  if (type === "Press Release") {
    breadcrumb = {
      items: [
        {
          slug: "/community/newsroom",
          title: "Newsroom",
        },
        {
          slug: "/newsroom/press-releases",
          title: "Press Releases",
        },
      ],
    }
  } else {
    breadcrumb = {
      items: [
        {
          slug: `/${postsData?.parent?.slug}` ?? "",
          title: postsData?.parent?.header?.title,
        },
        {
          slug: `/${postsData?.parent?.slug}/${postsData?.slug}` ?? "",
          title: postsData?.heading,
        },
      ],
    }
  }

  const header: TypeFromSelection<typeof headerSelection> = {
    image: postsData.headerImage,
    isAlternate: (postsData as any).isAlternate,
    title: postsData.heading,
    body: postsData.body,
    video: null,
    links: null,
    mobileImage: null,
  }

  console.log("header", header)
  return (
    <>
      <ScrollToView page={Number(page)} />
      {/* {withHeader && tagSlug === "" && (
        <HeaderBlock header={header} breadcrumb={breadcrumb} />
      )} */}
      <header className="max-width mb-page mt-page flex flex-col">
        <div
          className={cn(
            "flex max-w-4xl flex-col justify-center gap-copy lg:pt-16",
            header.image
              ? "px-gutter pt-card"
              : "mt-gutter px-gutter pt-header-top"
          )}
        >
          {breadcrumb && <BreadcrumbBlock items={breadcrumb.items} />}

          <Heading variant="h1">
            {header.title}
            {tagSlug &&
              " - " + tagSlug?.charAt(0).toUpperCase() + tagSlug.slice(1)}
          </Heading>

          {header.body && <p className="text-lg">{header.body}</p>}
        </div>
      </header>
      <div id="main-content" className="max-width col-span-full px-gutter">
        <div className="grid-system col-span-full mb-card">
          {tagSlug === "" && (
            <search
              role="search"
              className="col-span-full mb-8 lg:col-span-8 lg:mb-0"
            >
              <SearchBar searches={searchData} postType={type} />
            </search>
          )}

          <div
            className={cn(
              "col-span-full flex items-center lg:col-span-4 lg:justify-end",
              tagSlug !== "" && "lg:col-span-full"
            )}
          >
            <span className="text-sm lg:px-gutter">
              Page:{" "}
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
