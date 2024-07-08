"use client"

import { type connectedSelection } from "@/sanity/selections/home/connected"
import * as Scrollytelling from "@bsmnt/scrollytelling"
import { type TypeFromSelection } from "groqd"

import { useBreakpoint } from "@/hooks/use-breakpoint"
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

import { StaggerHeader } from "../components/stagger-heading"

interface Props {
  connected: TypeFromSelection<typeof connectedSelection>["connected"]
}

export function Connected({ connected }: Props) {
  const isMobile = useBreakpoint("--screen-lg")

  return (
    <Scrollytelling.Root defaults={{ ease: "linear" }}>
      <Scrollytelling.Pin
        childHeight={"100vh"}
        pinSpacerHeight={"200vh"}
        top={isMobile ? "12vh" : "0"}
      >
        <article
          id="connected.wrapper"
          className="grid-system grid-pile relative col-span-12 h-full w-lvw items-center justify-center overflow-hidden"
        >
          <div
            id="connected.content"
            className="grid-system relative z-10 col-span-12 !w-[100vw]"
          >
            <div className="col-span-6 px-gutter pb-gutter lg:col-span-4 lg:col-start-1 xl:col-start-2">
              <StaggerHeader
                title={connected.title}
                className="pb-copy text-5xl leading-[1.1] md:text-7xl"
              />
              <Scrollytelling.Animation
                tween={{
                  start: 30,
                  end: 50,
                  fromTo: [
                    {
                      opacity: 0,
                      filter: "blur(10px)",
                    },
                    {
                      ease: "power2.out",
                      opacity: 1,
                      filter: "blur(0px)",
                    },
                  ],
                }}
              >
                <p className="background-blur border-transparent rounded-xl p-2 text-lg">
                  {connected.body}
                </p>
              </Scrollytelling.Animation>
            </div>

            <div className="col-span-12 flex flex-col gap-gutter pb-page pl-gutter md:pb-0 lg:col-span-7 lg:col-start-6">
              <Carousel navClassName="pr-gutter">
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
                        <CardHeader
                          className={cn("relative z-10 aspect-video")}
                        >
                          <img
                            src={card.headerImage?.asset.url}
                            alt=""
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-cover object-center"
                          />
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
                                    "text-balance transition-colors duration-500 ease-in-out",
                                    card.link && "md:group-hover:text-pink"
                                  )}
                                >
                                  {card.heading}
                                </Heading>
                              )}
                              {card.body && (
                                <CardDescription>{card.body}</CardDescription>
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
      </Scrollytelling.Pin>
    </Scrollytelling.Root>
  )
}
