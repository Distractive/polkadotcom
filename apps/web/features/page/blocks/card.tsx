import Image from "next/image"
import { urlForImage } from "@/sanity/lib/image"
import type { cardSelection } from "@/sanity/selections/blocks/card"
import type { TypeFromSelection } from "groqd"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  Heading,
} from "@shared/ui"

interface Props {
  card: TypeFromSelection<typeof cardSelection>
}
export function CardBlock({ card }: Props) {
  return (
    <Card
      key={card._key}
      className="shadow-small h-full w-full overflow-hidden rounded-md text-black shadow-black/20 outline-0 transition duration-200 ease-in-out"
    >
      {card.headerImage && (
        <CardHeader>
          <Image
            src={urlForImage(card.headerImage.asset)}
            alt=""
            loading="lazy"
            width={card.headerImage.asset.metadata.dimensions?.width}
            height={card.headerImage.asset.metadata.dimensions?.height}
          />
        </CardHeader>
      )}
      <CardContent>
        {card.icon && (
          <div className="size-[4.5rem] overflow-hidden rounded-[1rem] bg-pink">
            <Image
              src={urlForImage(card.icon.asset)}
              alt=""
              loading="lazy"
              width={card.icon.asset.metadata.dimensions?.width}
              height={card.icon.asset.metadata.dimensions?.height}
            />
          </div>
        )}
        {card.tags && card.tags.map((tag) => <span key={tag}>{tag}</span>)}
        {card.eyebrow && <span>{card.eyebrow}</span>}
        <Heading variant="h3">{card.heading}</Heading>
        {card.body && <CardDescription>{card.body}</CardDescription>}
      </CardContent>
      {card.link && <CardFooter>{/* CTA */}</CardFooter>}
    </Card>
  )
}
