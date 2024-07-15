"use client"

import { useEffect, useRef } from "react"
import { type statsSelection } from "@/sanity/selections/home/stats"
import { type TypeFromSelection } from "groqd"
import { gsap } from "gsap"

import { Card, CardDescription, CardHeader, cn, Heading } from "@shared/ui"

import { StaggerHeader } from "../components/stagger-heading"
import { STANDARD_DELAY } from "../lib/constants"

interface Props {
  stats: TypeFromSelection<typeof statsSelection>["stats"]
}

const TIMELINE = {
  defaults: {
    ease: "power1.inOut",
  },
}

export function Stats({ stats }: Props) {
  const timeline = useRef<gsap.core.Timeline | null>(null)
  useEffect(() => {
    timeline.current = gsap.timeline(TIMELINE)
    return () => {
      timeline.current?.kill()
    }
  }, [])

  useEffect(() => {
    if (!timeline.current) return

    timeline.current.fromTo(
      ".stats-card",
      {
        opacity: 0,
        y: 40,
        scale: 0.9,
      },
      {
        opacity: 1,
        stagger: 0.2,
        y: -40,
        scale: 1,
        delay: STANDARD_DELAY,
        scrollTrigger: {
          trigger: "#stats-pile",
          start: "top 15%",
          end: "top 90%",
          scrub: 1,
          markers: false,
          once: true,
        },
        duration: 0.2,
      }
    )
    timeline.current.fromTo(
      "#stats-backgrounds",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        delay: STANDARD_DELAY,
        scrollTrigger: {
          trigger: "#stats-pile",
          start: "top 15%",
          end: "top 90%",
          scrub: 1,
          markers: false,
          once: true,
        },
        duration: 0.4,
      }
    )
  }, [])

  return (
    <div id="stats-pile" className="grid-pile lg:pt-[10rem]">
      <div id="stats-backgrounds" className="relative w-[100vw]">
        <img
          src="/gradients/2.webp"
          alt=""
          className="absolute top-0 -z-20 h-full w-full translate-x-[85%] rotate-[60deg] scale-[0.6] lg:translate-x-[55%]"
          loading="lazy"
        />
        <img
          src="/gradients/grid.png"
          alt=""
          className="absolute -z-30 h-full w-full -translate-x-[30%] -translate-y-[40%] rotate-90 scale-[0.5] object-contain lg:-translate-y-[15%]"
          loading="lazy"
        />
      </div>

      <article
        id="stats.wrapper"
        className="grid-pile grid-system relative col-span-12 h-auto w-lvw items-center justify-center overflow-x-hidden lg:h-full"
      >
        <div
          id="stats.content"
          className={cn(
            "max-width grid-system col-span-full sm:w-dvw",
            "md:col-span-full md:col-start-1 md:w-full",
            "lg:col-span-full lg:col-start-1",
            "xl:col-span-10 xl:col-start-2",
            "mt-header-top"
          )}
        >
          <StaggerHeader
            title={stats.title}
            className={cn(
              "px-gutter py-gutter text-5xl leading-[1.1] lg:pl-gutter lg:pr-gutter",
              "col-span-full md:col-span-3 md:text-7xl lg:col-start-2 xl:col-start-2",
              "!hyphens-none !break-normal"
            )}
            timeline={timeline}
            section="#stats-pile"
          />
          <div
            className={cn(
              "grid-system relative col-span-full mt-10 gap-card px-gutter lg:mt-0",
              "lg:col-span-8 lg:col-start-7",
              "xl:col-span-8 xl:col-start-7"
            )}
          >
            {stats.items.map((item, index) => (
              <Card
                key={index}
                className={cn(
                  "stats-card background-blur bg-grey-100/80 p-card",
                  "col-span-full col-start-1 md:col-span-2 lg:col-span-6"
                )}
                data-index={index}
              >
                <CardHeader className="grid w-5/6 gap-copy lg:w-full">
                  <Heading variant="h3" className="!hyphens-none !break-normal">
                    {item.heading}
                  </Heading>
                  <CardDescription>{item.body}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}
