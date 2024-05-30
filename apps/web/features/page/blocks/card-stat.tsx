import type { cardStatSelection } from "@/sanity/selections/blocks/card-stat"
import type { TypeFromSelection } from "groqd"

import { Card, CardDescription, CardHeader, cn, Heading } from "@shared/ui"

interface Props {
  card: TypeFromSelection<typeof cardStatSelection>
  className?: string
}

export default function CardStatBlock({ card, className }: Props) {
  const { _key, heading, body } = card

  return (
    <Card key={_key} className={cn("bg-grey-100 p-card", className)}>
      <CardHeader className="grid gap-12 md:gap-[8.69rem]">
        <Heading variant="h1">{heading}</Heading>
        <CardDescription>{body}</CardDescription>
      </CardHeader>
    </Card>
  )
}
