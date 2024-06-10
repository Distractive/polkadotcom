import type { postSelection } from "@/sanity/queries/posts"
import type { TypeFromSelection } from "groqd"

import BlogCard from "../post/card"

interface Props {
  posts: ReadonlyArray<TypeFromSelection<typeof postSelection>>
}

export function Grid({ posts }: Props) {
  return (
    <div className="grid-system col-span-12">
      {posts.map((post) => {
        return (
          <div
            key={post._id}
            className="col-span-12 mb-12 md:col-span-3 lg:col-span-4"
          >
            <BlogCard post={post} />
          </div>
        )
      })}
    </div>
  )
}
