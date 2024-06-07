import { useEffect, useState } from "react"
import { type navigationMenuSelection } from "@/sanity/selections/navigation/navigation-menu"
import { type TypeFromSelection } from "groqd"

import { useBreakpoint } from "@/hooks/use-breakpoint"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  cn,
} from "@shared/ui"

import { ActiveMarker } from "./active-marker"

interface Props {
  menu: ReadonlyArray<TypeFromSelection<typeof navigationMenuSelection>>
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function MenuMobile({ menu, isOpen, setIsOpen }: Props) {
  const [active, setActive] = useState<string>("")
  const isMobile = useBreakpoint("--screen-lg")

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    if (!isMobile) setIsOpen(false)
  }, [isMobile, setIsOpen])

  const lastSection = menu.length - 1

  return (
    <div
      className={cn(
        "flex flex-col gap-2 overflow-hidden lg:hidden",
        "rounded-2xl border border-grey-300 bg-white opacity-0",
        "transition-visibility duration-500 ease-in-out",
        isOpen
          ? "pointer-events-auto visible opacity-100"
          : "pointer-events-none invisible opacity-0"
      )}
    >
      <Accordion type="single" collapsible defaultValue={undefined}>
        {menu.map((section, sectionIndex) => (
          <AccordionItem key={sectionIndex} value={section.heading}>
            <AccordionTrigger
              onClick={() => setActive(section.heading)}
              className="relative flex items-center justify-center shadow-internal-border"
            >
              <span className="flex w-gutter items-center justify-center">
                <ActiveMarker isActive={active === section.heading} />
              </span>
              <span
                key={section.heading}
                className={cn(
                  "flex-1 pb-gutter pr-gutter pt-gutter",
                  "border-r border-grey-300 text-left font-bold"
                )}
              >
                {section.heading}
              </span>
            </AccordionTrigger>
            <AccordionContent className="bg-grey-100">
              {section.items.map((item, linkIndex) => (
                <button
                  key={linkIndex}
                  onClick={() => handleLinkClick()}
                  className={cn(
                    "block w-full p-gutter text-left shadow-internal-border",
                    // Give the last link a border bottom
                    linkIndex === section.items.length - 1 &&
                      "border-b border-grey-300",
                    // Remove borders from the last link in the last section
                    sectionIndex === lastSection &&
                      linkIndex === section.items.length - 1 &&
                      "border-none"
                  )}
                >
                  {item.link.label}
                </button>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
