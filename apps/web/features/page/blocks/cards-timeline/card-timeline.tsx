import type { cardTimelineSelection } from "@/sanity/selections/blocks/card-timeline"
import type { TypeFromSelection } from "groqd"
import { PortableText } from "next-sanity"

import { Button, Card, CardContent, CardHeader, cn } from "@shared/ui"

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
      <CardContent className="group mr-gutter flex h-full flex-col gap-copy rounded-2xl bg-grey-100 p-card">
        <PortableText
          value={card.content}
          components={{
            list: {
              bullet: ({ children }) => (
                <ul className="list-inside list-disc">{children}</ul>
              ),
              number: ({ children }) => (
                <ol className="list-inside list-decimal">{children}</ol>
              ),
            },
            listItem: {
              bullet: ({ children }) => <li>{children}</li>,
              number: ({ children }) => <li>{children}</li>,
            },
            types: {
              customUrl: ({ value }) => {
                return (
                  <Button
                    variant={value.internal ? "primary" : "secondary"}
                    size="sm"
                  >
                    {value.label}
                  </Button>
                )
              },
            },
          }}
        />
      </CardContent>
    </Card>
  )
}
