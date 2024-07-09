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
        "border-0 bg-grey-100",
        link &&
          "md:cursor-pointer md:hover:shadow-card md:hover:backdrop-blur-0",
        className
      )}
    >
      <CustomUrl value={card.link} isWrapper>
        <div className="flex h-20 items-center justify-center px-card md:h-[7.5rem] lg:px-[1.45rem]">
          <img
            src={image.asset.url}
            alt={name}
            loading="lazy"
            className="w-full"
          />
        </div>
      </CustomUrl>
    </Card>
  )
}
