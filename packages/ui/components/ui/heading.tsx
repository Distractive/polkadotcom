import { forwardRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const SIZES = {
  h1: "text-5xl md:text-7xl leading-snug",
  h2: "text-4xl md:text-5xl leading-snug",
  h3: "text-2xl md:text-3xl leading-snug",
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

export type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants>

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, variant = "h1", size, decoration, weight, ...props }, ref) => {
    const Element = getHeadingElement(variant) as JSX.Element["type"]

    return (
      <Element
        className={cn(
          headingVariants({ variant, size, decoration, weight, className })
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Heading.displayName = "Heading"

export { Heading, HeadingStyles, headingVariants }
