"use client"

import { type networkSelection } from "@/sanity/selections/home/network"
import * as Scrollytelling from "@bsmnt/scrollytelling"
import { type TypeFromSelection } from "groqd"

import { useBreakpoint } from "@/hooks/use-breakpoint"
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

interface Props {
  network: TypeFromSelection<typeof networkSelection>["network"]
}

export function Network({ network }: Props) {
  const isMobile = useBreakpoint("--screen-lg")

  return (
    <div id="network-pile" className="grid-pile">
      <Scrollytelling.Root defaults={{ ease: "linear" }}>
        <Scrollytelling.Pin
          childHeight={isMobile ? "200vh" : "100vh"}
          pinSpacerHeight={"400vh"}
          top={isMobile ? "12vh" : "0"}
          childClassName="-z-10 overflow-hidden"
        >
          <Scrollytelling.Animation
            tween={[
              {
                start: 10,
                end: 40,
                fromTo: [
                  {
                    scale: 0.2,
                    opacity: 0,
                    rotate: 70,
                    x: "-55%",
                    y: isMobile ? "30%" : "20%",
                  },
                  {
                    opacity: 1,
                    scale: 0.5,
                    rotate: 90,
                  },
                ],
              },
              {
                start: 80,
                end: 100,
                to: {
                  scale: 0.5,
                  opacity: 0,
                },
              },
            ]}
          >
            <img
              src="/gradients/4.webp"
              alt=""
              className={cn(
                "absolute -z-20 w-full"
                // "!translate-y-[30%] -translate-x-[50%]"
              )}
              loading="lazy"
            />
          </Scrollytelling.Animation>
        </Scrollytelling.Pin>
      </Scrollytelling.Root>
      <Scrollytelling.Root defaults={{ ease: "linear" }}>
        <Scrollytelling.Pin
          childHeight={isMobile ? "200vh" : "100vh"}
          pinSpacerHeight={"400vh"}
          top={isMobile ? "12vh" : "0"}
        >
          <article
            id="network.wrapper"
            className="grid-system relative col-span-full h-auto w-dvw items-center justify-center overflow-hidden md:h-full"
          >
            <div
              id="network.content"
              className={cn(
                "max-width relative z-10 col-span-full flex flex-col items-center justify-center sm:w-dvw md:px-gutter",
                "md:col-span-full md:col-start-1 md:w-full",
                "lg:col-span-full lg:col-start-1",
                "xl:col-span-10 xl:col-start-2"
              )}
            >
              <div className="col-span-full px-gutter pb-[5rem] lg:w-4/6 lg:px-0 lg:pb-[5rem]">
                <StaggerHeader
                  title={network.title}
                  className="pb-card text-5xl leading-[1.1] md:text-7xl"
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
                  <p className="background-blur border-transparent -ml-2 rounded-xl p-2 pl-4 text-lg">
                    {network.body}
                  </p>
                </Scrollytelling.Animation>
              </div>
              <div className="grid-system relative col-span-full gap-card px-card lg:px-0">
                <Scrollytelling.Stagger
                  overlap={0}
                  tween={{
                    start: 40,
                    end: 99,
                    fromTo: [
                      {
                        opacity: 0,
                        y: 40,
                        scale: 0.9,
                      },
                      {
                        ease: "power2.out",
                        opacity: 1,
                        stagger: 0.4,
                        y: -40,
                        scale: 1,
                      },
                    ],
                  }}
                >
                  {network.items.map((item, index) => (
                    <Card
                      key={index}
                      className={cn(
                        "background-blur col-span-full flex items-start justify-between bg-white/80 md:col-span-4 md:col-start-2 lg:col-span-4",
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
                                  item.link && "md:group-hover:text-pink"
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
                                  item.link.internal
                                    ? "arrowRight"
                                    : "arrowRightUp"
                                }
                              />
                            </CardFooter>
                          )}
                        </div>
                      </CustomUrl>
                    </Card>
                  ))}
                </Scrollytelling.Stagger>
              </div>
            </div>
          </article>
        </Scrollytelling.Pin>
      </Scrollytelling.Root>
    </div>
  )
}
