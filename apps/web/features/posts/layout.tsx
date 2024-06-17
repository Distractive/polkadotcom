import { getBlogHeading, getPosts } from "@/sanity/queries/posts"
import { getSearchData } from "@/sanity/queries/search"
import type { headerSelection } from "@/sanity/selections/blocks/header"
import type { TypeFromSelection } from "groqd"

import { POSTS_PER_PAGE } from "@/constants/global"
import { cn } from "@shared/ui"

import type { BreadcrumbProps } from "../page/blocks/breadcrumb"
import { HeaderBlock } from "../page/blocks/header"
import { Grid } from "./grid"
import { PostPagination } from "./pagination"
import { SearchBar } from "./search-bar"

interface LayoutProps {
  page: number
  type: "blog" | "press-release"
  tagSlug: string
}

export default async function Layout({ page, tagSlug, type }: LayoutProps) {
  const data = await getPosts(page, "Blog", tagSlug)
  const blogData = await getBlogHeading()
  const searchData = await getSearchData()

  const breadcrumb: BreadcrumbProps = {
    items: [
      {
        slug: `${blogData?.parent?.slug}` ?? "",
        title: blogData?.parent?.header?.title,
      },
      { slug: `${blogData?.slug}` ?? "", title: blogData?.heading },
    ],
  }

  const header: TypeFromSelection<typeof headerSelection> = {
    image: blogData.headerImage,
    title: blogData.heading,
    body: blogData.body,
    video: null,
    link: null,
  }

  return (
    <>
      <HeaderBlock header={header} breadcrumb={breadcrumb} />
      <div className="col-span-12 px-gutter">
        {tagSlug !== "" && (
          <div className="col-span-12 flex justify-center pb-gutter pt-page">
            <h1 className="font-display text-3xl capitalize">{tagSlug}</h1>
          </div>
        )}
        <div className="grid-system col-span-12 mb-card">
          {tagSlug === "" && (
            <search className="col-span-12 mb-8 lg:col-span-8 lg:mb-0">
              <SearchBar searches={searchData} />
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

        <section className="col-span-12">
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
