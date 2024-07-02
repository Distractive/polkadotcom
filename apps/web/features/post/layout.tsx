import type { ReactNode } from "react"
import { getPost } from "@/sanity/queries/post"
import {
  getPostHeading,
  getPosts,
  type postSelection,
} from "@/sanity/queries/posts"
import { type TypeFromSelection } from "groqd"

import { BLOG_POSTTYPE, type PRESS_RELEASE_POSTTYPE } from "@/constants/global"
import { CarouselItem, cn, Heading } from "@shared/ui"

import { Carousel } from "../../components/carousel"
import { BreadcrumbBlock } from "../page/blocks/breadcrumb"
import type { BreadcrumbProps } from "../page/blocks/breadcrumb"
import { Body } from "./body"
import BlogCard from "./card"

interface LayoutProps {
  slug: string
  type: typeof BLOG_POSTTYPE | typeof PRESS_RELEASE_POSTTYPE
}

export default async function Layout({ slug, type }: LayoutProps) {
  const post = await getPost(slug)
  const allPosts = await getPosts(1, type, "", slug)
  const headingType = type == BLOG_POSTTYPE ? "blog" : "press-releases"
  const postsData = await getPostHeading(headingType)

  const breadcrumb: BreadcrumbProps = {
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

  const {
    title,
    custom_excerpt,
    author,
    published_date,
    image,
    body,
    tags,
    post_type,
  } = post

  return (
    <>
      <article className="max-width col-span-full mt-gutter px-6 pt-header-top">
        <div className="mb-6">
          <BreadcrumbBlock items={breadcrumb.items} />
        </div>
        <Heading variant={"h1"} className="mb-6">
          {title}
        </Heading>
        <PostExcerpt>{custom_excerpt}</PostExcerpt>
        <PostMetaData>
          {tags && (
            <ul className="mb-6 flex flex-wrap gap-3">
              {tags.map((tag) => (
                <li
                  key={tag.slug}
                  className="mb-1 flex rounded bg-grey-200 px-3 py-1 text-left text-sm leading-relaxed"
                >
                  <a
                    className="relative z-20"
                    href={
                      post_type == BLOG_POSTTYPE
                        ? `/blog/tag/${tag.slug}`
                        : `/newsroom/press-releases/tag/${tag.slug}`
                    }
                  >
                    {tag.name}
                  </a>
                </li>
              ))}
            </ul>
          )}

          <PostPublish>
            <img
              className="h-6 w-6 rounded-full"
              src={author.image.asset.url}
              alt=""
              loading="lazy"
            />
            <span>By {author.name}</span>
            <span>•</span>
            <span>
              {published_date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </PostPublish>
        </PostMetaData>
        {image && (
          <PostImage>
            <img
              src={image.asset.url}
              width={image.asset.metadata.dimensions?.width}
              height={image.asset.metadata.dimensions?.height}
              alt=""
              loading="lazy"
              className="rounded-2xl"
            />
          </PostImage>
        )}
        <Body body={body} />
      </article>
      <MorePost posts={allPosts.posts} post_type={post_type} />
    </>
  )
}

const PostPublish = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mb-6 flex w-full items-center gap-2 md:mb-12">
      {children}
    </div>
  )
}

const PostExcerpt = ({ children }: { children: ReactNode }) => {
  return <p className="mb-6 text-lg">{children}</p>
}

const PostMetaData = ({ children }: { children: ReactNode }) => {
  return <div className="grid w-full ">{children}</div>
}

const PostImage = ({ children }: { children: ReactNode }) => {
  return (
    <div className="aspect-2 m-0 mb-12 block w-full rounded-2xl object-cover object-center">
      {children}
    </div>
  )
}

const MorePost = ({
  posts,
  post_type,
}: {
  posts: Array<TypeFromSelection<typeof postSelection>>
  post_type: string
}) => {
  const headingLabel =
    post_type == BLOG_POSTTYPE ? "From the blog" : "More from newsroom"
  return (
    <div className="max-width col-span-full mb-12 px-gutter">
      <div className={cn("col-span-full mb-12")}>
        <div className="flex flex-col gap-copy lg:w-5/6">
          <Heading variant="h2">{headingLabel}</Heading>
        </div>
      </div>
      <Carousel>
        {posts.map((post) => {
          return (
            <CarouselItem
              key={String(post._id)}
              className="basis-5/6 md:basis-1/2 lg:basis-1/3"
            >
              <BlogCard key={String(post._id)} post={post} className="h-full" />
            </CarouselItem>
          )
        })}
      </Carousel>
    </div>
  )
}
