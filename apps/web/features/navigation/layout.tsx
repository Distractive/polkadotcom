"use client"

import { useRef, useState } from "react"
import type { navigationSelection } from "@/sanity/selections/navigation/navigation"
import type { TypeFromSelection } from "groqd"

import { useHideOnScroll } from "@/hooks/use-hide-on-scroll"
import { cn } from "@shared/ui"

import { Header } from "./header"
import { MenuDesktop } from "./menu-desktop"
import { MenuMobile } from "./menu-mobile"
import { Overlay } from "./overlay"

interface Props {
  navigation: TypeFromSelection<typeof navigationSelection>
}

export const TIMELINE = {
  defaults: {
    ease: "power1.out",
    duration: 0.5,
  },
}

export default function NavigationLayout({ navigation }: Props) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  const nav = useRef<HTMLDivElement>(null)
  useHideOnScroll({ ref: nav })

  console.log(navigation)

  return (
    <>
      <Overlay isVisible={isMobileOpen || hovered} />
      <nav
        ref={nav}
        onMouseLeave={() => setHovered(null)}
        className={cn(
          "fixed left-0 right-0 top-0 z-50 m-gutter lg:right-auto",
          "flex flex-col gap-gutter text-black lg:gap-2"
        )}
      >
        <Header
          menu={navigation.menu}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
          setHovered={setHovered}
        />
        <MenuMobile
          menu={navigation.menu}
          isOpen={isMobileOpen}
          setIsOpen={setIsMobileOpen}
        />
        <MenuDesktop
          menu={navigation.menu}
          hovered={hovered}
          setHovered={setHovered}
        />
      </nav>
    </>
  )
}
