import { forwardRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../../lib/utils"
import { ButtonStyle } from "./style"

const buttonVariants = cva(ButtonStyle.base, {
  variants: {
    variant: ButtonStyle.variants,
    size: ButtonStyle.sizes,
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
})

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button, ButtonStyle, buttonVariants }
