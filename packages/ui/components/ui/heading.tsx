import { forwardRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const SIZES = {
  display: "text-9xl md:text-10xl leading-snug heading-break",
  h1: "text-7xl md:text-8xl leading-snug heading-break",
  h2: "text-5xl md:text-6xl leading-snug heading-break",
  h3: "text-3xl md:text-5xl leading-snug heading-break",
  h4: "text-xl md:text-2xl leading-normal",
  h5: "text-sm md:text-base font-default",
}

const HeadingStyles = {
  base: "font-display",
  variants: { ...SIZES },
  sizes: { ...SIZES },
  decoration: {
    uppercase: "uppercase",
  },
  weight: {
    light: "font-light",
    normal: "font-normal",
    bold: "font-bold",
  },
}
const headingVariants = cva(HeadingStyles.base, {
  variants: {
    variant: HeadingStyles.variants,
    size: HeadingStyles.sizes,
    decoration: HeadingStyles.decoration,
    weight: HeadingStyles.weight,
  },
  defaultVariants: { variant: "h1" },
})

const getHeadingElement = (variant: string | null | undefined) => {
  if (variant && Object.keys(HeadingStyles.variants).includes(variant)) {
    return variant
  }
  return null
}

const generateAnchorLinkId = (header: string | Array<string>) => {
  if (Array.isArray(header)) header = header.join(" ") // check for portable text array
  if (typeof header !== "string") return ""

  return header
    .toLowerCase()
    .replace(/[’'''"″""]/g, "")
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

export type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants>

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    { className, variant = "h1", size, decoration, weight, children, ...props },
    ref
  ) => {
    const Element = getHeadingElement(variant) as JSX.Element["type"]

    const anchorLink = generateAnchorLinkId(children as string)

    return (
      <>
        <div id={anchorLink} className="anchor-link -translate-y-24"></div>

        <Element
          className={cn(
            headingVariants({ variant, size, decoration, weight, className })
          )}
          ref={ref}
          {...props}
        >
          {children}
        </Element>
      </>
    )
  }
)

Heading.displayName = "Heading"

export { Heading, HeadingStyles, headingVariants }
