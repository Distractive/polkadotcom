import type { cardLogoSelection } from "@/sanity/selections/blocks/card-logo"
import type { TypeFromSelection } from "groqd"

import { Card, cn } from "@shared/ui"
import { CustomUrl } from "@/components/custom-url"

interface Props {
  card: TypeFromSelection<typeof cardLogoSelection>
  className?: string
}

export default function CardLogoBlock({ card, className }: Props) {
  const { _key, name, image, link } = card

  return (
    <Card
      key={_key}
      className={cn(
        "inline-flex items-center justify-center border-0 bg-grey-100",
        "h-16 px-[0.77rem] lg:h-[7.5rem] lg:px-[1.45rem]",
        link &&
          "md:cursor-pointer md:hover:shadow-card md:hover:backdrop-blur-0",
        className
      )}
    >
      <CustomUrl value={card.link}>
        <img
          src={image.asset.url}
          alt={name}
          loading="lazy"
          className="w-full"
        />
      </CustomUrl>
    </Card>
  )
}
