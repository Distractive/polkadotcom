"use client"

import Image from "next/image"
import { type connectedSelection } from "@/sanity/selections/home/connected"
import { type TypeFromSelection } from "groqd"

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

interface Props {
  connected: TypeFromSelection<typeof connectedSelection>["connected"]
}

export function Connected({ connected }: Props) {
  return (
    <div
      id="connected-pile"
      className="grid-pile relative bg-[image:linear-gradient(to_bottom_left,rgba(255,255,255,0%)_0%,#FFFFFF_100%),linear-gradient(to_bottom,rgba(255,255,255,0%)_0%,#FFFFFF_100%),linear-gradient(to_bottom_left,#AF04FF_0%,#07FFFF_100%)] bg-[length:101%_100%] bg-no-repeat py-[4rem] md:py-[6rem]"
    >
      <article
        id="connected.wrapper"
        className="grid-system grid-pile relative col-span-12 h-full w-lvw items-center justify-center overflow-hidden"
      >
        <div
          id="connected.content"
          className="grid-system relative z-10 col-span-12 mt-header-top !w-[100vw] md:mt-0"
        >
          <div className="col-span-6 px-gutter pb-gutter lg:col-span-4 lg:col-start-2 xl:col-start-3">
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
                      "background-blur ",
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
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className={cn("object-cover object-center")}
                          />
                        )}
                      </CardHeader>

                      <div className={cn("relative")}>
                        <CardContent className={cn("grid gap-card p-card")}>
                          <div className="grid gap-copy">
                            {card.eyebrow && (
                              <span className="text-caps-sm  uppercase">
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
