"use client"

import { useState } from "react"
import { cookies } from "next/headers"
import Image from "next/image"
import { usePathname } from "next/navigation"
import type { bannerSelection } from "@/sanity/selections/banner"
import { is } from "@react-three/fiber/dist/declarations/src/core/utils"
import type { TypeFromSelection } from "groqd"

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  cn,
  Heading,
  Icon,
} from "@shared/ui"
import { CustomUrl } from "@/components/custom-url"

interface BannerProps {
  type: "desktop" | "mobile"
  initialVisibility: boolean
  banner: TypeFromSelection<typeof bannerSelection>
}

export default function Banner({
  type,
  banner,
  initialVisibility,
}: BannerProps) {
  const [isVisible, setIsVisible] = useState(initialVisibility)
  const pathname = usePathname()
  const isSpammening = pathname === "/spammening"

  const handleClose = () => {
    setIsVisible(false)
    document.cookie =
      "polkadot_banner_closed=true; path=/; max-age=259200; samesite=strict; secure"
  }

  if (!banner?.isBannerOn || !isVisible || isSpammening) {
    return null
  }

  const desktopBanner = () => (
    <div className="fixed bottom-4 left-4 right-6 z-40 hidden rounded-2xl bg-white sm:right-auto sm:block  md:block">
      <div className="relative h-full w-full">
        <button
          className="group absolute right-[-1rem] top-[-1rem] z-50 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-grey-300 bg-white transition-colors duration-200 hover:bg-black"
          onClick={handleClose}
        >
          <Icon
            variant="close"
            className="size-6 text-black transition-colors duration-200 group-hover:text-white"
          />
        </button>
      </div>
      <Card
        className={cn(
          banner.link &&
            "focus-within:shadow-card focus-within:backdrop-blur-0 md:cursor-pointer md:hover:shadow-card"
        )}
      >
        <CustomUrl value={banner.link} isWrapper>
          <div
            className={cn(
              "flex h-full gap-4 p-4 md:gap-6 md:p-6 lg:gap-card lg:p-card",
              banner.icon ? "items-center" : "items-start"
            )}
          >
            {banner.icon && (
              <Image
                src={banner.icon.asset.url}
                alt={banner.altText || ""}
                loading="lazy"
                width={100}
                height={100}
                className={cn("size-14 rounded-2xl object-cover object-center")}
              />
            )}
            <CardContent className="grid gap-copy">
              {banner.eyebrow && (
                <span className="text-caps-small text-xs font-bold uppercase md:text-base">
                  {banner.eyebrow}
                </span>
              )}
              {banner.header && (
                <Heading
                  variant="h3"
                  size="h4"
                  className={cn(
                    "text-sm text-black transition-colors duration-100 ease-in-out",
                    banner.link && [
                      "group-hover:text-pink group-focus-visible:text-pink",
                      "link:!text-current visited:!text-current",
                    ]
                  )}
                >
                  {banner.header}
                </Heading>
              )}
              {banner.link && banner.link.variant && (
                <Button
                  tabIndex={-1}
                  asChild
                  variant={
                    banner.link.variant
                      ? banner.link.variant === "primary"
                        ? "primary"
                        : "secondary"
                      : "primary"
                  }
                  size="md"
                  className="mt-copy group-focus-within:after:translate-x-0 md:mr-auto md:group-hover:after:translate-x-0"
                />
              )}
            </CardContent>
            {banner.link && !banner.link.variant && (
              <CardFooter className="ml-auto place-self-center">
                <Icon
                  variant={banner.link.internal ? "arrowRight" : "arrowRightUp"}
                />
              </CardFooter>
            )}
          </div>
        </CustomUrl>
      </Card>
    </div>
  )

  const mobileBanner = () => (
    <div className="sticky top-0 z-40 hidden w-full  flex-row bg-white px-gutter py-2 text-xs text-grey-800 sm:flex md:hidden">
      <CustomUrl
        className="outline-none"
        value={
          {
            internal: banner.link?.internal,
            external: banner.link?.external,
          } as any
        }
      >
        {banner.mobileText}
      </CustomUrl>
      <button
        className="absolute bottom-0 right-0 top-0 flex cursor-pointer items-center justify-center px-4"
        onClick={handleClose}
      >
        <Icon variant="close" className="size-6" />
      </button>
    </div>
  )

  return type === "desktop" ? desktopBanner() : mobileBanner()
}
