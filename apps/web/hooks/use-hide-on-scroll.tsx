import { useCallback, useEffect, useRef } from "react"
import { gsap } from "gsap"

import { useBreakpoint } from "./use-breakpoint"

export const TIMELINE = {
  defaults: {
    ease: "power1.inOut",
    duration: 0.5,
  },
}

export const useHideOnScroll = () => {
  const isMobile = useBreakpoint("--screen-lg")
  const ref = useRef<HTMLDivElement>(null)
  const timeline = useRef<GSAPTimeline>()
  const lastScrollY = useRef<number>(0)

  const handleScroll = useCallback(() => {
    if (!timeline.current) return

    const scrollY = window.scrollY

    if (scrollY > lastScrollY.current) {
      timeline.current
        .clear()
        .to(ref.current, { autoAlpha: 0, pointerEvents: "none" })
    } else if (scrollY < lastScrollY.current) {
      timeline.current
        .clear()
        .to(ref.current, { autoAlpha: 1, pointerEvents: "auto" })
    }

    lastScrollY.current = scrollY <= 0 ? 0 : scrollY
  }, [timeline, ref, lastScrollY])

  useEffect(() => {
    if (isMobile) return
    timeline.current = gsap.timeline(TIMELINE)
    return () => {
      timeline.current?.kill()
    }
  }, [isMobile])

  useEffect(() => {
    if (isMobile) return
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll, isMobile])

  return { ref }
}
