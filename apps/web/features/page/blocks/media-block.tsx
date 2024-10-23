"use client"

import React from "react"
import { type mediaBlockSelection } from "@/sanity/selections/blocks/media-block"
import type { TypeFromSelection } from "groqd"

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  cn,
  Heading,
} from "@shared/ui"
import { CustomUrl } from "@/components/custom-url"

import { VideoBlock } from "./video"

interface Props {
  mediaBlock: TypeFromSelection<typeof mediaBlockSelection>
  className?: string
}

export function MediaBlock({ mediaBlock, className }: Props) {
  const { _key, image, video, eyebrow, heading, body, links } = mediaBlock

  return (
    <div className={cn("grid-system max-width gap-card px-gutter", className)}>
      <Card
        key={_key}
        className={cn(
          "col-span-full rounded-none border-none bg-lightGrey  md:!h-auto lg:col-span-8 lg:col-start-3",
          className
        )}
      >
        {video && <VideoBlock video={video} className={cn("aspect-video")} />}
        {image && (
          <CardHeader className={cn("relative z-10 aspect-video")}>
            <img
              src={image.asset.url}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full rounded-2xl object-cover object-center"
            />
          </CardHeader>
        )}
        <div className={cn("relative")}>
          <CardContent className={cn("grid")}>
            <div className="grid gap-copy py-card">
              {eyebrow && (
                <span className="text-base text-caps-sm font-bold uppercase">
                  {eyebrow}
                </span>
              )}
              {heading && (
                <Heading variant="h2" size="h3">
                  {heading}
                </Heading>
              )}
              {body && (
                <CardDescription className={cn("text-base text-caps-sm")}>
                  {body}
                </CardDescription>
              )}
            </div>
            {links && (
              <CardFooter className={cn("flex flex-wrap gap-4")}>
                {links?.map((link, index) => (
                  <React.Fragment key={index}>
                    {link.label && (
                      <Button
                        asChild
                        size="md"
                        variant={
                          link.variant
                            ? link.variant === "primary"
                              ? "primary"
                              : "secondary"
                            : "primary"
                        }
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
                    )}
                  </React.Fragment>
                ))}
              </CardFooter>
            )}
          </CardContent>
        </div>
      </Card>
    </div>
  )
}
