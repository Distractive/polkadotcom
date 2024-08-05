"use client"

import Image from "next/image"
import { type heroSelection } from "@/sanity/selections/home/hero"
import Spline from "@splinetool/react-spline"
// import * as Scrollytelling from "@bsmnt/scrollytelling"
import { type TypeFromSelection } from "groqd"

import { Button, cn, Heading } from "@shared/ui"
import { CustomUrl } from "@/components/custom-url"
import { HeroGradient } from "@/features/gradients/hero-rainbow"

interface Props {
  hero: TypeFromSelection<typeof heroSelection>["hero"]
}

export function Hero({ hero }: Props) {
  return (
    // <div
    //   id="hero-pile"
    //   className="grid-pile relative flex h-[100vh] flex-col overflow-hidden"
    // >
    <div
      id="hero-pile"
      className="relative flex  flex-col items-center justify-center pt-40"
    >
      <div
        id="hero-backgrounds"
        className="max-width absolute top-0 -z-50 h-full w-[100vw] "
      >
        <div className="absolute left-1/2 top-0 -translate-x-1/2 translate-y-[-35%] transform">
          <HeroGradient />
        </div>

        {/* <img
          src="/gradients/grid.png"
          alt=""
          className={cn(
            " absolute -z-30 h-full w-full origin-center rotate-[90deg] scale-50 object-contain",
            "-translate-x-[-50%] -translate-y-[30%] md:-translate-y-[10%]"
          )}
          loading="lazy"
        /> */}
      </div>

      <article
        id="hero.wrapper"
        className={cn(" grid-system relative z-40 col-span-12 w-lvw  ")}
      >
        <div
          id="network.content"
          className={cn(
            "max-width relative z-10 col-span-12 flex flex-col items-center justify-center  sm:w-dvw md:px-gutter"
          )}
        >
          <div className="col-span-12 px-gutter sm:max-w-xl md:max-w-2xl lg:max-w-2xl xl:max-w-6xl  ">
            <Heading
              variant="h1"
              className="pb-card text-center text-5xl leading-[1] md:text-[5rem] xl:text-[7rem]"
            >
              {hero.title}
            </Heading>
            <div className="flex w-full items-center justify-center  px-6 xl:px-2 ">
              {" "}
              <p className="text-center text-lg xl:w-9/12 xl:text-2xl">
                {hero.copy}
              </p>
            </div>

            <div
              id="main-content"
              className="flex flex-col items-center justify-center gap-4  pt-card md:flex-row"
            >
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
                  className="flex-1 whitespace-nowrap"
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
      <div className="relative -z-10 min-h-[36rem] w-full translate-y-[-15%] overflow-visible md:h-[40rem] md:scale-125">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/G1XWvgK96wWX4OU7/scene.splinecode" />
        </div>
      </div>
    </div>
  )
}
