import { cn } from "@shared/ui"

interface Props {
  className?: string
  children?: React.ReactNode
  forButtonBlock?: boolean
}

export function DecorativeLine({
  className,
  children,
  forButtonBlock = false,
}: Props) {
  return (
    <div
      className={cn(
        "relative col-span-full inline-flex items-center justify-center pt-gutter",
        className
      )}
    >
      <hr
        className={cn(
          "w-full border-grey-300",
          forButtonBlock && "sm:hidden md:block"
        )}
      />
      <div
        className={cn(
          "absolute bg-white",
          forButtonBlock
            ? "flex w-full justify-center px-gutter md:w-auto"
            : "px-6"
        )}
      >
        {children}
      </div>
    </div>
  )
}
