"use client"

import Image from "next/image"
import { urlForImage } from "@/sanity/lib/image"
import { type headerSelection } from "@/sanity/selections/blocks/header"
import type { TypeFromSelection } from "groqd"

import { Button, cn, Heading } from "@shared/ui"
import { CustomUrl } from "@/components/custom-url"

import { BreadcrumbBlock, type BreadcrumbProps } from "./breadcrumb"
import { VideoBlock } from "./video"

interface Props {
  header: TypeFromSelection<typeof headerSelection>
  breadcrumb?: BreadcrumbProps
  className?: string
}

export function HeaderBlock({ header, breadcrumb, className }: Props) {
  console.log("header:", header)
  // Alternate Header
  if (header.isAlternate) {
    return (
      <header className={cn("max-width mb-page flex flex-col", className)}>
        {/* Desktop and tablet image */}
        {header.image && (
          <div className="relative hidden h-[400px] w-full md:block">
            <div className="absolute inset-0 hidden overflow-hidden md:block">
              <Image
                src={urlForImage(header.image.asset)}
                alt=""
                className="hidden h-[400px] w-full rounded-b-2xl object-cover md:block"
                width={header.image.asset.metadata.dimensions?.width}
                height={header.image.asset.metadata.dimensions?.height}
                priority
              />
            </div>
          </div>
        )}
        {/* Mobile image */}
        {header.mobileImage && (
          <div className=" ">
            <Image
              src={urlForImage(header.mobileImage.asset)}
              alt=""
              className="w-full object-cover md:hidden"
              width={header.mobileImage.asset.metadata.dimensions?.width}
              height={header.mobileImage.asset.metadata.dimensions?.height}
              priority
            />
          </div>
        )}

        <div
          className={cn(
            "flex max-w-4xl flex-col justify-center gap-copy lg:pt-16",
            header.image
              ? "px-gutter pt-card"
              : "mt-gutter px-gutter pt-header-top"
          )}
        >
          {breadcrumb && <BreadcrumbBlock items={breadcrumb.items} />}

          <Heading variant="h1">{header.title}</Heading>

          {header.body && <p className="text-lg">{header.body}</p>}
          <div
            id="main-content"
            className="mt-card flex w-full flex-wrap gap-4"
          >
            {header.links?.map((link, index) => (
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
              >
                <CustomUrl
                  className="outline-none"
                  value={{ internal: link?.internal, external: link?.external }}
                >
                  {link.label}
                </CustomUrl>
              </Button>
            ))}
          </div>
          {header.video && (
            <VideoBlock video={header.video} className="mt-gutter w-full" />
          )}
        </div>
      </header>
    )
  }

  // Original side-by-side header
  return (
    <header className={cn("grid-system col-span-full mb-page", className)}>
      {!header.image && <div className="pt-4"></div>}

      {header.image && (
        <Image
          src={urlForImage(header.image.asset)}
          alt=""
          className="col-span-full w-full lg:order-2 lg:col-span-7 lg:col-start-6"
          width={header.image.asset.metadata.dimensions?.width}
          height={header.image.asset.metadata.dimensions?.height}
          priority
        />
      )}
      <div
        className={cn(
          "col-span-full flex flex-col items-start justify-center gap-copy",
          header.image
            ? "px-gutter pt-card lg:order-1 lg:col-span-5 lg:col-start-1 lg:pt-header-top"
            : "mt-gutter px-gutter pt-header-top lg:col-span-8 lg:col-start-3"
        )}
      >
        {breadcrumb && <BreadcrumbBlock items={breadcrumb.items} />}

        <Heading variant="h1">{header.title}</Heading>

        {header.body && <p className="text-lg">{header.body}</p>}
        <div id="main-content" className="mt-card flex w-full flex-wrap gap-4">
          {header.links?.map((link, index) => (
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
            >
              <CustomUrl
                className="outline-none"
                value={{ internal: link?.internal, external: link?.external }}
              >
                {link.label}
              </CustomUrl>
            </Button>
          ))}
        </div>
        {header.video && (
          <VideoBlock video={header.video} className="mt-gutter w-full" />
        )}
      </div>
    </header>
  )
}
