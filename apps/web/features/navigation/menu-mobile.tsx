import { useState } from "react"
import { type navigationMenuSelection } from "@/sanity/selections/navigation/navigation-menu"
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

import { ActiveMarker } from "./active-marker"

interface Props {
  menu: ReadonlyArray<TypeFromSelection<typeof navigationMenuSelection>>
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function MenuMobile({ menu, isOpen, setIsOpen }: Props) {
  const [active, setActive] = useState<string>("")
  const { ref } = useToggleAnimation({ isVisible: isOpen })

  return (
    <div
      ref={ref}
      className="overflow-scroll rounded-2xl border border-grey-300 bg-white opacity-0"
    >
      <Accordion type="single" collapsible defaultValue={undefined}>
        {menu.map((section, sectionIndex) => (
          <AccordionItem key={sectionIndex} value={section.heading}>
            <div className="relative flex items-center justify-center shadow-internal-border">
              <span className="flex w-gutter items-center justify-center">
                <ActiveMarker isActive={active === section.heading} />
              </span>
              <CustomUrl
                value={section.link}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex-1 pb-gutter pr-gutter pt-gutter",
                  "border-r border-grey-300 text-left font-bold"
                )}
              >
                {section.heading}
              </CustomUrl>
              <AccordionTrigger
                onClick={() => setActive(section.heading)}
                className="[&>svg]:mx-gutter"
              />
            </div>
            <AccordionContent className="bg-grey-100">
              {section.items.map((item, linkIndex) => {
                const lastLink = linkIndex === section.items.length - 1
                const lastSection = sectionIndex === menu.length - 1
                return (
                  <CustomUrl
                    key={linkIndex}
                    value={item.link}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block w-full p-gutter text-left shadow-internal-border",
                      lastLink && "border-b border-grey-300",
                      lastSection && lastLink && "border-none"
                    )}
                  >
                    {item.link.label}
                  </CustomUrl>
                )
              })}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
