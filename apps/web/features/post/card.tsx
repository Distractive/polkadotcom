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
      <CardContent className="grid w-full p-gutter">
        {tags && (
          <ul className="mb-6 flex flex-wrap gap-3">
            {tags.map((tag) => (
              <li
                key={tag.slug}
                className="mb-1 flex rounded bg-grey-200 px-3 py-1 text-left text-sm leading-relaxed"
              >
                <a className="relative z-20" href={`/blog/tag/${tag.slug}`}>
                  {tag.name}
                </a>
              </li>
            ))}
          </ul>
        )}

        {title && (
          <h4
            className={cn(
              "mb-1 text-lg font-bold transition-colors duration-500 ease-in-out",
              "md:group-hover:text-pink"
            )}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="after:absolute after:inset-0 after:z-10 after:cursor-pointer"
            >
              {title}
            </Link>
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
    </Card>
  )
}
