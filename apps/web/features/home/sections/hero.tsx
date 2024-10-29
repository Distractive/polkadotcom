"use client"

import { type heroSelection } from "@/sanity/selections/home/hero"
import Spline from "@splinetool/react-spline"
import { type TypeFromSelection } from "groqd"

import { Button, cn, Heading } from "@shared/ui"
import { CustomUrl } from "@/components/custom-url"

interface Props {
  hero: TypeFromSelection<typeof heroSelection>["hero"]
}

export function Hero({ hero }: Props) {
  return (
    <div
      id="hero-pile"
      className="md:pt-30 relative -mt-[2rem] mb-8 flex flex-col overflow-visible md:mt-0 md:pt-16 xl:mb-32"
    >
      <div className="absolute inset-0 -z-20 bg-[image:linear-gradient(to_bottom_right,rgba(255,255,255,0%)_0%,#FFFFFF_100%),linear-gradient(to_bottom,rgba(255,255,255,0%)_0%,#FFFFFF_100%),linear-gradient(to_bottom_right,#07FFFF_0%,#7916F3_100%)] bg-[length:101%_100%] bg-no-repeat "></div>
      {/* <div className="home-hero-background absolute inset-0 -z-20"></div> */}

      <article
        id="hero.wrapper"
        className={cn(
          "grid-system max-width relative z-40 w-lvw !overflow-visible lg:px-gutter"
        )}
      >
        <div className="max-width col-span-12 flex flex-col !overflow-visible  sm:w-dvw lg:flex-row">
          {/* HEADING */}
          <div
            id="network.content"
            className={cn(
              "relative z-10 order-2  flex flex-col justify-center px-gutter lg:order-1 lg:col-span-2 lg:px-0",
              "-mt-[8rem] sm:-mt-[5rem] md:mt-0"
            )}
          >
            <div className="sm:max-w-xl md:max-w-2xl lg:max-w-2xl xl:max-w-6xl  ">
              <Heading
                variant="h1"
                className="pb-card leading-[1] md:!text-[3.813rem] "
              >
                {hero.title}
              </Heading>
              <div className="flex w-full">
                {" "}
                <p className="text-lg xl:text-2xl">{hero.copy}</p>
              </div>

              <div
                id="main-content"
                className="flex flex-col  gap-4  pt-card md:flex-row"
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
          {/* ANIMATION */}

          <div className="bg-transparent relative -z-50 order-1   min-h-[36rem] w-full scale-75 overflow-visible  md:min-w-[36rem] md:scale-100 lg:order-2 lg:mb-0 lg:min-h-[48rem] xl:translate-x-[5%] 2xl:translate-x-[10%]">
            <div className="bg-transparent absolute inset-0 w-full origin-center  !overflow-visible lg:pl-10 lg:pr-16">
              <Spline scene="/scene1.splinecode" />
            </div>
          </div>
        </div>
      </article>
      {/* <div className="pt-32"></div> */}
    </div>
  )
}
