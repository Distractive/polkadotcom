import type { postSelection } from "@/sanity/queries/posts"
import type { TypeFromSelection } from "groqd"

import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui"

interface Props {
  posts: ReadonlyArray<TypeFromSelection<typeof postSelection>>
}

export function Grid({ posts }: Props) {
  return (
    <>
      <div className="grid-system col-span-12 !mx-0 !px-0">
        {posts.map((post) => (
          <Card
            key={post._id}
            className="shadow-small col-span-4 h-full w-full overflow-hidden rounded-md text-black shadow-black/20 outline-0 transition duration-200 ease-in-out"
          >
            <a href={`/blog/${post.slug}`}>
              <CardHeader>
                <div className="aspect-2 w-full">
                  <img
                    className="aspect-2 m-0 block w-full object-cover object-center"
                    src={post.image.asset.url}
                    width={post.image.asset.metadata.dimensions?.width}
                    height={post.image.asset.metadata.dimensions?.height}
                    alt=""
                    loading="lazy"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="font-display">{post.title}</CardTitle>
                <ul className="flex gap-3">
                  {post.tags.map((tag) => (
                    <li
                      key={tag.name}
                      className="flex items-center justify-center rounded bg-grey-200 px-3 py-1 text-sm leading-relaxed"
                    >
                      <a href={`/blog/tag/${tag.slug}`}>{tag.name}</a>
                    </li>
                  ))}
                </ul>

                <p className="line-clamp-4">
                  {post.custom_excerpt ||
                    post.body[0]?.children
                      .filter((child) => child._type === "span")
                      .map((span) => span.text)
                      .join("")}
                </p>
              </CardContent>
            </a>
          </Card>
        ))}
      </div>
    </>
  )
}
