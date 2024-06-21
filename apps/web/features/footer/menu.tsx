import type { footerMenuSelection } from "@/sanity/selections/footer/footer-menu"
import type { TypeFromSelection } from "groqd"

import { Heading, Icon } from "@shared/ui"
import { CustomUrl } from "@/components/custom-url"

interface Props {
  menu: ReadonlyArray<TypeFromSelection<typeof footerMenuSelection>>
}

export default function Menu({ menu }: Props) {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 px-gutter py-gutter sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        {menu.map((item, index) => (
          <div key={index} className="col-span-1 font-default text-black">
            <Heading
              variant="h2"
              size="h5"
              decoration="uppercase"
              className="font-default"
            >
              {item.link ? (
                <CustomUrl
                  value={item.link}
                  className="underline decoration-grey-400 underline-offset-8 transition duration-500 ease-out hover:decoration-white"
                >
                  {item.link.label}
                </CustomUrl>
              ) : (
                item.heading
              )}
            </Heading>
            <ul className="flex flex-col gap-2 py-6">
              {item.items.map((item, index) => (
                <li key={index}>
                  <CustomUrl
                    value={item.link}
                    className="flex gap-2 text-center font-default underline decoration-grey-200 underline-offset-8 transition duration-500 ease-out hover:decoration-grey-400"
                  >
                    {item.link.label}
                  </CustomUrl>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}
