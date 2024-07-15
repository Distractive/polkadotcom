"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { urlForImage } from "@/sanity/lib/image"
import { type ecosystemSelection } from "@/sanity/selections/home/ecosystem"
import { type TypeFromSelection } from "groqd"
import { gsap } from "gsap"

import { Button, Card, CardContent, cn, Heading } from "@shared/ui"
import { CustomUrl } from "@/components/custom-url"

import { StaggerHeader } from "../components/stagger-heading"
import { STANDARD_DELAY } from "../lib/constants"

interface Props {
  ecosystem: TypeFromSelection<typeof ecosystemSelection>["ecosystem"]
}

export function Ecosystem({ ecosystem }: Props) {
  const TIMELINE = {
    defaults: {
      ease: "power1.inOut",
    },
  }
  const timeline = useRef<gsap.core.Timeline | null>(null)
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!container.current) return

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
        "#ecosystem-body",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          delay: STANDARD_DELAY,
          scrollTrigger: {
            trigger: "#ecosystem-pile",
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
        ".eco-card",
        {
          opacity: 0,
          y: 40,
          scale: 0.9,
        },
        {
          opacity: 1,
          stagger: 0.2,
          y: 0,
          scale: 1,
          delay: STANDARD_DELAY,
          scrollTrigger: {
            trigger: "#ecosystem-pile",
            start: "top 20%",
            end: "top 90%",
            scrub: 2,
            markers: false,
            once: true,
          },
          // duration: 0.4,
        }
      )
    timeline.current.fromTo(
      "#ecosystem-backgrounds",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        delay: STANDARD_DELAY,
        scrollTrigger: {
          trigger: "#ecosystem-pile",
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
    <div id="ecosystem-pile" className="grid-pile" ref={container}>
      <div
        id="ecosystem-backgrounds"
        className="relative w-[100vw] overflow-x-hidden"
      >
        <img
          src="/gradients/3.webp"
          alt=""
          className="absolute h-full w-full -translate-y-[10%] translate-x-[62%] rotate-[130deg] scale-50"
          loading="lazy"
        />
      </div>
      <article
        id="ecosystem.wrapper"
        className="grid-system relative col-span-full h-auto w-lvw items-center justify-center overflow-hidden"
      >
        <div
          id="ecosystem.content"
          className={cn(
            "max-width col-span-full flex flex-col items-center justify-center",
            "lg:col-span-12 lg:col-start-1",
            "xl:col-span-10 xl:col-start-2",
            "mt-header-top"
          )}
        >
          <div className="col-span-12 px-gutter md:w-3/4 lg:w-4/6 lg:px-0">
            <StaggerHeader
              className="pb-copy font-display text-5xl leading-[1.1] md:text-7xl"
              title={ecosystem.title}
              timeline={timeline}
              section="#ecosystem-pile"
            />
            <p id="ecosystem-body" className="mb-card text-lg lg:w-3/4">
              {ecosystem.body}
            </p>
          </div>

          <div className="grid-system col-span-12 gap-card !gap-x-card px-gutter md:px-0">
            {ecosystem.items.map((item, index) => (
              <Card
                key={index}
                className={cn(
                  "eco-card aspect-video place-content-end overflow-hidden rounded-2xl md:aspect-auto md:!h-[22.5rem]",
                  "col-span-full col-start-1 md:col-span-4 md:col-start-2 lg:col-span-8 lg:col-start-3",
                  (index == 2 || index == 5) && "lg:col-start-7",
                  (index == 1 || index == 2 || index == 4 || index == 5) &&
                    "relative lg:col-span-4"
                )}
                data-index={index}
              >
                <CustomUrl value={item.link} isWrapper>
                  <Image
                    src={urlForImage(item.image.asset)}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                    width={item.image.asset.metadata.dimensions?.width}
                    height={item.image.asset.metadata.dimensions?.height}
                  />
                  <CardContent className="relative flex flex-col justify-end p-gutter">
                    <Heading
                      variant="h3"
                      className={cn(
                        "text-balance text-white transition-colors duration-500 ease-in-out"
                      )}
                    >
                      {item.heading}
                    </Heading>
                    <p className="text-white">{item.body}</p>
                  </CardContent>
                </CustomUrl>
              </Card>
            ))}
          </div>
          <Button
            variant="secondary"
            size="md"
            className="my-gutter px-gutter md:w-auto"
            asChild
          >
            <CustomUrl value={ecosystem.link}>
              {ecosystem.link?.label}
            </CustomUrl>
          </Button>
        </div>
      </article>
    </div>
  )
}
