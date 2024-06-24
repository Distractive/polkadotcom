"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { usePathname } from "next/navigation"
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
  const pathname = usePathname()
  const currentPath = useMemo(() => pathname.replace(/^\/+/, ""), [pathname])

  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false)
        setHovered("")
      }
    },
    [isOpen]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown)
    return () => {
      window.removeEventListener("keydown", handleKeydown)
    }
  }, [handleKeydown])

  return (
    <>
      <Overlay isVisible={isOpen} />
      <nav
        ref={ref}
        onMouseLeave={() => setIsOpen(false)}
        className={cn(
          "fixed left-0 right-0 top-0 z-50 m-gutter lg:right-auto",
          "flex flex-col gap-nav text-black lg:gap-2",
          isOpen && isMobile && "bottom-0"
        )}
      >
        <Header
          menu={navigation.menu}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setHovered={setHovered}
          currentPath={currentPath}
        />
        {isMobile ? (
          <MenuMobile
            menu={navigation.menu}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            currentPath={currentPath}
          />
        ) : (
          <MenuDesktop
            menu={navigation.menu}
            hovered={hovered}
            setHovered={setHovered}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            currentPath={currentPath}
          />
        )}
      </nav>
    </>
  )
}
