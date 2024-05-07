import type { postSelection } from "@/sanity/queries/posts"
import type { TypeFromSelection } from "groqd"

import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui"

interface Props {
  posts: ReadonlyArray<TypeFromSelection<typeof postSelection>>
}

export function Grid({ posts }: Props) {
  return (
    <>
      <div className="grid auto-rows-fr grid-cols-1 gap-6 overflow-hidden md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card
            key={post._id}
            className="shadow-small h-full w-full overflow-hidden rounded-md text-black shadow-black/20 outline-0 transition duration-200 ease-in-out"
          >
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
              <a
                href={`/blog/tag/${post.tags[0]?.slug}`}
                className="mt-4 text-red-800"
              >
                {post.tags[0]?.name}
              </a>
              <p className="line-clamp-4">{post.custom_excerpt}</p>
              <a href={`/blog/${post.slug}`} className="mt-4 text-red-800">
                Read more
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
