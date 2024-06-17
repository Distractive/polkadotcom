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

  return (
    <div className="h-nav flex flex-shrink-0 items-start justify-between">
      <div
        className={cn(
          "flex h-full items-center justify-center px-gutter lg:pr-0",
          "rounded-[3rem] border border-grey-300 bg-white"
        )}
      >
        <Link href="/" onClick={handleItemSelect} className="lg:pr-gutter">
          <Logo className="h-auto w-[9.125rem] md:hover:text-pink" />
        </Link>
        <ul
          className={cn(
            "hidden h-full items-center justify-center gap-gutter px-gutter lg:flex",
            "border-l border-grey-300 font-bold"
          )}
        >
          {menu.map((item, index) => (
            <li
              key={index}
              onMouseEnter={() => handleItemHover(item.heading)}
              className="cursor-pointer transition-colors duration-500 ease-in-out lg:hover:text-pink"
            >
              <CustomUrl
                value={item.link}
                onClick={handleItemSelect}
                className="transition-colors duration-500 ease-in-out hover:text-pink"
              >
                {item.heading}
              </CustomUrl>
            </li>
          ))}
        </ul>
      </div>
      <Burger isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}
