import { getPosts } from "@/sanity/queries/posts"
import { getSearchData } from "@/sanity/queries/search"

import { POSTS_PER_PAGE } from "@/constants/global"

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
      <h1 className="col-span-12 font-display text-3xl">Blog</h1>
      <div className="col-span-12">
        <search className="grid-system col-span-12 mb-12 !px-0 ">
          <div className="col-span-12 lg:col-span-8">
            <SearchBar searches={searchData} />
          </div>
          <div className="col-span-12 flex shrink-0 items-center lg:col-span-4 lg:justify-end">
            <span className="text-sm lg:px-12 ">
              Page:
              <span className="text-center font-bold">
                {page} of {Math.ceil(data.totalCount / POSTS_PER_PAGE)}
              </span>
            </span>
          </div>
        </search>
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
