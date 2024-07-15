"use client"

import Image from "next/image"
import { type heroSelection } from "@/sanity/selections/home/hero"
// import * as Scrollytelling from "@bsmnt/scrollytelling"
import { type TypeFromSelection } from "groqd"

import { Button, cn, Heading } from "@shared/ui"
import { CustomUrl } from "@/components/custom-url"

interface Props {
  hero: TypeFromSelection<typeof heroSelection>["hero"]
}

export function Hero({ hero }: Props) {
  return (
    <div id="hero-pile" className="grid-pile h-[100vh] overflow-hidden">
      <div
        id="hero-backgrounds"
        className="relative w-[100vw] overflow-x-hidden"
      >
        <Image
          src="/gradients/1.webp"
          alt=""
          className={cn(
            "absolute -z-20 h-full w-full rotate-[70deg] scale-50",
            "-translate-y-[25%] translate-x-[60%] md:translate-y-[0%]",
            "object-contain"
          )}
          priority
          width={858}
          height={698}
        />

        <img
          src="/gradients/2.webp"
          alt=""
          className="absolute top-0 -z-20 h-full w-full -translate-x-[50%] -translate-y-[48%] rotate-[150deg] scale-50 object-contain md:-translate-y-[40%]"
          loading="lazy"
        />

        <img
          src="/gradients/grid.png"
          alt=""
          className={cn(
            " absolute -z-30 h-full w-full origin-center rotate-[90deg] scale-50 object-contain",
            "-translate-x-[50%] -translate-y-[30%] md:-translate-y-[20%] lg:-translate-y-[10%]"
          )}
          loading="lazy"
        />
        <img
          src="/gradients/grid.png"
          alt=""
          className={cn(
            " absolute -z-30 h-full w-full origin-center rotate-[90deg] scale-50 object-contain",
            "-translate-x-[-50%] -translate-y-[30%] md:-translate-y-[10%]"
          )}
          loading="lazy"
        />
      </div>

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
          <div className="col-span-12 px-gutter lg:w-4/6 lg:px-0 2xl:w-3/4">
            <Heading
              variant="h1"
              className="pb-card text-5xl leading-[1] md:text-[5rem] xl:text-[7rem]"
            >
              {hero.title}
            </Heading>

            <p className="text-lg md:w-5/6 xl:text-2xl 2xl:w-8/12">
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
                  className="flex-1"
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
    </div>
  )
}
