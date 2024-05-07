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
          <PaginationPrevious href="#" />
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
          <PaginationNext href={`/${type}/page/${page}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
