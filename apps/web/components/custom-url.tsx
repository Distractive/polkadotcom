import Link from "next/link"
import { type customUrlSelection } from "@/sanity/selections/custom-url"
import { type TypeFromSelection } from "groqd"

import { cn, Icon } from "@shared/ui"

interface Props {
  value?: TypeFromSelection<typeof customUrlSelection> | null
  children: React.ReactNode
  className?: string
  isWrapper?: boolean
}
export function CustomUrl({
  value,
  children,
  className,
  isWrapper = false,
}: Props) {
  return value ? (
    <Link
      href={value.external || value.internal?.slug || ""}
      target={value.external ? "_blank" : "_self"}
      className={className}
      prefetch={!value.external}
    >
      {isWrapper ? (
        children
      ) : (
        <span className="flex flex-row items-center">
          {children}
          {value.external && (
            <Icon
              variant="arrowRightUp"
              className={cn(
                value.variant &&
                  value.variant === "primary" &&
                  "ml-2 fill-white"
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
