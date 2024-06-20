import { cn } from "@shared/ui"

interface Props {
  className?: string
}

export function ActiveMarker({ className }: Props) {
  return (
    <svg
      width="9"
      height="5"
      viewBox="0 0 9 5"
      className={cn(
        "h-auto w-2 transition-opacity duration-500 ease-in-out",
        className
      )}
    >
      <path
        className="fill-black"
        d="M4.3 4.6c-2.2 0-4-1.1-4-2.4C.3 1 2.2 0 4.3 0c2.3 0 4 1 4 2.3 0 1.3-1.8 2.3-4 2.3Z"
      />
    </svg>
  )
}
