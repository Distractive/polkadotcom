import { useEffect, useRef } from "react"
import { gsap } from "gsap"

import { cn } from "@shared/ui"

interface Props {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const TIMELINE = {
  defaults: {
    ease: "power1.inOut",
    duration: 0.16,
  },
}

const OFFSET = 5
const ROTATE = 45
const LINE_STYLES = "h-[2px] w-5 bg-black"

export function Burger({ isOpen, setIsOpen }: Props) {
  const timeline = useRef<GSAPTimeline>()
  const top = useRef<HTMLSpanElement>(null)
  const middle = useRef<HTMLSpanElement>(null)
  const bottom = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    timeline.current = gsap.timeline(TIMELINE)
    return () => {
      timeline.current?.kill()
    }
  }, [])

  useEffect(() => {
    if (!timeline.current) return

    if (isOpen) {
      timeline.current
        .clear()
        .to([top.current, bottom.current], { y: 0 })
        .set(middle.current, { opacity: 0 })
        .to(top.current, { rotate: ROTATE })
        .to(bottom.current, { rotate: -ROTATE }, "<")
    } else {
      timeline.current
        .clear()
        .to([top.current, bottom.current], { rotate: 0 })
        .set(middle.current, { opacity: 1 })
        .to(top.current, { y: -OFFSET })
        .to(bottom.current, { y: OFFSET }, "<")
    }
  }, [isOpen])

  return (
    <button
      aria-label="Toggle menu open/close"
      onClick={() => setIsOpen(!isOpen)}
      className={cn(
        "grid-pile h-full w-14 items-center justify-center lg:hidden",
        "rounded-full border border-grey-300 bg-white"
      )}
    >
      <span
        ref={top}
        className={LINE_STYLES}
        style={{ transform: `translateY(${-OFFSET}px)` }}
      ></span>
      <span ref={middle} className={LINE_STYLES}></span>
      <span
        ref={bottom}
        className={LINE_STYLES}
        style={{ transform: `translateY(${OFFSET}px)` }}
      ></span>
    </button>
  )
}
