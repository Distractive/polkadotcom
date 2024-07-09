"use client"

import { type statsSelection } from "@/sanity/selections/home/stats"
import * as Scrollytelling from "@bsmnt/scrollytelling"
import { type TypeFromSelection } from "groqd"

import { useBreakpoint } from "@/hooks/use-breakpoint"
import {
  Card,
  CardDescription,
  // CardFooter,
  CardHeader,
  cn,
  Heading,
} from "@shared/ui"

// import { CustomUrl } from "@/components/custom-url"

import { StaggerHeader } from "../components/stagger-heading"

interface Props {
  stats: TypeFromSelection<typeof statsSelection>["stats"]
}

export function Stats({ stats }: Props) {
  const isMobile = useBreakpoint("--screen-md")
  const isTablet = useBreakpoint("--screen-lg")

  return (
    <div id="stats-pile" className="grid-pile">
      <Scrollytelling.Root defaults={{ ease: "linear" }}>
        <Scrollytelling.Pin
          childHeight={"100vh"}
          pinSpacerHeight={"300vh"}
          top={"0"}
          childClassName="-z-10 overflow-hidden"
        >
          <Scrollytelling.Animation
            tween={[
              {
                start: 20,
                end: 80,
                fromTo: [
                  {
                    y: 20,
                    scale: 0.2,
                    opacity: 0,
                  },
                  {
                    opacity: 1,
                    y: 0,
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
              src="/gradients/2.webp"
              alt=""
              className="scale-60 absolute top-0 -z-20 h-full w-full translate-x-[55%] rotate-90"
              loading="lazy"
            />
          </Scrollytelling.Animation>
          <Scrollytelling.Animation
            tween={[
              {
                start: 20,
                end: 80,
                fromTo: [
                  {
                    opacity: 0,
                    x: "-40%",
                    y: isMobile ? "-30%" : isTablet ? "-20%" : "-10%",
                    rotate: 90,
                    scale: 0.5,
                  },
                  {
                    opacity: 1,
                  },
                ],
              },
              {
                start: 90,
                end: 100,
                to: {
                  opacity: 0,
                },
              },
            ]}
          >
            <img
              src="/gradients/5.webp"
              alt=""
              className={cn("absolute top-0 -z-30 h-full w-full")}
              loading="lazy"
            />
          </Scrollytelling.Animation>
        </Scrollytelling.Pin>
      </Scrollytelling.Root>
      <Scrollytelling.Root defaults={{ ease: "linear" }}>
        <Scrollytelling.Pin
          childHeight={"100vh"}
          pinSpacerHeight={"300vh"}
          top={isMobile || isTablet ? "12vh" : "0"}
        >
          <article
            id="stats.wrapper"
            className="grid-pile grid-system relative col-span-12 h-auto w-lvw items-center justify-center overflow-hidden lg:h-full"
          >
            <div
              id="stats.content"
              className="max-width grid-system relative z-10 col-span-12 sm:w-dvw"
            >
              <StaggerHeader
                title={stats.title}
                className={cn(
                  "px-gutter py-gutter text-5xl leading-[1.1] lg:pl-gutter lg:pr-gutter",
                  "col-span-12 md:text-7xl lg:col-span-3 lg:col-start-1"
                )}
              />
              <div
                className={cn(
                  "grid-system relative col-span-full m-auto mt-10 auto-rows-[1fr] gap-card px-gutter lg:col-start-6 lg:mt-0"
                )}
              >
                <Scrollytelling.Stagger
                  overlap={0.1}
                  tween={{
                    start: 35,
                    end: 100,
                    fromTo: [
                      {
                        opacity: 0,
                        y: 40,
                        x: (_i, el) => {
                          if (isMobile) {
                            const i = Number(el.dataset.index) + 1
                            return i * el.offsetWidth
                          }
                          return 0
                        },
                      },
                      {
                        ease: "power2.out",
                        opacity: 1,
                        y: (_i, el) => {
                          if (isMobile) {
                            const i = Number(el.dataset.index)
                            return -(i * el.offsetHeight)
                          }
                          return 0
                        },
                        x: 0,
                      },
                    ],
                  }}
                >
                  {stats.items.map((item, index) => (
                    <Card
                      key={index}
                      className={cn(
                        "background-blur col-span-full col-start-1 bg-grey-100/80 p-card md:col-span-2 lg:col-span-5",
                        index % 2 && "lg:translate-y-gutter"
                      )}
                      data-index={index}
                    >
                      <CardHeader className="grid w-5/6 gap-copy">
                        <Heading variant="h3">{item.heading}</Heading>
                        <CardDescription>{item.body}</CardDescription>
                      </CardHeader>
                      {/* <CardFooter className="pt-[3rem]">
                        <span className="flex flex-col text-xs md:flex-row md:items-center">
                          Source:
                          <span className="font-bold">
                            <CustomUrl value={item.link}>
                              {item.link?.label}
                            </CustomUrl>
                          </span>
                        </span>
                      </CardFooter> */}
                    </Card>
                  ))}
                </Scrollytelling.Stagger>
              </div>
            </div>
            {/* <CanvasContainer>
            <Background />
          </CanvasContainer> */}
          </article>
        </Scrollytelling.Pin>
      </Scrollytelling.Root>
    </div>
  )
}
