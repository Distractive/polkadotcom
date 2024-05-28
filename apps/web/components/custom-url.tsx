import Link from "next/link"
import { type customUrlSelection } from "@/sanity/selections/custom-url"
import { type TypeFromSelection } from "groqd"

interface Props {
  value: TypeFromSelection<typeof customUrlSelection>
  children: React.ReactNode
  className?: string
}
export function CustomUrl({ value, children, className }: Props) {
  return (
    <Link
      href={value.external || value.internal?.slug || ""}
      target={value.external ? "_blank" : "_self"}
      className={className}
      prefetch={!value.external}
    >
      {children}
    </Link>
  )
}
