import type { cardStatSelection } from "@/sanity/selections/blocks/card-stat"
import type { TypeFromSelection } from "groqd"

import { Card, CardDescription, CardHeader, cn, Heading } from "@shared/ui"
import { CustomUrl } from "@/components/custom-url"

interface Props {
  card: TypeFromSelection<typeof cardStatSelection>
  className?: string
}

export default function CardStatBlock({ card, className }: Props) {
  const { _key, heading, body, link } = card

  return (
    <div className={cn(link && "relative", className)}>
      <Card
        key={_key}
        className={cn(
          "border-grey-300 bg-grey-100 bg-opacity-80 p-gutter",
          className
        )}
      >
        <CardHeader className="grid gap-4">
          <Heading variant="h2" className="text-3xl leading-snug md:text-5xl">
            {heading}
          </Heading>
          <CardDescription>{body}</CardDescription>
        </CardHeader>
      </Card>
      {link && (
        <span className="absolute bottom-[-3rem] col-span-12 hidden text-xs lg:flex lg:items-center lg:pl-gutter">
          Source:
          <CustomUrl value={link} className="font-bold">
            {link.label}
          </CustomUrl>
        </span>
      )}
    </div>
  )
}
