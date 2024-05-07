import { getPost } from "@/sanity/queries/post"
import { PortableText } from "@portabletext/react"

interface LayoutProps {
  slug: string
}

export default async function Layout({ slug }: LayoutProps) {
  const post = await getPost(slug)

  return (
    <article>
      <h1 className="text-3xl">{post.title}</h1>
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
      <PortableText
        value={post.body}
        components={{
          block: {
            h2: ({ children }) => <h1 className="text-2xl">{children}</h1>,
          },
          list: {
            bullet: ({ children }) => (
              <ul className="mt-xl list-disc">{children}</ul>
            ),
            number: ({ children }) => <ol className="mt-lg">{children}</ol>,
          },
          listItem: {
            bullet: ({ children }) => <li>{children}</li>,
          },
          types: {
            image: ({ value }) => {
              return (
                <img
                  className="aspect-2 m-0 block w-full object-cover object-center"
                  src={value.asset.url}
                  // width={value.asset.metadata.dimensions?.width}
                  // height={value.asset.metadata.dimensions?.height}
                  alt=""
                  loading="lazy"
                />
              )
            },
          },
        }}
      />
    </article>
  )
}
