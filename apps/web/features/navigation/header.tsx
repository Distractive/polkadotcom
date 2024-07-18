import { type KeyboardEvent } from "react"
import Link from "next/link"
import { type navigationMenuSelection } from "@/sanity/selections/navigation/navigation-menu"
import { type TypeFromSelection } from "groqd"

import { cn } from "@shared/ui"
import { CustomUrl } from "@/components/custom-url"
import { Logo } from "@/components/logo"

import { Burger } from "./burger"

interface Props {
  menu: ReadonlyArray<TypeFromSelection<typeof navigationMenuSelection>>
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setHovered: React.Dispatch<React.SetStateAction<string>>
}

export function Header({ menu, isOpen, setIsOpen, setHovered }: Props) {
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
    <div className="flex h-nav-height flex-shrink-0 items-start justify-between">
      <div
        className={cn(
          "flex h-full items-center justify-center px-nav lg:pr-0",
          "background-blur rounded-[3rem] border border-grey-300 bg-white/80"
        )}
      >
        <Link
          href="/"
          onClick={handleItemSelect}
          className="translate-x-[-2%] lg:translate-x-0 lg:pr-nav"
        >
          <Logo ariaLabel="Polkadot homepage" className="h-auto w-[9.125rem]" />
        </Link>
        <ul
          className={cn(
            "hidden h-full items-center justify-center gap-nav px-nav lg:flex",
            "border-l border-grey-300 font-bold"
          )}
        >
          {menu.map((item, index) => {
            return (
              <li
                key={index}
                onMouseEnter={() => handleItemHover(item.heading)}
                onKeyDown={(event) => handleKeyDown(event, item)}
                className="relative flex h-full cursor-pointer items-center justify-center transition-colors duration-500 ease-in-out lg:hover:text-pink"
              >
                <CustomUrl
                  value={item.link}
                  onClick={handleItemSelect}
                  className="transition-colors duration-500 ease-in-out hover:text-pink focus:text-pink peer-focus:text-pink"
                >
                  {item.heading}
                </CustomUrl>
                <button
                  className="peer sr-only"
                  aria-expanded={"" === item.heading}
                  onFocus={() => handleItemHover(item.heading)}
                  onBlur={() => handleItemHover("")}
                >
                  Show submenu
                </button>
              </li>
            )
          })}
        </ul>
      </div>
      <Burger isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}
