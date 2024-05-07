import { getPosts } from "@/sanity/queries/posts"

import { POSTS_PER_PAGE } from "@/constants/global"

import { Grid } from "./grid"
import { PostPagination } from "./pagination"

interface LayoutProps {
  page: number
  type: "blog" | "press-release"
  tagSlug: string
}

export default async function Layout({ page, tagSlug, type }: LayoutProps) {
  const data = await getPosts(page, "Blog", tagSlug)

  return (
    <>
      <h1 className="font-display text-3xl">Blog</h1>
      <section className="pt-18 pb-18 mx-auto max-w-7xl px-6 md:pb-24 md:pt-24 lg:px-8">
        <span>
          Page {page} of {Math.ceil(data.totalCount / POSTS_PER_PAGE)}
        </span>
        <Grid posts={data.posts} />
      </section>
      <PostPagination
        total={data.totalCount}
        limit={POSTS_PER_PAGE}
        page={page}
        type={type}
        tagSlug={tagSlug != "" ? tagSlug : undefined}
      />
    </>
  )
}
