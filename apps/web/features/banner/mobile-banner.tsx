"use client"

import { useState } from "react"
import { cookies } from "next/headers"
import { bannerSelection } from "@/sanity/selections/banner"
import type { TypeFromSelection } from "groqd"

import { CustomUrl } from "@/components/custom-url"

interface BannerProps {
  initialVisibility: boolean
  banner: TypeFromSelection<typeof bannerSelection>
}

export default function MobileBanner({
  initialVisibility,
  banner,
}: BannerProps) {
  const [isVisible, setIsVisible] = useState(initialVisibility)

  const handleClose = () => {
    setIsVisible(false)
    document.cookie =
      "bannerClosed=true; path=/; max-age=259200; samesite=strict; secure"
  }

  return (
    isVisible && (
      <div className="relative flex w-full flex-row justify-center gap-8 bg-pink py-2 text-white">
        <div className="">{banner.header}</div>
        <CustomUrl
          className="outline-none"
          value={
            {
              internal: banner.link?.internal,
              external: banner.link?.external,
            } as any
          }
        >
          {banner.link?.label}
        </CustomUrl>
        <div
          className="absolute bottom-0 right-0 top-0 flex cursor-pointer items-center justify-center  px-4"
          onClick={handleClose}
        >
          X
        </div>
      </div>
    )
  )
}
