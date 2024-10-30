import { blogSelection } from "@/sanity/selections/blog/blog"
import type { TypeFromSelection } from "groqd"

import { BreadcrumbProps } from "@/features/page/blocks/breadcrumb"

type PostData = TypeFromSelection<typeof blogSelection>

export default function generateBreadcrumbs(
  type: string,
  postsData: PostData | undefined
): BreadcrumbProps {
  let breadcrumb

  if (type === "Press Release") {
    breadcrumb = {
      items: [
        {
          slug: "/community/newsroom",
          title: "Newsroom",
        },
        {
          slug: "/newsroom/press-releases",
          title: "Press Releases",
        },
      ],
    }
  } else if (type === "Case Study") {
    breadcrumb = {
      items: [
        {
          slug: `/${postsData?.parent?.slug}` ?? "",
          title: postsData?.parent?.header?.title,
        },
        {
          slug: "/case-studies",
          title: "Case Studies",
        },
      ],
    }
  } else {
    breadcrumb = {
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
  }

  return breadcrumb
}
