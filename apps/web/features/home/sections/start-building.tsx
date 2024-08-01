"use client"

import { useEffect, useRef } from "react"
import { type buildSelection } from "@/sanity/selections/home/build"
import { type TypeFromSelection } from "groqd"
import gsap from "gsap"

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  cn,
  Heading,
  Icon,
} from "@shared/ui"
import { CustomUrl } from "@/components/custom-url"

import { StaggerHeader } from "../components/stagger-heading"
import { STANDARD_DELAY } from "../lib/constants"

interface Props {
  build: TypeFromSelection<typeof buildSelection>["build"]
}
const TIMELINE = {
  defaults: {
    ease: "power1.inOut",
  },
}
export function Build({ build }: Props) {
  const timeline = useRef<gsap.core.Timeline | null>(null)
  const container = useRef<HTMLDivElement>(null)
  useEffect(() => {
    timeline.current = gsap.timeline({
      ...TIMELINE,
    })
    return () => {
      timeline.current?.kill()
    }
  }, [])

  useEffect(() => {
    if (!timeline.current) return
    timeline.current
      .fromTo(
        "#building-body",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          delay: STANDARD_DELAY,
          scrollTrigger: {
            trigger: "#building-pile",
            start: "top 50%",
            end: "top 90%",
            scrub: 1,
            markers: false,
            once: true,
          },
          duration: 0.2,
        }
      )
      .fromTo(
        ".build-card",
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
            trigger: "#building-pile",
            start: "top 50%",
            end: "top 90%",
            scrub: 1,
            markers: false,
            once: true,
          },

          duration: 0.2,
        }
      )

    // timeline.current.fromTo(
    //   "#network-backgrounds",
    //   {
    //     opacity: 0,
    //   },
    //   {
    //     opacity: 1,
    //     delay: STANDARD_DELAY,
    //     scrollTrigger: {
    //       trigger: "#network-pile",
    //       start: "top top",
    //       end: "bottom bottom",
    //       scrub: 1,
    //       markers: false,
    //       once: true,
    //     },
    //     duration: 0.4,
    //   }
    // )
  }, [])
  return (
    <div
      ref={container}
      id="building-pile"
      className="grid-pile relative md:pt-[10rem]"
    >
      <article
        id="build.wrapper"
        className="grid-system relative col-span-full h-full w-lvw items-center justify-center overflow-hidden lg:h-full"
      >
        <div
          id="build.content"
          className={cn(
            "max-width col-span-full flex flex-col items-center justify-center sm:w-dvw",
            "md:col-span-full md:col-start-1 md:w-full",
            "lg:col-span-full lg:col-start-1",
            "xl:col-span-10 xl:col-start-2",
            "mt-header-top md:mt-0"
          )}
        >
          <div className="col-span-full px-gutter pb-[5rem] lg:col-span-8 lg:col-start-3 lg:w-4/6 lg:pb-[5rem]">
            <StaggerHeader
              timeline={timeline}
              section="#building-pile"
              title={build.title}
              className="pb-card text-5xl leading-[1.1] md:text-7xl"
            />

            <p id="building-body" className="mb-gutter text-lg">
              {build.body}
            </p>
          </div>
          <div className="grid-system relative col-span-full gap-card px-card lg:px-gutter">
            {build.items.map((item, index) => (
              <Card
                key={index}
                className={cn(
                  "build-card background-blur col-span-6 flex items-start justify-between bg-white/80 md:col-span-4 md:col-start-2 lg:col-span-4",
                  item.link &&
                    "focus-within:shadow-card focus-within:backdrop-blur-0 md:cursor-pointer md:hover:shadow-card",
                  "!h-auto"
                )}
              >
                <CustomUrl value={item.link} isWrapper className="size-full">
                  <div
                    className={cn("flex h-full items-center gap-card p-card")}
                  >
                    <CardHeader className="grid h-full items-center">
                      {item.heading && (
                        <Heading
                          variant="h3"
                          className={cn(
                            "text-balance text-xl leading-normal transition-colors duration-500 ease-in-out md:text-2xl",
                            item.link &&
                              "group-focus-within:text-pink md:group-hover:text-pink",
                            "!hyphens-none !break-normal"
                          )}
                        >
                          {item.heading}
                        </Heading>
                      )}
                      {item.body && (
                        <CardDescription>{item.body}</CardDescription>
                      )}
                    </CardHeader>
                    {item.link && (
                      <CardFooter className="ml-auto flex h-full flex-col justify-center">
                        {item.link.external ? (
                          <Icon variant="arrowRightUp" />
                        ) : (
                          <Icon variant="arrowRight" />
                        )}
                      </CardFooter>
                    )}
                  </div>
                </CustomUrl>
              </Card>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}
