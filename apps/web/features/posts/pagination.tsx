import { cn } from "@shared/ui/lib/utils"

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
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={
              page > 1
                ? tagSlug === undefined
                  ? `/${type}/page/${page - 1}`
                  : `/${type}/tag/${tagSlug}/page/${page - 1}`
                : undefined
            }
            className={cn(page === 1 && "pointer-events-none")}
          />
        </PaginationItem>
        {Array.from({ length: pages }, (_, i) => {
          const currentPage = i + 1
          return (
            <PaginationItem key={i}>
              <PaginationLink
                href={
                  tagSlug === undefined
                    ? `/${type}/page/${currentPage}`
                    : `/${type}/tag/${tagSlug}/page/${currentPage}`
                }
                isActive={currentPage == page}
              >
                {currentPage}
              </PaginationLink>
            </PaginationItem>
          )
        })}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={
              page < pages
                ? tagSlug === undefined
                  ? `/${type}/page/${Number(page) + 1}`
                  : `/${type}/tag/${tagSlug}/page/${Number(page) + 1}`
                : undefined
            }
            className={cn(page === pages && "pointer-events-none")}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
