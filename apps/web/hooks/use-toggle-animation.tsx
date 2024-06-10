import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface Props {
  isVisible: boolean
  display?: "grid" | "flex" | "block"
  initial?: gsap.TweenVars
  enter?: gsap.TweenVars
}

export const TIMELINE = {
  defaults: {
    ease: "power1.inOut",
    duration: 0.5,
  },
}

export const useToggleAnimation = ({
  display = "grid",
  isVisible,
  initial = { opacity: 0 },
  enter = { opacity: 1 },
}: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const timeline = useRef<GSAPTimeline>()

  useEffect(() => {
    timeline.current = gsap.timeline(TIMELINE)
    return () => {
      timeline.current?.kill()
    }
  }, [])

  useEffect(() => {
    if (!(timeline.current && ref.current)) return

    if (isVisible) {
      timeline.current
        .clear()
        .set(ref.current, { display })
        .to(ref.current, { ...enter })
    } else {
      timeline.current
        .clear()
        .to(ref.current, { ...initial })
        .set(ref.current, { display: "none" })
    }
  }, [display, enter, initial, isVisible, ref])

  return { ref }
}
