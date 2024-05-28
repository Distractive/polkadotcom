import type { footerMenuSelection } from "@/sanity/selections/footer/footer-menu"
import type { TypeFromSelection } from "groqd"

import { Heading, Icon } from "@shared/ui"

interface Props {
  menu: ReadonlyArray<TypeFromSelection<typeof footerMenuSelection>>
}

export default function Menu({ menu }: Props) {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 px-gutter pb-gutter pt-10 sm:grid-cols-2 md:grid-cols-4 md:pt-28 lg:grid-cols-5">
        {menu.map((item, index) => (
          <div
            key={index}
            className="col-span-1 font-default font-bold text-white "
          >
            <Heading
              variant="h2"
              size="sm"
              decoration="uppercase"
              className="font-default font-bold"
            >
              {item.link ? (
                <a
                  href={item.link.external || item.link.internal?.slug || ""}
                  target={item.link.external ? "_blank" : "_self"}
                  className="underline decoration-purple-400 underline-offset-8 transition duration-500 ease-out hover:decoration-white"
                  aria-label={item.link.label}
                >
                  {item.link.label}
                </a>
              ) : (
                item.heading
              )}
            </Heading>
            <ul className="flex flex-col gap-2 py-6">
              {item.items.map((item, index) => (
                <li key={index}>
                  <a
                    className="flex gap-2 text-center underline decoration-purple-500 underline-offset-4 transition duration-500 ease-out hover:decoration-white"
                    href={item.link.external || item.link.internal?.slug || ""}
                    target={item.link.external ? "_blank" : "_self"}
                    aria-label={item.link.label}
                  >
                    {item.link.label}
                    {item.link.external && (
                      <Icon
                        variant="arrowRightUp"
                        className="not-sr-only size-4 fill-white hover:fill-white"
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}
