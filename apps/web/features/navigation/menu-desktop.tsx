import { type navigationMenuSelection } from "@/sanity/selections/navigation/navigation-menu"
import { type TypeFromSelection } from "groqd"

import { cn } from "@shared/ui"
import { CustomUrl } from "@/components/custom-url"

interface Props {
  menu: ReadonlyArray<TypeFromSelection<typeof navigationMenuSelection>>
  hovered: string | null
  setHovered: React.Dispatch<React.SetStateAction<string | null>>
}

export function MenuDesktop({ menu, hovered, setHovered }: Props) {
  const handleLinkClick = () => {
    setHovered(null)
  }

  return (
    <div className="lg:grid-pile hidden overflow-hidden">
      {menu.map((section, index) => (
        <div
          key={index}
          className={cn(
            "mb-auto mr-auto flex items-start overflow-hidden",
            "rounded-2xl border border-grey-300 bg-white",
            "transition-visibility duration-500 ease-in-out",
            section.heading === hovered
              ? "pointer-events-auto visible opacity-100"
              : "pointer-events-none invisible opacity-0"
          )}
        >
          <ul className="grid grid-cols-2">
            {section.items.map((item, index) => (
              <li
                key={index}
                className={cn("min-w-[21rem] p-gutter shadow-internal-border")}
              >
                <CustomUrl
                  value={item.link}
                  onClick={handleLinkClick}
                  className="leading-none transition-colors duration-500 ease-in-out hover:text-pink"
                >
                  {item.link.label}
                </CustomUrl>
              </li>
            ))}
            {section.items.length % 2 !== 0 && (
              <li className="min-w-[21rem] shadow-internal-border"></li>
            )}
          </ul>
          {section.aside && (
            <CustomUrl value={section.aside.link} onClick={handleLinkClick}>
              <aside
                className={cn(
                  "group grid h-full max-w-[21rem] gap-copy p-gutter",
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
      ))}
    </div>
  )
}
