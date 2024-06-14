"use client"

import { useState } from "react"
import type { navigationSelection } from "@/sanity/selections/navigation/navigation"
import type { TypeFromSelection } from "groqd"

import { useBreakpoint } from "@/hooks/use-breakpoint"
import { useHideOnScroll } from "@/hooks/use-hide-on-scroll"
import { cn } from "@shared/ui"

import { Header } from "./header"
import { MenuDesktop } from "./menu-desktop"
import { MenuMobile } from "./menu-mobile"
import { Overlay } from "./overlay"

interface Props {
  navigation: TypeFromSelection<typeof navigationSelection>
}

export default function NavigationLayout({ navigation }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [hovered, setHovered] = useState<string>("")
  const isMobile = useBreakpoint("--screen-lg")
  const { ref } = useHideOnScroll()

  return (
    <>
      <Overlay isVisible={isOpen} />
      <nav
        ref={ref}
        onMouseLeave={() => setIsOpen(false)}
        className={cn(
          "fixed left-0 right-0 top-0 z-50 m-gutter lg:right-auto",
          "flex flex-col gap-gutter text-black lg:gap-2",
          isOpen && "bottom-0"
        )}
      >
        <Header
          menu={navigation.menu}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setHovered={setHovered}
        />
        {isMobile ? (
          <MenuMobile
            menu={navigation.menu}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        ) : (
          <MenuDesktop
            menu={navigation.menu}
            hovered={hovered}
            setHovered={setHovered}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        )}
      </nav>
    </>
  )
}
