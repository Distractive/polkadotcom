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
                  clipText={false}
                  className="flex underline decoration-grey-400 underline-offset-8 transition duration-500 ease-out hover:decoration-black"
                >
                  {item.link.label}
                </CustomUrl>
              ) : (
                <span className="underline decoration-grey-400 underline-offset-8">
                  {item.heading}
                </span>
              )}
            </Heading>
            <ul className="flex flex-col gap-2 py-6">
              {item.items.map((item, index) => (
                <li key={index}>
                  <CustomUrl
                    value={item.link}
                    clipText={false}
                    className="flex gap-2 text-left font-default underline decoration-grey-200 underline-offset-8 transition duration-500 ease-out hover:decoration-black"
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
