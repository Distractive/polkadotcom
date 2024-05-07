import { getPost } from "@/sanity/queries/post"

import { Body } from "./body"

interface LayoutProps {
  slug: string
}

export default async function Layout({ slug }: LayoutProps) {
  const post = await getPost(slug)

  return (
    <article>
      <h1 className="font-display text-3xl">{post.title}</h1>
      <div>
        {post.published_date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        {post.tags.map((tag) => (
          <a
            key={tag.slug}
            href={`/blog/tag/${tag.slug}`}
            className="text-red-800"
          >
            {tag.name}
          </a>
        ))}
        {/* TODO: Split into component */}
        <div>
          <img
            className="h-10 w-10 rounded-full"
            src={post.author.image.asset.url}
            alt=""
            loading="lazy"
          />
          <span>By {post.author.name}</span>
        </div>
      </div>
      <img
        className="aspect-2 m-0 block w-full object-cover object-center"
        src={post.image.asset.url}
        width={post.image.asset.metadata.dimensions?.width}
        height={post.image.asset.metadata.dimensions?.height}
        alt=""
        loading="lazy"
      />
      <Body body={post.body} />
    </article>
  )
}
