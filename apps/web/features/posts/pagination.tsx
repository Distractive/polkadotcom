import generatePagination from "@/utils/pagination/generatePagination"
import { cn } from "@shared/ui/lib/utils"

import { BLOG_POSTTYPE } from "@/constants/global"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@shared/ui"

interface Props {
  page: number
  total: number
  limit: number
  type: string
  tagSlug?: string
}

export function PostPagination({ total, page, limit, type, tagSlug }: Props) {
  const pages = Math.ceil(total / limit)
  let paginationArray: Array<number | string> = []
  const postPath = type == BLOG_POSTTYPE ? "/blog" : "/newsroom/press-releases"

  paginationArray = generatePagination(page, pages)

  return (
    // <Pagination className="w-full border-t border-t-grey-200 pt-1">
    <Pagination className="relative w-full pt-1 after:absolute after:-top-[3px] after:z-0 after:h-[2px] after:w-full after:bg-grey-200">
      <PaginationContent className="w-full">
        <PaginationItem className="justify-start">
          <PaginationPrevious
            href={
              page > 1
                ? tagSlug === undefined
                  ? `${postPath}/page/${page - 1}`
                  : `${postPath}/tag/${tagSlug}/page/${page - 1}`
                : undefined
            }
            className={cn(page === 1 && "pointer-events-none")}
          />
        </PaginationItem>

        {paginationArray.map((pa, i) => {
          const currentPage = pa
          return (
            <PaginationItem
              key={i}
              className={cn("relative m-0 justify-center px-2 py-0")}
            >
              {pa !== -1 && (
                <PaginationLink
                  href={
                    tagSlug === undefined
                      ? `${postPath}/page/${currentPage}`
                      : `${postPath}/tag/${tagSlug}/page/${currentPage}`
                  }
                  isActive={currentPage == page}
                  className={cn(
                    "font-normal",
                    "after:absolute after:-top-2 after:left-0 after:z-10 after:h-[2px] after:w-full after:transition-all after:duration-200"
                  )}
                >
                  {currentPage}
                </PaginationLink>
              )}
              {pa === -1 && <PaginationEllipsis />}
            </PaginationItem>
          )
        })}

        <PaginationItem className="justify-end">
          <PaginationNext
            href={
              page < pages
                ? tagSlug === undefined
                  ? `${postPath}/page/${Number(page) + 1}`
                  : `${postPath}/tag/${tagSlug}/page/${Number(page) + 1}`
                : undefined
            }
            className={cn(page === pages && "pointer-events-none")}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
