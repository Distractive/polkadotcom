import type { footerMenuSelection } from "@/sanity/selections/footer/footer-menu"
import type { TypeFromSelection } from "groqd"

import { Heading } from "@shared/ui"
import { CustomUrl } from "@/components/custom-url"
import { ModalButton } from "@/features/page/blocks/modal-button"

interface Props {
  menu: ReadonlyArray<TypeFromSelection<typeof footerMenuSelection>>
  modal: {
    cta: string
    modalHeading: string
    formType: string
    _key: string
  }
}

export default function Menu({ menu, modal }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 px-gutter py-gutter sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      <div className="order-1 col-span-1 font-default text-black md:order-[99]">
        <div className="flex flex-col items-start gap-2">
          <ModalButton modal={modal} buttonClassName="font-medium" />
        </div>
      </div>

      {menu.map((item, index) => (
        <div
          key={item.heading || item.link?.label}
          className="order-2 col-span-1 font-default text-black"
        >
          <Heading
            variant="h2"
            size="h5"
            decoration="uppercase"
            className="font-default"
          >
            {item.link ? (
              <CustomUrl
                value={item.link}
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
              <li key={item.link.label}>
                <CustomUrl
                  value={item.link}
                  className="flex gap-2 text-left font-default font-light underline decoration-black/0 underline-offset-8 transition duration-500 ease-out hover:decoration-black"
                >
                  {item.link.label}
                </CustomUrl>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
