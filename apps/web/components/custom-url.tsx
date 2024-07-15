import { Suspense } from "react"
import Link from "next/link"
import { type customUrlSelection } from "@/sanity/selections/custom-url"
import { type TypeFromSelection } from "groqd"

import { cn, Icon } from "@shared/ui"

interface Props {
  value?: TypeFromSelection<typeof customUrlSelection> | null
  children: React.ReactNode
  className?: string
  isWrapper?: boolean
  tabIndex?: number
  onClick?: () => void
}
export function CustomUrl({
  value,
  children,
  className,
  tabIndex,
  isWrapper = false,
  onClick,
}: Props) {
  return value ? (
    <Link
      tabIndex={tabIndex}
      href={value.external || `/${value.internal?.slug}` || ""}
      target={value.external ? "_blank" : "_self"}
      className={className}
      prefetch={!value.external}
      onClick={onClick}
    >
      {isWrapper ? (
        <Suspense fallback={null}>{children}</Suspense>
      ) : (
        <span className="inline-flex items-center gap-2">
          <span className="flex-1"> {children}</span>
          {value.external && (
            <Icon
              variant="arrowRightUp"
              className={cn(
                "size-4 shrink-0 fill-current lg:size-5",
                value.variant && value.variant === "primary" && "fill-white"
              )}
            />
          )}
        </span>
      )}
    </Link>
  ) : (
    children
  )
}
