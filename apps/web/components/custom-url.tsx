import Link from "next/link"
import { type customUrlSelection } from "@/sanity/selections/custom-url"
import { type TypeFromSelection } from "groqd"

import { cn, Icon } from "@shared/ui"

interface Props {
  value?: TypeFromSelection<typeof customUrlSelection> | null
  children: React.ReactNode
  className?: string
  isWrapper?: boolean
  onClick?: () => void
}
export function CustomUrl({
  value,
  children,
  className,
  isWrapper = false,
  onClick,
}: Props) {
  return value ? (
    <Link
      href={value.external || value.internal?.slug || ""}
      target={value.external ? "_blank" : "_self"}
      className={className}
      prefetch={!value.external}
      onClick={onClick}
    >
      {isWrapper ? (
        children
      ) : (
        <span className="flex items-center gap-2">
          {children}
          {value.external && (
            <Icon
              variant="arrowRightUp"
              className={cn(
                "w-4 fill-current lg:w-5",
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
