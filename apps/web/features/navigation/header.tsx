import Link from "next/link"
import { type navigationMenuSelection } from "@/sanity/selections/navigation/navigation-menu"
import { stegaClean } from "@sanity/client/stega"
import { type TypeFromSelection } from "groqd"

import { cn } from "@shared/ui"
import { CustomUrl } from "@/components/custom-url"
import { Logo } from "@/components/logo"

import { Burger } from "./burger"
import { getFocusableElements } from "./utils"

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

  const handleCurrentHeading = (heading: string) => {
    setHovered(heading)
    setIsOpen(true)
  }

  function onSubmenuToggleClick(event: React.MouseEvent<HTMLButtonElement>) {
    // Get the button clicked.
    const element = event.target
    if (!(element instanceof HTMLButtonElement)) return
    // Get the element we want to give focus to.
    const targetId = element.getAttribute("aria-controls") ?? ""
    const modal = document.getElementById(targetId)
    if (!(modal instanceof HTMLElement)) return
    // Find the first element that can receive interaction.
    const firstFocusableElement = getFocusableElements(modal)[0]
    // Focus it.
    if (firstFocusableElement) {
      firstFocusableElement.focus()
    }
  }

  return (
    <div className="max-width items-start justify-start">
      <div className="relative flex h-nav-height flex-shrink-0 items-start justify-between px-gutter">
        <div
          className={cn(
            "flex h-full items-center justify-center pl-4 ",
            "rounded-[3rem] border border-grey-300 bg-white"
          )}
        >
          <Link
            href="/"
            onClick={handleItemSelect}
            className="pr-nav"
            aria-label="Navigate to the home page"
          >
            <div className="">
              <Logo ariaLabel="Polkadot homepage" width={140} />
            </div>
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
                  onMouseEnter={() => handleCurrentHeading(item.heading)}
                  className="relative flex h-full cursor-pointer items-center justify-center transition-colors duration-200 ease-in-out lg:hover:text-pink"
                >
                  <CustomUrl
                    value={item.link}
                    onClick={handleItemSelect}
                    className="transition-colors duration-200 ease-in-out hover:text-pink focus:text-pink peer-focus:text-pink"
                  >
                    {item.heading}
                  </CustomUrl>
                  <button
                    className="peer sr-only"
                    aria-expanded={"" === item.heading}
                    aria-controls={stegaClean(item.heading)}
                    onFocus={() => handleCurrentHeading(item.heading)}
                    onClick={onSubmenuToggleClick}
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
    </div>
  )
}
