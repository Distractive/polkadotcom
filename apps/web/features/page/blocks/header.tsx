"use client"

import { type headerSelection } from "@/sanity/selections/blocks/header"
import type { TypeFromSelection } from "groqd"

import { Button, cn, Heading } from "@shared/ui"
import { CustomUrl } from "@/components/custom-url"

import { BreadcrumbBlock, BreadcrumbProps } from "./breadcrumb"
import { VideoBlock } from "./video"

interface Props {
  header: TypeFromSelection<typeof headerSelection>
  breadcrumb?: BreadcrumbProps
  className?: string
}

export function HeaderBlock({ header, breadcrumb, className }: Props) {
  return (
    <header
      className={cn(
        "col-span-full flex flex-col",
        header.image || header.video
          ? "lg:flex-row lg:items-center lg:justify-center"
          : "w-full lg:col-span-8 lg:col-start-3",
        !header.image && "pt-40",

        className
      )}
    >
      {header.image && (
        <img
          src={header.image.asset.url}
          alt=""
          className={"h-auto w-full lg:order-2 lg:basis-[50%]"}
        />
      )}
      <div
        className={cn(
          "flex flex-col gap-copy px-gutter py-card",
          header.image && "lg:basis-[50%]"
        )}
      >
        {breadcrumb && <BreadcrumbBlock items={breadcrumb.items} />}

        <Heading variant="h1" className="text-balance">
          {header.title}
        </Heading>

        {header.body && <p className="text-balance text-lg">{header.body}</p>}
        {header.link && (
          <Button variant="primary" size="lg" className="md:mr-auto">
            <CustomUrl value={header.link}>{header.link.label}</CustomUrl>
          </Button>
        )}
        {header.video && (
          <VideoBlock video={header.video} className="mt-copy" />
        )}
      </div>
    </header>
  )
}
