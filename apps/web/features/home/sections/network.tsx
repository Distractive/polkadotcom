"use client"

import { useEffect, useRef } from "react"
import { type networkSelection } from "@/sanity/selections/home/network"
import { type TypeFromSelection } from "groqd"
import { gsap } from "gsap"

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
  network: TypeFromSelection<typeof networkSelection>["network"]
}

const TIMELINE = {
  defaults: {
    ease: "power1.inOut",
  },
}

export function Network({ network }: Props) {
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
        "#network-body",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          delay: STANDARD_DELAY,
          scrollTrigger: {
            trigger: "#network-pile",
            start: "top 15%",
            end: "top 90%",
            scrub: 1,
            markers: false,
            once: true,
          },
          duration: 0.2,
        }
      )
      .fromTo(
        ".network-card",
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
          delay: STANDARD_DELAY * 2,
          scrollTrigger: {
            trigger: "#network-pile",
            start: "top 15%",
            end: "top 90%",
            scrub: 1.5,
            markers: false,
            once: true,
          },
          duration: 0.2,
        }
      )

    timeline.current.fromTo(
      "#network-backgrounds",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        delay: STANDARD_DELAY,
        scrollTrigger: {
          trigger: "#network-pile",
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
    <div ref={container} id="network-pile" className="grid-pile md:pt-[10rem]">
      <div id="network-backgrounds" className="relative top-0 w-[100vw]">
        <img
          src="/gradients/4.webp"
          alt=""
          className="absolute top-0 -z-20 w-full origin-center -translate-x-[60%] rotate-90 scale-[0.6]"
          loading="lazy"
        />
      </div>
      <article
        id="network.wrapper"
        className="grid-system relative col-span-full h-full w-dvw items-center justify-center overflow-x-hidden md:h-full"
      >
        <div
          id="network.content"
          className={cn(
            "max-width col-span-full flex flex-col items-center justify-center sm:w-dvw",
            "md:col-span-full md:col-start-1 md:w-full",
            "lg:col-span-full lg:col-start-1",
            "xl:col-span-10 xl:col-start-2",
            "mt-header-top md:mt-0"
          )}
        >
          <div
            className={cn(
              "col-span-full px-gutter pb-[5rem]",
              "md:col-span-8 md:col-start-3 lg:w-4/6 lg:pb-[5rem]"
            )}
          >
            <StaggerHeader
              title={network.title}
              className="pb-card text-5xl leading-[1.1] md:text-7xl"
              timeline={timeline}
              section="#network-pile"
            />

            <p id="network-body" className="mb-gutter text-lg">
              {network.body}
            </p>
          </div>
          <div className="grid-system relative col-span-full gap-card px-card lg:px-gutter">
            {network.items.map((item, index) => (
              <Card
                key={index}
                className={cn(
                  "network-card background-blur col-span-full flex items-start justify-between bg-white/80 md:col-span-4 md:col-start-2 lg:col-span-4",
                  item.link && "md:cursor-pointer md:hover:shadow-card",
                  "relative z-30 !h-auto"
                )}
              >
                <CustomUrl value={item.link} isWrapper className="h-full">
                  <div className={cn("flex h-full p-card")}>
                    <CardHeader className="grid w-5/6 gap-copy">
                      {item.heading && (
                        <Heading
                          variant="h3"
                          className={cn(
                            "text-balance text-2xl leading-[1.1] transition-colors duration-500 ease-in-out",
                            item.link && "md:group-hover:text-pink",
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
                    {item.link && !item.link.variant && (
                      <CardFooter className="ml-auto place-self-center">
                        <Icon
                          variant={
                            item.link.internal ? "arrowRight" : "arrowRightUp"
                          }
                        />
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
