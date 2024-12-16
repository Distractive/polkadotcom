import { useEffect, useRef } from "react"
import { type navigationMenuSelection } from "@/sanity/selections/navigation/navigation-menu"
import { stegaClean } from "@sanity/client/stega"
import { type TypeFromSelection } from "groqd"

import { useToggleAnimation } from "@/hooks/use-toggle-animation"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  cn,
} from "@shared/ui"
import { CustomUrl } from "@/components/custom-url"

interface Props {
  menu: ReadonlyArray<TypeFromSelection<typeof navigationMenuSelection>>
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function MenuMobile({ menu, isOpen, setIsOpen }: Props) {
  const { ref } = useToggleAnimation({ isVisible: isOpen })

  useEffect(() => {
    const menuElement = document.getElementById("page-menu")

    const preventScroll = (e: WheelEvent) => {
      e.stopPropagation()
    }

    if (isOpen && menuElement) {
      menuElement.addEventListener("wheel", preventScroll, { passive: false })
    }

    return () => {
      if (menuElement) {
        menuElement.removeEventListener("wheel", preventScroll)
      }
    }
  }, [isOpen])

  return (
    <div className="z-40 mt-4 flex w-full items-end justify-end">
      <div
        id="page-menu"
        ref={ref}
        className="mx-gutter flex max-h-[80vh] w-full items-end overflow-scroll rounded-2xl border border-grey-200 bg-white opacity-0 md:w-[20rem] "
      >
        <Accordion type="single" collapsible defaultValue={undefined}>
          {menu.map((section, sectionIndex) => {
            return (
              <AccordionItem key={sectionIndex} value={section.heading}>
                <div className="relative flex items-center justify-center shadow-internal-border">
                  <CustomUrl
                    value={section.link}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex-1 p-nav",
                      "border-r border-grey-200 text-left font-bold"
                    )}
                  >
                    {section.heading}
                  </CustomUrl>
                  <AccordionTrigger
                    aria-label={`Open '${stegaClean(section.heading)}' page links`}
                    className="[&>svg]:mx-nav"
                  />
                </div>
                <AccordionContent className="bg-grey-50">
                  {section.items.map((item, linkIndex) => {
                    const lastLink = linkIndex === section.items.length - 1
                    const lastSection = sectionIndex === menu.length - 1
                    return (
                      <span
                        key={linkIndex}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex w-full  p-nav text-left shadow-internal-border",
                          lastLink && "border-b border-grey-200",
                          lastSection && lastLink && "border-none"
                        )}
                      >
                        <CustomUrl value={item.link}>
                          {item.link.label}
                        </CustomUrl>
                      </span>
                    )
                  })}
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </div>
  )
}
