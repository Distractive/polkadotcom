"use client"

import Image from "next/image"
import { type heroSelection } from "@/sanity/selections/home/hero"
import * as Scrollytelling from "@bsmnt/scrollytelling"
import { type TypeFromSelection } from "groqd"

import { Button, cn, Heading } from "@shared/ui"
import { CustomUrl } from "@/components/custom-url"

interface Props {
  hero: TypeFromSelection<typeof heroSelection>["hero"]
}

export function Hero({ hero }: Props) {
  return (
    <>
      <div id="hero-pile" className="grid-pile">
        <Scrollytelling.Root defaults={{ ease: "linear" }}>
          <Scrollytelling.Pin
            childHeight={"100vh"}
            pinSpacerHeight={"200vh"}
            top={0}
            childClassName="-z-10 overflow-hidden"
          >
            <Scrollytelling.Animation
              tween={[
                {
                  start: 80,
                  end: 100,
                  to: {
                    scale: 0.3,
                    opacity: 0,
                  },
                },
              ]}
            >
              <Image
                src="/gradients/1.webp"
                alt=""
                className={cn(
                  "absolute -z-20 h-full w-full  -rotate-45 scale-50",
                  "-translate-y-[25%] translate-x-[50%] md:translate-y-[0%]"
                )}
                priority
                width={858}
                height={698}
              />
            </Scrollytelling.Animation>
            <Scrollytelling.Animation
              tween={[
                {
                  start: 80,
                  end: 100,
                  to: {
                    scale: 0.3,
                    opacity: 0,
                  },
                },
              ]}
            >
              <img
                src="/gradients/2.webp"
                alt=""
                className="absolute top-0 -z-20 h-full w-full -translate-x-[50%] -translate-y-[40%] rotate-[150deg] scale-50"
                loading="lazy"
              />
            </Scrollytelling.Animation>
            <Scrollytelling.Animation
              tween={[
                {
                  start: 80,
                  end: 100,
                  to: {
                    opacity: 0,
                  },
                },
              ]}
            >
              <div>
                <img
                  src="/gradients/5.webp"
                  alt=""
                  className={cn(
                    "absolute top-0 -z-30 h-full w-full rotate-[90deg] scale-50",
                    "-translate-x-[50%] -translate-y-[30%] md:-translate-y-[20%] lg:-translate-y-[10%]"
                  )}
                  loading="lazy"
                />
                <img
                  src="/gradients/5.webp"
                  alt=""
                  className={cn(
                    "absolute -z-30 h-full w-full rotate-[90deg] scale-50",
                    "-translate-x-[-50%] -translate-y-[30%] md:-translate-y-[10%]"
                  )}
                  loading="lazy"
                />
              </div>
            </Scrollytelling.Animation>
          </Scrollytelling.Pin>
        </Scrollytelling.Root>
        <Scrollytelling.Root defaults={{ ease: "linear" }}>
          <Scrollytelling.Pin
            childHeight={"100vh"}
            pinSpacerHeight={"200vh"}
            top={0}
          >
            <article
              id="hero.wrapper"
              className={cn(
                "grid-pile grid-system relative col-span-12 h-full w-lvw items-center justify-center overflow-hidden"
              )}
            >
              <div
                id="network.content"
                className={cn(
                  "max-width relative z-10 col-span-12 flex flex-col items-center justify-center sm:w-dvw md:px-gutter",
                  "md:col-span-12 md:col-start-1 md:w-full",
                  "lg:col-span-10 lg:col-start-2",
                  "xl:col-span-10 xl:col-start-2"
                )}
              >
                <div className="col-span-12 px-gutter lg:w-4/6 lg:px-0 2xl:w-1/2">
                  <Heading className="pb-card text-5xl leading-[1] md:text-[5rem]">
                    {hero.title}
                  </Heading>

                  <p className="background-blur border-transparent -ml-2 rounded-xl p-2 pl-4 text-lg md:w-5/6">
                    {hero.copy}
                  </p>
                  <div className="flex flex-col gap-4 pt-card md:flex-row">
                    {hero.links?.map((link, index) => (
                      <Button
                        asChild
                        key={index}
                        variant={
                          link?.variant
                            ? link.variant === "primary"
                              ? "primary"
                              : "secondary"
                            : "primary"
                        }
                        size="lg"
                        className="w-full"
                      >
                        <CustomUrl
                          className="outline-none"
                          value={{
                            internal: link?.internal,
                            external: link?.external,
                          }}
                        >
                          {link.label}
                        </CustomUrl>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </Scrollytelling.Pin>
        </Scrollytelling.Root>
      </div>
    </>
  )
}
