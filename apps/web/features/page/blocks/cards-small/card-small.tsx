import type { cardSmallSelection } from "@/sanity/selections/blocks/card-small"
import type { TypeFromSelection } from "groqd"

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  cn,
  Heading,
  Icon,
} from "@shared/ui"

interface Props {
  card: TypeFromSelection<typeof cardSmallSelection>
  className?: string
}

export default function CardSmallBlock({ card, className }: Props) {
  const { _key, heading, body, link } = card

  return (
    <Card
      key={_key}
      className={cn(
        "flex items-start justify-between gap-card p-card",
        link &&
          "md:cursor-pointer md:hover:shadow-card md:hover:backdrop-blur-0",
        className
      )}
    >
      <CardHeader className="grid gap-copy">
        {heading && (
          <Heading
            variant="h4"
            className={cn(
              "text-balance transition-colors duration-500 ease-in-out",
              link && "md:group-hover:text-pink"
            )}
          >
            {heading}
          </Heading>
        )}
        {body && <CardDescription>{body}</CardDescription>}
      </CardHeader>
      {link && (
        <CardFooter>
          {link.external ? (
            <Icon variant="arrowRightUp" />
          ) : (
            <Icon variant="arrowRight" />
          )}
        </CardFooter>
      )}
    </Card>
  )
}
