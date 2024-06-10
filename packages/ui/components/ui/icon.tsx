import { cva, type VariantProps } from "class-variance-authority"

import Icons from "../../icons/icons.svg"
import { cn } from "../../lib/utils"

const IconStyles = {
  base: cn("inline-flex size-6"),
  variants: {
    chevronLeft: "icon-chevron-left",
    chevronRight: "icon-chevron-right",
    chevronUp: "icon-chevron-up",
    chevronDown: "icon-chevron-down",
    arrowDown: "icon-arrow-down",
    arrowLeft: "icon-arrow-left",
    arrowRight: "icon-arrow-right",
    arrowUp: "icon-arrow-up",
    arrowRightUp: "icon-arrow-right-up",
    videoPlay: "icon-video-play",
    menu: "icon-menu",
    close: "icon-close",
    magnify: "icon-magnify",
  },
}

const iconVariants = cva(IconStyles.base, {
  variants: { variant: IconStyles.variants },
})

export type IconProps = React.HTMLAttributes<SVGElement> &
  VariantProps<typeof iconVariants>

const Icon: React.FC<IconProps> = ({ className, variant }) => {
  if (!variant) return

  return (
    <svg className={cn(iconVariants({ className }))}>
      <use
        xlinkHref={`${typeof Icons == "object" ? Icons.src : Icons}#${IconStyles.variants[variant]}`}
        className={cn(iconVariants({ className }))}
      />
    </svg>
  )
}

Icon.displayName = "Icon"

export { Icon, IconStyles, iconVariants }
