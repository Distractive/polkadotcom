"use client"

import { type buildSelection } from "@/sanity/selections/home/build"
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

import { StaggerHeader } from "../components/stagger-heading"

interface Props {
  build: TypeFromSelection<typeof buildSelection>["build"]
}

export function Build({ build }: Props) {
  const isMobile = useBreakpoint("--screen-lg")
  return (
    <Scrollytelling.Root defaults={{ ease: "linear" }}>
      <Scrollytelling.Pin
        childHeight={"100vh"}
        pinSpacerHeight={"400vh"}
        top={isMobile ? "12vh" : "0"}
      >
        <article
          id="build.wrapper"
          className="grid-pile grid-system !lg:-mt-[100vh] relative col-span-12 h-auto w-lvw items-center justify-center overflow-hidden lg:h-full"
        >
          <div
            id="build.content"
            className={cn(
              "max-width relative z-10 col-span-12 flex flex-col items-center justify-center sm:w-dvw md:px-gutter",
              "md:col-span-12 md:col-start-1 md:w-full",
              "lg:col-span-12 lg:col-start-1",
              "xl:col-span-10 xl:col-start-2"
            )}
          >
            <div className="col-span-12 px-gutter pb-[5rem] md:pb-[5rem] lg:w-4/6 lg:px-0">
              <StaggerHeader
                title={build.title}
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
                <p className="background-blur border-transparent rounded-xl p-2 text-lg md:w-5/6">
                  {build.body}
                </p>
              </Scrollytelling.Animation>
            </div>
            <div className="grid-system col-span-12 flex flex-col gap-gutter px-gutter">
              <Scrollytelling.Stagger
                overlap={0.05}
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
                      y: -40,
                      scale: 1,
                    },
                  ],
                }}
              >
                {build.items.map((item, index) => (
                  <Card
                    key={index}
                    className={cn(
                      "background-blur col-span-6 flex items-start justify-between gap-card bg-white/80 p-card md:col-span-4 md:col-start-2 lg:col-span-4",
                      item.link && "md:cursor-pointer md:hover:shadow-card",
                      "!h-auto"
                    )}
                  >
                    <CardHeader className="grid h-full items-center">
                      {item.heading && (
                        <Heading
                          variant="h3"
                          className={cn(
                            "text-balance text-xl leading-normal transition-colors duration-500 ease-in-out md:text-2xl",
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
                    {item.link && (
                      <CardFooter className="flex h-full flex-col justify-center">
                        {item.link.external ? (
                          <Icon variant="arrowRightUp" />
                        ) : (
                          <Icon variant="arrowRight" />
                        )}
                      </CardFooter>
                    )}
                  </Card>
                ))}
              </Scrollytelling.Stagger>
            </div>
          </div>
        </article>
      </Scrollytelling.Pin>
    </Scrollytelling.Root>
  )
}
