// "use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { type connectedSelection } from "@/sanity/selections/home/connected"
import { type TypeFromSelection } from "groqd"
import gsap from "gsap"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CarouselItem,
  cn,
  Heading,
} from "@shared/ui"
import { Carousel } from "@/components/carousel"
import { CustomUrl } from "@/components/custom-url"

// import { StaggerHeader } from "../components/stagger-heading"
// import { STANDARD_DELAY } from "../lib/constants"

interface Props {
  connected: TypeFromSelection<typeof connectedSelection>["connected"]
}

// const TIMELINE = {
//   defaults: {
//     ease: "power1.inOut",
//   },
// }

export function Connected({ connected }: Props) {
  // const timeline = useRef<gsap.core.Timeline | null>(null)
  // useEffect(() => {
  //   timeline.current = gsap.timeline({
  //     ...TIMELINE,
  //   })
  //   return () => {
  //     timeline.current?.kill()
  //   }
  // }, [])

  // useEffect(() => {
  //   if (!timeline.current) return
  //   timeline.current
  //     .fromTo(
  //       "#connected-body",
  //       {
  //         opacity: 0,
  //       },
  //       {
  //         opacity: 1,
  //         delay: STANDARD_DELAY,
  //         scrollTrigger: {
  //           trigger: "#connected-pile",
  //           start: "top 50%",
  //           end: "top 90%",
  //           scrub: 1,
  //           markers: false,
  //           once: true,
  //         },
  //         duration: 0.2,
  //       }
  //     )
  //     .fromTo(
  //       "#connected-carousel",
  //       {
  //         opacity: 0,
  //         x: 999,
  //       },
  //       {
  //         opacity: 1,
  //         x: 0,
  //         delay: STANDARD_DELAY,
  //         scrollTrigger: {
  //           trigger: "#connected-pile",
  //           start: "top 50%",
  //           end: "top 90%",
  //           scrub: 1,
  //           markers: false,
  //           once: true,
  //         },

  //         duration: 0.7,
  //       }
  //     )

  // timeline.current.fromTo(
  //   "#connected-backgrounds",
  //   {
  //     opacity: 0,
  //   },
  //   {
  //     opacity: 1,
  //     delay: STANDARD_DELAY,
  //     scrollTrigger: {
  //       trigger: "#connected-pile",
  //       start: "top 50%",
  //       end: "top 90%",
  //       scrub: 1,
  //       markers: false,
  //       once: true,
  //     },
  //     duration: 0.4,
  //   }
  // )
  // }, [])
  return (
    <div id="connected-pile" className="grid-pile md:pt-[6rem] lg:pt-[12rem]">
      {/* <div
        id="connected-backgrounds"
        className="relative w-[100vw] overflow-x-hidden"
      >
        <img
          src="/gradients/1.webp"
          alt=""
          className={cn(
            "absolute -z-20 h-full w-full rotate-[83deg] scale-50",
            "-translate-x-[50%] -translate-y-[25%] md:translate-y-[0%]",
            "object-contain"
          )}
          loading="lazy"
        />
      </div> */}
      <article
        id="connected.wrapper"
        className="grid-system grid-pile relative col-span-12 h-full w-lvw items-center justify-center overflow-hidden"
      >
        <div
          id="connected.content"
          className="grid-system relative z-10 col-span-12 mt-header-top !w-[100vw] md:mt-0"
        >
          <div className="col-span-6 px-gutter pb-gutter lg:col-span-4 lg:col-start-2 xl:col-start-3">
            {/* <StaggerHeader
              timeline={timeline}
              section="#connected-pile"
              title={connected.title}
              className="!hyphens-none !break-normal pb-copy text-5xl  leading-[1.1] md:text-7xl"
            /> */}
            <Heading
              variant="h2"
              className="!hyphens-none !break-normal pb-copy text-5xl  leading-[1.1] md:text-7xl"
              aria-label={connected.title}
              role="heading"
            >
              {connected.title}
            </Heading>
            <p id="connected-body" className="text-lg">
              {connected.body}
            </p>
          </div>
          <div
            id="connected-carousel"
            className="col-span-12 flex flex-col gap-gutter pb-page pl-gutter md:pb-0 lg:col-span-7 lg:col-start-6 xl:col-start-7"
          >
            <Carousel navClassName="pr-gutter" className="rounded-l-2xl">
              {connected.items.map((card) => (
                <CarouselItem
                  key={card._key}
                  className="basis-5/6 md:basis-3/6 lg:basis-4/6"
                >
                  <Card
                    key={card._key}
                    className={cn(
                      "background-blur bg-white/80",
                      card.link &&
                        "md:cursor-pointer md:hover:bg-white md:hover:shadow-card"
                    )}
                  >
                    <CustomUrl value={card.link} isWrapper>
                      <CardHeader className={cn("relative z-10 aspect-video")}>
                        {card.headerImage && (
                          <Image
                            src={card.headerImage?.asset.url}
                            alt=""
                            height={790}
                            width={592}
                            priority={false}
                            style={{ width: "100%", height: "auto" }}
                            className={cn("object-cover object-center")}
                          />
                        )}
                      </CardHeader>

                      <div className={cn("relative")}>
                        <CardContent className={cn("grid gap-card p-card")}>
                          <div className="grid gap-copy">
                            {card.eyebrow && (
                              <span className="text-base uppercase">
                                {card.eyebrow}
                              </span>
                            )}
                            {card.heading && (
                              <Heading
                                variant="h3"
                                className={cn(
                                  "text-base leading-[1.2] transition-colors duration-500 ease-in-out md:text-2xl",
                                  card.link && "md:group-hover:text-pink"
                                )}
                              >
                                {card.heading}
                              </Heading>
                            )}
                            {card.body && (
                              <CardDescription className="line-clamp-3">
                                {card.body}
                              </CardDescription>
                            )}
                          </div>
                        </CardContent>
                      </div>
                    </CustomUrl>
                  </Card>
                </CarouselItem>
              ))}
            </Carousel>
          </div>
        </div>
      </article>
    </div>
  )
}
