import { type navigationMenuSelection } from "@/sanity/selections/navigation/navigation-menu"
import { stegaClean } from "@sanity/client/stega"
import { type TypeFromSelection } from "groqd"

import { useToggleAnimation } from "@/hooks/use-toggle-animation"
import { cn } from "@shared/ui"
import { CustomUrl } from "@/components/custom-url"

interface Props {
  menu: ReadonlyArray<TypeFromSelection<typeof navigationMenuSelection>>
  hovered: string
  setHovered: React.Dispatch<React.SetStateAction<string>>
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function MenuDesktop({
  menu,
  hovered,
  isOpen,
  setIsOpen,
  setHovered,
}: Props) {
  const { ref } = useToggleAnimation({ isVisible: isOpen })

  const handleCloseMenu = () => {
    setHovered("")
    setIsOpen(false)
  }

  return (
    <div
      ref={ref}
      id="page-menu"
      className="max-width grid-pile popacity-0 overflow-hidden px-gutter"
    >
      {menu.map((section, index) => (
        <div
          key={index}
          onMouseLeave={handleCloseMenu}
          id={`${stegaClean(section.heading)}`}
          className={cn(
            "mb-auto mr-auto flex items-start overflow-hidden",
            "rounded-2xl border border-grey-300 bg-white",
            section.heading === hovered
              ? "pointer-events-auto visible"
              : "pointer-events-none invisible"
          )}
        >
          <ul className="grid grid-cols-2">
            {section.items.map((item, index) => {
              return (
                <li
                  key={index}
                  className={cn(
                    "flex min-w-[21rem] p-nav shadow-internal-border"
                  )}
                >
                  <CustomUrl
                    value={item.link}
                    onClick={handleCloseMenu}
                    className="leading-none transition-colors duration-500 ease-in-out hover:text-pink focus:text-pink"
                    tabIndex={0}
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
            <CustomUrl value={section.aside.link} onClick={handleCloseMenu}>
              <aside
                role="complementary"
                className={cn(
                  "group grid h-full max-w-[21rem] gap-copy p-nav",
                  "cursor-pointer border-l border-grey-300"
                )}
              >
                <img
                  src={section.aside.image.asset.url || ""}
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
      ))}
    </div>
  )
}
