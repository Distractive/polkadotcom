import type { cardSmallSelection } from "@/sanity/selections/blocks/card-small"
import type { TypeFromSelection } from "groqd"

import {
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  cn,
  Heading,
  Icon,
} from "@shared/ui"
import { CustomUrl } from "@/components/custom-url"

interface Props {
  card: TypeFromSelection<typeof cardSmallSelection>
  className?: string
}

export default function CardSmallBlock({ card, className }: Props) {
  const { _key, heading, body, link, icon, eyebrow } = card

  return (
    <Card
      key={_key}
      className={cn(
        "flex justify-between gap-card p-card",
        icon ? "items-center" : "items-start",
        link &&
          "md:cursor-pointer md:hover:shadow-card md:hover:backdrop-blur-0",
        link?.external && "flex",
        className
      )}
    >
      {icon && (
        <img
          src={icon.asset.url}
          alt=""
          loading="lazy"
          className={cn("size-12 object-cover object-center")}
        />
      )}
      <CardHeader className="grid gap-copy">
        {eyebrow && (
          <span className="text-base font-bold uppercase text-grey-500">
            {eyebrow}
          </span>
        )}
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
        {body && (
          <CardDescription className="text-grey-500">{body}</CardDescription>
        )}
        {link && link.external && (
          <Button variant="secondary" size="lg" className="md:mr-auto">
            <CustomUrl value={link}>{link.label}</CustomUrl>
          </Button>
        )}
      </CardHeader>
      {link && link.internal && (
        <CardFooter>
          <Icon variant="arrowRight" />
        </CardFooter>
      )}
    </Card>
  )
}
