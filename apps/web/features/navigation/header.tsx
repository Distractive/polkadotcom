import { KeyboardEvent } from "react"
import Link from "next/link"
import { type navigationMenuSelection } from "@/sanity/selections/navigation/navigation-menu"
import { type TypeFromSelection } from "groqd"

import { cn } from "@shared/ui"
import { CustomUrl } from "@/components/custom-url"
import { Logo } from "@/components/logo"

import { ActiveMarker } from "./active-marker"
import { Burger } from "./burger"
import { handleActiveLink } from "./helpers"

interface Props {
  menu: ReadonlyArray<TypeFromSelection<typeof navigationMenuSelection>>
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setHovered: React.Dispatch<React.SetStateAction<string>>
  currentPath: string
}

export function Header({
  menu,
  isOpen,
  setIsOpen,
  setHovered,
  currentPath,
}: Props) {
  const handleItemSelect = () => {
    setHovered("")
    setIsOpen(false)
  }

  const handleItemHover = (heading: string) => {
    setHovered(heading)
    setIsOpen(true)
  }

  const handleKeyDown = (
    event: KeyboardEvent<HTMLLIElement>,
    item: TypeFromSelection<typeof navigationMenuSelection>
  ) => {
    if (event.key === "Enter") {
      handleItemHover(item.heading)
    }
  }

  return (
    <div className="h-nav-height flex flex-shrink-0 items-start justify-between">
      <div
        className={cn(
          "px-nav flex h-full items-center justify-center lg:pr-0",
          "rounded-[3rem] border border-grey-300 bg-white"
        )}
      >
        <Link href="/" onClick={handleItemSelect} className="lg:pr-nav">
          <Logo ariaLabel="Polkadot homepage" className="h-auto w-[9.125rem]" />
        </Link>
        <ul
          className={cn(
            "gap-nav px-nav hidden h-full items-center justify-center lg:flex",
            "border-l border-grey-300 font-bold"
          )}
        >
          {menu.map((item, index) => {
            const isActive = handleActiveLink(item, currentPath)
            return (
              <li
                key={index}
                tabIndex={0}
                onMouseEnter={() => handleItemHover(item.heading)}
                onKeyDown={(event) => handleKeyDown(event, item)}
                className="relative flex h-full cursor-pointer items-center justify-center transition-colors duration-500 ease-in-out lg:hover:text-pink"
              >
                <ActiveMarker
                  className={cn(
                    "absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
                    isActive ? "opacity-100" : "opacity-0"
                  )}
                />
                <CustomUrl
                  value={item.link}
                  onClick={handleItemSelect}
                  className="transition-colors duration-500 ease-in-out hover:text-pink"
                >
                  {item.heading}
                </CustomUrl>
              </li>
            )
          })}
        </ul>
      </div>
      <Burger isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}
