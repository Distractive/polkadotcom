import { forwardRef } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const ButtonStyles = {
  base: cn(
    "inline-flex items-center justify-center gap-2 uppercase font-display relative overflow-hidden content-none outline-none",
    "before:absolute before:inset-0 before:-z-20",
    "after:absolute after:inset-0 after:-z-10 after:-translate-x-full after:transition-transform after:ease-in-out after:duration-500",
    "md:hover:after:translate-x-0 md:focus-within:after:translate-x-0 ",
    "z-10"
  ),
  variants: {
    primary: "text-white before:bg-blue after:bg-pink",
    secondary:
      "text-black before:bg-grey-200 before:opacity-60 before:backdrop-blur-lg after:bg-grey-300 border-[1px] border-grey-300",
    disabled:
      "bg-grey-200 text-grey-300 pointer-events-none border-[1px] border-grey-200",
  },
  sizes: {
    lg: "rounded-xl px-14 py-[1.095rem] text-sm max-w-[24.375rem]",
    md: "rounded-lg px-10 py-4 text-xs max-w-[20rem]",
    sm: "rounded-md px-4 py-2 text-xs max-w-[15rem]",
  },
}

const buttonVariants = cva(ButtonStyles.base, {
  variants: { variant: ButtonStyles.variants, size: ButtonStyles.sizes },
  defaultVariants: { variant: "primary", size: "md" },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        disabled={variant == "disabled"}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button, ButtonStyles, buttonVariants }
