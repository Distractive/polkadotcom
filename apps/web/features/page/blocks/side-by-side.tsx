"use client"

import { type sideBySideSelection } from "@/sanity/selections/blocks/side-by-side"
import { type TypeFromSelection } from "groqd"
import { PortableText } from "next-sanity"

import { Button, cn, Heading } from "@shared/ui"

interface Props {
  className?: string
  content: TypeFromSelection<typeof sideBySideSelection>
}

export function SideBySideBlock({ content, className }: Props) {
  return (
    <div className="grid-system py-spacing px-gutter">
      <div
        className={cn(
          "col-span-12 flex flex-col-reverse lg:items-center lg:justify-center xl:col-span-8 xl:col-start-3",
          content.isImageOnLeft ? "lg:flex-row-reverse" : "lg:flex-row",
          className
        )}
      >
        <div className={cn("lg:w-1/2")}>
          <Heading variant="h2" className={cn("py-gutter lg:text-5xl")}>
            {content.heading}
          </Heading>
          <PortableText
            value={content.content}
            components={{
              block: {
                normal: ({ children }) => (
                  <p className="text-lg text-black">{children}</p>
                ),
              },
              types: {
                customUrl: ({ value }) => {
                  return (
                    <Button
                      variant={value.internal ? "primary" : "secondary"}
                      size="sm"
                      asChild
                      className="my-gutter"
                    >
                      <span>{value.label}</span>
                    </Button>
                  )
                },
              },
            }}
          />
        </div>
        {content.image && (
          <img
            src={content.image.asset.url}
            alt=""
            className={cn(
              "h-auto lg:w-1/2 lg:max-w-[50rem]",
              content.isImageOnLeft ? "lg:mr-gutter" : "lg:ml-gutter"
            )}
          />
        )}
      </div>
    </div>
  )
}
