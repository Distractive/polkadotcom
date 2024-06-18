import type { cardTimelineSelection } from "@/sanity/selections/blocks/card-timeline"
import type { TypeFromSelection } from "groqd"

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  cn,
} from "@shared/ui"
import { CustomUrl } from "@/components/custom-url"

interface Props {
  card: TypeFromSelection<typeof cardTimelineSelection>
  hasLine?: boolean
  className?: string
}

export default function CardTimelineBlock({
  card,
  hasLine = true,
  className,
}: Props) {
  return (
    <Card
      className={cn(
        "flex flex-col rounded-none border-0 pt-4 md:pt-6",
        className
      )}
    >
      <CardHeader
        className={cn(
          "grid border-t border-grey-400 font-display text-2xl",
          !hasLine && "border-0"
        )}
      >
        <span className="inline-block size-gutter -translate-y-1/2 rounded-full bg-pink"></span>
        <span className="pb-2">{card.year}</span>
      </CardHeader>
      <div className="group mr-gutter flex flex-grow flex-col gap-card rounded-2xl bg-grey-100 p-card">
        <CardContent className="grid gap-2">
          <p className="font-bold">{card.heading}</p>
          {card.body && <p>{card.body}</p>}
        </CardContent>
        {card.link && (
          <CardFooter className="mt-auto">
            <Button variant="secondary" size="sm">
              <CustomUrl value={card.link}>{card.link.label}</CustomUrl>
            </Button>
          </CardFooter>
        )}
      </div>
    </Card>
  )
}
