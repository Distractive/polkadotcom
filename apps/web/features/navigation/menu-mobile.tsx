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

  return (
    <div
      ref={ref}
      className="overflow-scroll rounded-2xl border border-grey-300 bg-white opacity-0"
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
                    "border-r border-grey-300 text-left font-bold"
                  )}
                >
                  {section.heading}
                </CustomUrl>
                <AccordionTrigger
                  aria-label={`Open '${stegaClean(section.heading)}' page links`}
                  className="[&>svg]:mx-nav"
                />
              </div>
              <AccordionContent className="bg-grey-100">
                {section.items.map((item, linkIndex) => {
                  const lastLink = linkIndex === section.items.length - 1
                  const lastSection = sectionIndex === menu.length - 1
                  return (
                    <span
                      key={linkIndex}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex w-full p-nav text-left shadow-internal-border",
                        lastLink && "border-b border-grey-300",
                        lastSection && lastLink && "border-none"
                      )}
                    >
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
