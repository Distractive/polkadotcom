"use client"

import Image from "next/image"
import ecosystemGradientBlue from "@/public/gradients/ecosystem-blue.png"
import ecosystemGradientPink from "@/public/gradients/ecosystem-pink.png"
import { urlForImage } from "@/sanity/lib/image"
import { type ecosystemSelection } from "@/sanity/selections/home/ecosystem"
import { type TypeFromSelection } from "groqd"

import { Button, Card, CardContent, cn, Heading } from "@shared/ui"
import { CustomUrl } from "@/components/custom-url"

interface Props {
  ecosystem: TypeFromSelection<typeof ecosystemSelection>["ecosystem"]
}

export function Ecosystem({ ecosystem }: Props) {
  return (
    <div id="ecosystem-pile" className="grid-pile md:pt-[6rem]">
      <div id="" className="max-width relative -z-50 ">
        <div className="absolute right-0 top-0 translate-x-[40%] translate-y-[-20%] scale-[2.5] md:scale-[1] lg:translate-x-[25%]">
          <Image
            src={ecosystemGradientPink}
            alt="Ecosystem Gradient"
            height={1600}
            width={1600}
          />
        </div>
        <div className="absolute bottom-0 left-0 translate-x-[-40%] translate-y-[15%] scale-[2.5] md:scale-[1] lg:translate-y-[20%]">
          <Image
            src={ecosystemGradientBlue}
            alt="Ecosystem Gradient"
            height={1600}
            width={1600}
          />
        </div>
      </div>

      <article
        id="ecosystem.wrapper"
        className="grid-system relative col-span-full h-auto w-lvw items-center justify-center overflow-hidden"
      >
        <div
          id="ecosystem.content"
          className={cn(
            "max-width col-span-full flex flex-col items-center justify-center",
            "lg:col-span-12 lg:col-start-1",
            "xl:col-span-10 xl:col-start-2",
            "mt-header-top"
          )}
        >
          <div className="col-span-12 px-gutter md:w-3/4 lg:w-4/6 lg:px-0">
            <Heading
              variant="h2"
              className="!hyphens-none !break-normal pb-copy text-5xl  leading-[1.1] md:text-7xl"
              aria-label={ecosystem.title}
              role="heading"
            >
              {ecosystem.title}
            </Heading>
            <p
              id="ecosystem-body"
              className="mb-card text-lg lg:w-9/12 xl:w-11/12"
            >
              {ecosystem.body}
            </p>
          </div>

          <div className="grid-system col-span-12 gap-card !gap-x-card px-gutter md:px-0">
            {ecosystem.items.map((item, index) => (
              <Card
                key={index}
                className={cn(
                  "eco-card aspect-video place-content-end overflow-hidden rounded-2xl md:aspect-auto md:!h-[22.5rem]",
                  "col-span-full col-start-1 md:col-span-4 md:col-start-2 lg:col-span-8 lg:col-start-3",
                  (index == 2 || index == 5) && "lg:col-start-7",
                  (index == 1 || index == 2 || index == 4 || index == 5) &&
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
    </div>
  )
}
