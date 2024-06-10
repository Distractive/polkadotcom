import { getPosts } from "@/sanity/queries/posts"
import { getSearchData } from "@/sanity/queries/search"

import { POSTS_PER_PAGE } from "@/constants/global"
import { cn } from "@shared/ui"

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
  const searchData = await getSearchData()

  return (
    <>
      <div className="col-span-12 px-gutter">
        {tagSlug !== "" && (
          <div className="col-span-12 flex justify-center pb-gutter pt-page">
            <h1 className="font-display text-3xl capitalize">{tagSlug}</h1>
          </div>
        )}
        <div className="grid-system col-span-12 mb-gutter">
          {tagSlug === "" && (
            <search className="col-span-12 lg:col-span-8">
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
