import { cn } from "@shared/ui"

interface Props {
  isVisible: boolean | null | string
}

export function Overlay({ isVisible }: Props) {
  return (
    <>
      <div
        className={cn(
          "transition-visibility fixed inset-0 z-20 bg-grey-200 duration-500 ease-in-out",
          isVisible
            ? "pointer-events-auto visible opacity-60"
            : "pointer-events-auto invisible opacity-0"
        )}
      ></div>
      <div
        className={cn(
          "transition-visibility fixed inset-0 z-20 backdrop-blur-sm duration-500 ease-in-out",
          isVisible
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-auto invisible opacity-0"
        )}
      ></div>
    </>
  )
}
