import { useLayoutEffect, useRef, useState } from "react"
import * as Scrollytelling from "@bsmnt/scrollytelling"
import { stegaClean } from "@sanity/client/stega"
import { gsap } from "gsap"
import { SplitText } from "gsap/all"

import { Heading } from "@shared/ui"

interface Props {
  title: string
  className?: string
}

export function StaggerHeader({ title, className }: Props) {
  const heading = useRef<HTMLHeadingElement>(null)
  const [lines, setLines] = useState<Element[]>([])

  useLayoutEffect(() => {
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
      <Scrollytelling.Stagger
        overlap={0}
        tween={{
          target: lines,
          start: 5,
          end: 40,
          fromTo: [
            {
              opacity: 0,
              filter: "blur(5px)",
              y: 15,
            },
            {
              ease: "power1.inOut",
              opacity: 1,
              stagger: 0.2,
              y: 0,
              filter: "blur(0px)",
            },
          ],
        }}
      />
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
