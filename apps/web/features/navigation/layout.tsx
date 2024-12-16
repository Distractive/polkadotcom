"use client"

import { useCallback, useEffect, useState } from "react"
import type { navigationSelection } from "@/sanity/selections/navigation/navigation"
import type { TypeFromSelection } from "groqd"

import { useBreakpoint } from "@/hooks/use-breakpoint"
import { useHideOnScroll } from "@/hooks/use-hide-on-scroll"
import { cn } from "@shared/ui"

import { Header } from "./header"
import { MenuDesktop } from "./menu-desktop"
import { MenuMobile } from "./menu-mobile"
import { Overlay } from "./overlay"
import SkipToContent from "./skip-to-content"

interface Props {
  navigation: TypeFromSelection<typeof navigationSelection>
}

export default function NavigationLayout({ navigation }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [hovered, setHovered] = useState<string>("")
  const isMobile = useBreakpoint("--screen-lg")
  const { ref } = useHideOnScroll()

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
    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen, isMobile])

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown)
    return () => {
      window.removeEventListener("keydown", handleKeydown)
    }
  }, [handleKeydown])

  const onLeave = () => {
    if (isMobile) return
    if (ref.current) {
      if (ref.current.matches(":focus-within")) {
        return
      } else {
        setIsOpen(false)
      }
    }
  }

  return (
    <>
      <nav
        role="navigation"
        ref={ref}
        onMouseLeave={onLeave}
        onBlur={onLeave}
        className={cn(
          "fixed left-0 right-0 top-0 z-[100]",
          "flex flex-col  text-black lg:gap-2",
          isOpen && isMobile && "bottom-0"
        )}
      >
        <SkipToContent />

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

      <Overlay isVisible={isOpen && isMobile} />
    </>
  )
}
