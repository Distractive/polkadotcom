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
    <div className="h-nav-height flex flex-shrink-0 items-start justify-between">
      <div
        className={cn(
          "px-nav flex h-full items-center justify-center lg:pr-0",
          "rounded-[3rem] border border-grey-300 bg-white"
        )}
      >
        <Link href="/" onClick={handleItemSelect} className="lg:pr-nav">
          <Logo className="h-auto w-[9.125rem] md:hover:text-pink" />
        </Link>
        <ul
          className={cn(
            "gap-nav px-nav hidden h-full items-center justify-center lg:flex",
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
