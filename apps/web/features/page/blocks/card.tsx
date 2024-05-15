import type { cardSelection } from "@/sanity/selections/blocks/card"
import type { TypeFromSelection } from "groqd"

import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui"

interface Props {
  card: TypeFromSelection<typeof cardSelection>
}
export function CardBlock({ card }: Props) {
  return (
    <Card
      key={card._key}
      className="shadow-small h-full w-full overflow-hidden rounded-md text-black shadow-black/20 outline-0 transition duration-200 ease-in-out"
    >
      <CardHeader></CardHeader>
      <CardContent>
        <CardTitle className="font-display">{card.heading}</CardTitle>
        <p>{card.copy}</p>
      </CardContent>
    </Card>
  )
}
