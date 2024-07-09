"use client"

import Image from "next/image"
import { urlForImage } from "@/sanity/lib/image"
import { type ecosystemSelection } from "@/sanity/selections/home/ecosystem"
import * as Scrollytelling from "@bsmnt/scrollytelling"
import { type TypeFromSelection } from "groqd"

import { useBreakpoint } from "@/hooks/use-breakpoint"
import { Button, Card, CardContent, cn, Heading } from "@shared/ui"
import { CustomUrl } from "@/components/custom-url"

import { StaggerHeader } from "../components/stagger-heading"

interface Props {
  ecosystem: TypeFromSelection<typeof ecosystemSelection>["ecosystem"]
}

export function Ecosystem({ ecosystem }: Props) {
  const isMobile = useBreakpoint("--screen-lg")
  return (
    <div id="ecosystm-pile" className="grid-pile">
      <Scrollytelling.Root defaults={{ ease: "linear" }}>
        <Scrollytelling.Pin
          childHeight={"200vh"}
          pinSpacerHeight={"500vh"}
          top={0}
          childClassName="-z-10 overflow-hidden"
        >
          <Scrollytelling.Animation
            tween={[
              {
                start: 20,
                end: 80,
                fromTo: [
                  {
                    y: "-20%",
                    x: "50%",
                    scale: 0.2,
                    opacity: 0,
                    rotate: 90,
                  },
                  {
                    opacity: 1,
                    scale: 0.6,
                  },
                ],
              },
              {
                start: 90,
                end: 100,
                to: {
                  scale: 0.5,
                  opacity: 0,
                },
              },
            ]}
          >
            <img
              src="/gradients/3.webp"
              alt=""
              className="-z-20 h-full w-full"
              loading="lazy"
            />
          </Scrollytelling.Animation>
        </Scrollytelling.Pin>
      </Scrollytelling.Root>
      <Scrollytelling.Root defaults={{ ease: "linear" }}>
        <Scrollytelling.Pin
          childHeight={"200vh"}
          pinSpacerHeight={"500vh"}
          top={isMobile ? "12vh" : "12vh"}
        >
          <article
            id="ecosystem.wrapper"
            className="grid-system relative col-span-full h-auto w-lvw items-center justify-center overflow-hidden"
          >
            <div
              id="ecosystem.content"
              className={cn(
                "max-width relative z-10 col-span-12 flex flex-col items-center justify-center sm:w-dvw",
                "md:col-span-12 md:col-start-1 md:w-full",
                "lg:col-span-12 lg:col-start-1",
                "xl:col-span-10 xl:col-start-2"
              )}
            >
              <div className="col-span-12 px-gutter md:w-3/4 lg:w-4/6 lg:px-0">
                <StaggerHeader
                  className="pb-copy font-display text-5xl leading-[1.1] md:text-7xl"
                  title={ecosystem.title}
                />
                <Scrollytelling.Animation
                  tween={{
                    start: 30,
                    end: 50,
                    fromTo: [
                      {
                        opacity: 0,
                      },
                      {
                        ease: "power2.out",
                        opacity: 1,
                      },
                    ],
                  }}
                >
                  <p className="background-blur border-transparent mb-card rounded-xl p-2 text-lg lg:w-3/4">
                    {ecosystem.body}
                  </p>
                </Scrollytelling.Animation>
              </div>
              <Scrollytelling.Animation
                tween={{
                  start: 30,
                  end: 50,
                  fromTo: [
                    {
                      opacity: 0,
                    },
                    {
                      ease: "power2.out",
                      opacity: 1,
                    },
                  ],
                }}
              >
                <div className="grid-system col-span-12 gap-card !gap-x-card px-gutter md:px-0">
                  {ecosystem.items.map((item, index) => (
                    <Card
                      key={index}
                      className={cn(
                        "aspect-video place-content-end overflow-hidden rounded-2xl md:aspect-auto md:!h-[22.5rem]",
                        "col-span-full col-start-1 md:col-span-4 md:col-start-2 lg:col-span-8 lg:col-start-3",
                        (index == 2 || index == 5) && "lg:col-start-7",
                        (index == 1 ||
                          index == 2 ||
                          index == 4 ||
                          index == 5) &&
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
              </Scrollytelling.Animation>
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
        </Scrollytelling.Pin>
      </Scrollytelling.Root>
    </div>
  )
}
