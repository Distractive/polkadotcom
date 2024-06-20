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
import { handleActiveLink } from "./helpers"

interface Props {
  menu: ReadonlyArray<TypeFromSelection<typeof navigationMenuSelection>>
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  currentPath: string
}

export function MenuMobile({ menu, isOpen, setIsOpen, currentPath }: Props) {
  const { ref } = useToggleAnimation({ isVisible: isOpen })

  return (
    <div
      ref={ref}
      className="overflow-scroll rounded-2xl border border-grey-300 bg-white opacity-0"
    >
      <Accordion type="single" collapsible defaultValue={undefined}>
        {menu.map((section, sectionIndex) => {
          const isActive = handleActiveLink(section, currentPath)
          return (
            <AccordionItem key={sectionIndex} value={section.heading}>
              <div className="relative flex items-center justify-center shadow-internal-border">
                <span className="flex w-nav items-center justify-center">
                  {isActive && <ActiveMarker />}
                </span>
                <CustomUrl
                  value={section.link}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex-1 pb-nav pr-nav pt-nav",
                    "border-r border-grey-300 text-left font-bold"
                  )}
                >
                  {section.heading}
                </CustomUrl>
                <AccordionTrigger className="[&>svg]:mx-nav" />
              </div>
              <AccordionContent className="bg-grey-100">
                {section.items.map((item, linkIndex) => {
                  const lastLink = linkIndex === section.items.length - 1
                  const lastSection = sectionIndex === menu.length - 1
                  const isActive = handleActiveLink(item, currentPath)
                  return (
                    <span
                      key={linkIndex}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex w-full p-nav pl-0 text-left shadow-internal-border",
                        lastLink && "border-b border-grey-300",
                        lastSection && lastLink && "border-none"
                      )}
                    >
                      <span className="flex w-nav items-center justify-center">
                        <ActiveMarker
                          className={isActive ? "opacity-100" : "opacity-0"}
                        />
                      </span>
                      <CustomUrl value={item.link}>{item.link.label}</CustomUrl>
                    </span>
                  )
                })}
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}
