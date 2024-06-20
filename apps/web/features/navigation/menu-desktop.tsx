import { type navigationMenuSelection } from "@/sanity/selections/navigation/navigation-menu"
import { type TypeFromSelection } from "groqd"

import { useToggleAnimation } from "@/hooks/use-toggle-animation"
import { cn } from "@shared/ui"
import { CustomUrl } from "@/components/custom-url"

import { ActiveMarker } from "./active-marker"
import { handleActiveLink } from "./helpers"

interface Props {
  menu: ReadonlyArray<TypeFromSelection<typeof navigationMenuSelection>>
  hovered: string
  setHovered: React.Dispatch<React.SetStateAction<string>>
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  currentPath: string
}

export function MenuDesktop({
  menu,
  hovered,
  isOpen,
  setIsOpen,
  setHovered,
  currentPath,
}: Props) {
  const { ref } = useToggleAnimation({ isVisible: isOpen })

  const handleLinkClick = () => {
    setHovered("")
    setIsOpen(false)
  }

  return (
    <div ref={ref} className="overflow-hidden opacity-0">
      {menu.map(
        (section, index) =>
          section.heading === hovered && (
            <div
              key={index}
              className={cn(
                "mb-auto mr-auto flex items-start overflow-hidden",
                "rounded-2xl border border-grey-300 bg-white"
              )}
            >
              <ul className="grid grid-cols-2">
                {section.items.map((item, index) => {
                  const isActive = handleActiveLink(item, currentPath)
                  return (
                    <li
                      key={index}
                      className={cn(
                        "flex min-w-[21rem] p-nav pl-0 shadow-internal-border"
                      )}
                    >
                      <span className="flex w-nav items-center justify-center">
                        <ActiveMarker
                          className={isActive ? "opacity-100" : "opacity-0"}
                        />
                      </span>
                      <CustomUrl
                        value={item.link}
                        onClick={handleLinkClick}
                        className="leading-none transition-colors duration-500 ease-in-out hover:text-pink"
                      >
                        {item.link.label}
                      </CustomUrl>
                    </li>
                  )
                })}
                {section.items.length % 2 !== 0 && (
                  <li className="min-w-[21rem] shadow-internal-border"></li>
                )}
              </ul>
              {section.aside && (
                <CustomUrl value={section.aside.link} onClick={handleLinkClick}>
                  <aside
                    className={cn(
                      "group grid h-full max-w-[21rem] gap-copy p-nav",
                      "cursor-pointer border-l border-grey-300"
                    )}
                  >
                    <img
                      src={section.aside.image.asset.url}
                      alt=""
                      className="w-full"
                    />
                    <p className="text-lg font-bold transition-colors duration-500 ease-in-out group-hover:text-pink">
                      {section.aside.heading}
                    </p>
                  </aside>
                </CustomUrl>
              )}
            </div>
          )
      )}
    </div>
  )
}
