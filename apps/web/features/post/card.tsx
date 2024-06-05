import Link from "next/link"
import type { postSelection } from "@/sanity/queries/posts"
import type { TypeFromSelection } from "groqd"

import { Card, CardContent, CardDescription, CardHeader, cn } from "@shared/ui"

interface Props {
  post: TypeFromSelection<typeof postSelection>
  className?: string
}

export default function BlogCard({ post, className }: Props) {
  const { slug, image, body, tags, title } = post

  return (
    <Card
      key={slug}
      className={cn(
        "group relative h-full overflow-hidden rounded-2xl border border-grey-400 bg-white backdrop-blur-lg transition-shadow duration-500 ease-in-out md:cursor-pointer md:hover:shadow-card md:hover:backdrop-blur-0",
        slug &&
          "md:cursor-pointer md:hover:shadow-card md:hover:backdrop-blur-0",
        className
      )}
    >
      <Link href={`/blog/${post.slug}`}>
        {image && (
          <CardHeader className={cn("relative z-10 aspect-video")}>
            <img
              src={image.asset.url}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </CardHeader>
        )}
        <CardContent className={cn("grid w-full p-6 sm:p-12")}>
          {tags && (
            <ul className="mb-6 flex flex-wrap gap-3">
              {tags.map((tag) => (
                <li
                  key={tag.slug}
                  className="mb-1 flex rounded bg-grey-200 px-3 py-1 text-left text-sm leading-relaxed"
                >
                  {tag.name}
                </li>
              ))}
            </ul>
          )}

          {title && (
            <h4
              className={cn(
                "mb-1 line-clamp-2  text-lg font-bold transition-colors duration-500 ease-in-out",
                "md:group-hover:text-pink"
              )}
            >
              {title}
            </h4>
          )}
          {body && (
            <CardDescription className="line-clamp-3">
              {body[0]?.children
                .filter((child) => child._type === "span")
                .map((span) => span.text)
                .join("")}
            </CardDescription>
          )}
        </CardContent>
      </Link>
    </Card>
  )
}
