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
    <>
      <Card
        key={_key}
        className={cn(
          "border-grey-300 bg-grey-100 bg-opacity-80 p-gutter",
          className
        )}
      >
        <CardHeader className="grid gap-copy">
          <Heading variant="h4" size="h2">
            {heading}
          </Heading>
          <CardDescription>{body}</CardDescription>
        </CardHeader>
        {link && (
          <span className="col-span-12 flex items-center pt-card text-xs md:pt-gutter">
            Source:
            <CustomUrl value={link} className="pl-1 font-bold">
              {link.label}
            </CustomUrl>
          </span>
        )}
      </Card>
    </>
  )
}
