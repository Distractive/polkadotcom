import { useEffect, useRef, useState, type MutableRefObject } from "react"
import { stegaClean } from "@sanity/client/stega"
import { gsap } from "gsap"
import { SplitText } from "gsap/all"

import { Heading } from "@shared/ui"

interface Props {
  title: string
  className?: string
  timeline: MutableRefObject<gsap.core.Timeline | null>
  section: string
}

export function StaggerHeader({ title, className }: Props) {
  const heading = useRef<HTMLHeadingElement>(null)
  const [, setLines] = useState<Element[]>([])
  useEffect(() => {
    gsap.registerPlugin(SplitText)
    const split = new SplitText(heading.current, {
      type: "lines",
      linesClass: "line",
    })

    setLines(split.lines)

    return () => {
      split.revert()
    }
  }, [])

  return (
    <>
      <Heading
        variant="h2"
        className={className}
        ref={heading}
        aria-label={title}
        role="heading"
      >
        {stegaClean(title)}
      </Heading>
    </>
  )
}
