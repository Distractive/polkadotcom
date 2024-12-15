import type { ReactNode } from "react"
import { draftMode } from "next/headers"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getPost } from "@/sanity/queries/post"
import {
  getPostHeading,
  getPosts,
  type postSelection,
} from "@/sanity/queries/posts"
import generateBreadcrumbs from "@/utils/breadcrumbs/generateBreadcrumbs"
import { type TypeFromSelection } from "groqd"

import {
  BLOG_POSTTYPE,
  CASE_STUDY_POSTTYPE,
  PRESS_RELEASE_POSTTYPE,
} from "@/constants/global"
import { CarouselItem, cn, Heading } from "@shared/ui"

import { Carousel } from "../../components/carousel"
import { BreadcrumbBlock } from "../page/blocks/breadcrumb"
import type { BreadcrumbProps } from "../page/blocks/breadcrumb"
import { Body } from "./body"
import BlogCard from "./card"

interface LayoutProps {
  slug: string
  type:
    | typeof BLOG_POSTTYPE
    | typeof PRESS_RELEASE_POSTTYPE
    | typeof CASE_STUDY_POSTTYPE
}

export default async function Layout({ slug, type }: LayoutProps) {
  const isDraftMode = draftMode().isEnabled
  const post = await getPost(slug, isDraftMode)

  const allPosts = await getPosts(1, type, "", false, slug)
  const headingType = (() => {
    switch (type) {
      case BLOG_POSTTYPE:
        return "blog"
      case PRESS_RELEASE_POSTTYPE:
        return "press-releases"
      case CASE_STUDY_POSTTYPE:
        return "case-studies"
    }
  })()

  //
  const [postsData] = await getPostHeading(headingType)

  if (!post) {
    return notFound()
  }

  const breadcrumb: BreadcrumbProps = {
    items: (() => {
      switch (type) {
        case "Press Release":
          return [
            {
              slug: "/community/newsroom",
              title: "Newsroom",
            },
            {
              slug: "/newsroom/press-releases",
              title: "Press Releases",
            },
          ]
        case "Case Study":
          return [
            {
              slug: "/platform",
              title: "Platform",
            },
            {
              slug: "/case-studies",
              title: "Case Studies",
            },
          ]
        default:
          return [
            {
              slug: postsData?.parent?.slug ? `/${postsData.parent.slug}` : "",
              title: postsData?.parent?.header?.title,
            },
            {
              slug:
                postsData?.parent?.slug && postsData?.slug
                  ? `/${postsData.parent.slug}/${postsData.slug}`
                  : "",
              title: postsData?.heading,
            },
          ]
      }
    })(),
  }

  if (!post) {
    return notFound()
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
      <article className="max-width col-span-full mb-section mt-gutter px-gutter pt-header-top lg:w-2/3">
        <div className="mb-6">
          <BreadcrumbBlock items={breadcrumb.items} />
        </div>
        <Heading variant={"h1"} className="mb-6">
          {title}
        </Heading>
        <PostExcerpt>{custom_excerpt}</PostExcerpt>
        <PostMetaData>
          {tags && post_type && (
            <ul className="mb-6 flex flex-wrap gap-3">
              {tags.map((tag) => (
                <li
                  key={tag.slug}
                  className="mb-1 flex rounded bg-grey-200 px-3 py-1 text-left text-sm leading-relaxed text-black hover:bg-black hover:text-white"
                >
                  <a
                    className="relative z-20  "
                    href={
                      {
                        [BLOG_POSTTYPE]: `/blog/tag/${tag.slug}`,
                        [PRESS_RELEASE_POSTTYPE]: `/newsroom/press-releases/tag/${tag.slug}`,
                        [CASE_STUDY_POSTTYPE]: `/case-studies/tag/${tag.slug}`,
                      }[post_type] || "/"
                    }
                  >
                    {tag.name}
                  </a>
                </li>
              ))}
            </ul>
          )}

          <PostPublish>
            {author && (
              <>
                <img
                  className="h-6 w-6 rounded-full"
                  src={author.image.asset.url}
                  alt=""
                  loading="lazy"
                />
                <span>By {author.name}</span>
                <span>•</span>
                <span>
                  {published_date &&
                    published_date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                </span>
              </>
            )}
          </PostPublish>
        </PostMetaData>
        {image && (
          <PostImage>
            <Image
              src={image.asset.url || ""}
              width={image.asset.metadata.dimensions?.width}
              height={image.asset.metadata.dimensions?.height}
              alt=""
              loading="lazy"
              className="rounded-2xl"
            />
          </PostImage>
        )}
        <div className="mb-32">{body && <Body body={body} />}</div>
      </article>
      {post_type && allPosts && allPosts.posts.length > 0 && (
        <MorePost posts={allPosts.posts} post_type={post_type} />
      )}
    </>
  )
}

const PostPublish = ({ children }: { children: ReactNode }) => {
  return (
    <div
      id="main-content"
      className="mb-6 flex w-full items-center gap-2 md:mb-12"
    >
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
  const headingLabel = (() => {
    switch (post_type) {
      case BLOG_POSTTYPE:
        return "From the blog"
      case PRESS_RELEASE_POSTTYPE:
        return "More from newsroom"
      case CASE_STUDY_POSTTYPE:
        return "More case studies"
    }
  })()
  return (
    <div className="max-width col-span-full  px-gutter">
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
