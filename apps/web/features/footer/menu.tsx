import type { footerMenuSelection } from "@/sanity/selections/footer-menu"
import type { TypeFromSelection } from "groqd"

import { Heading } from "@shared/ui"

interface Props {
  menu: ReadonlyArray<TypeFromSelection<typeof footerMenuSelection>>
}

export default function Menu({ menu }: Props) {
  return (
    <>
      <ul>
        {menu.map((item, index) => (
          <li key={index}>
            <Heading variant="h4">{item.heading}</Heading>
            <ul>
              {item.items.map((item, index) => (
                <li key={index}>{item.link.label}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  )
}
