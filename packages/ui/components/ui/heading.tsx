import { forwardRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const HeadingStyles = {
  base: "font-light font-display",
  variants: {
    h1: "text-6xl md:text-7xl leading-snug",
    h2: "text-4xl md:text-5xl leading-snug",
    h3: "text-2xl md:text-3xl leading-snug",
    h4: "text-xl md:text-2xl leading-normal",
  },
}
const headingVariants = cva(HeadingStyles.base, {
  variants: { variant: HeadingStyles.variants },
  defaultVariants: { variant: "h1" },
})

const getHeadingElement = (variant: string | null | undefined) => {
  if (variant && Object.keys(HeadingStyles.variants).includes(variant)) {
    return variant
  }
  return null
}

export type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants>

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, variant, ...props }, ref) => {
    const Element = getHeadingElement(variant) as JSX.Element["type"]

    return (
      <Element
        className={cn(headingVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Heading.displayName = "Heading"

export { Heading, HeadingStyles, headingVariants }
