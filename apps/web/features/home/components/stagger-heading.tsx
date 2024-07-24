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

export function StaggerHeader({ title, className, timeline, section }: Props) {
  const heading = useRef<HTMLHeadingElement>(null)
  const [lines, setLines] = useState<Element[]>([])
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

  // useEffect(() => {
  //   if (!timeline || !timeline.current) return

  //   timeline.current.fromTo(
  //     lines,
  //     {
  //       opacity: 0,
  //       filter: "blur(5px)",
  //       y: 15,
  //     },
  //     {
  //       ease: "power1.inOut",
  //       opacity: 1,
  //       stagger: 0.05,
  //       y: 0,
  //       filter: "blur(0px)",
  //       duration: 0.4,
  //       scrollTrigger: {
  //         trigger: section,
  //         start: "top 50%",
  //         end: "top 90%",
  //         scrub: 1,
  //         once: true,
  //       },
  //     }
  //   )
  // }, [lines])

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
