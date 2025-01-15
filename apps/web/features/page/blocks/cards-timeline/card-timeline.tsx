import type { cardTimelineSelection } from "@/sanity/selections/blocks/card-timeline"
import type { TypeFromSelection } from "groqd"
import { PortableText } from "next-sanity"

import { Button, Card, CardContent, CardHeader, cn, Heading } from "@shared/ui"
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
        " flex flex-col rounded-none border-0 pt-4 md:pt-6",
        className
      )}
    >
      <CardHeader
        className={cn(
          "grid gap-2 border-t border-grey-300 pb-4 font-display",
          !hasLine && "border-0"
        )}
      >
        <span className="inline-block size-6 -translate-y-1/2 rounded-full bg-pink"></span>
        <h3 className="mr-gutter text-lg leading-[1.8rem] md:text-2xl">
          {card.year}
        </h3>
      </CardHeader>

      <CardContent className="group mr-gutter flex h-full flex-col  gap-copy rounded-2xl border border-grey-300 p-card">
        {card.content && (
          <PortableText
            value={card.content}
            components={{
              block: {
                normal: ({ children }) => (
                  <p className="mb-4 font-default  text-grey-800">{children}</p>
                ),
                large: ({ children }) => (
                  <p className="font-default text-lg text-black">{children}</p>
                ),
              },
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
              marks: {
                link: ({ children, value }) => {
                  const rel = !value.href.startsWith("/")
                    ? "noreferrer noopener"
                    : undefined
                  return (
                    <a href={value.href} rel={rel} className="link-styling">
                      {children}
                    </a>
                  )
                },
              },
              types: {
                customUrl: ({ value }) => {
                  return (
                    <div>
                      <Button
                        asChild
                        variant={
                          value?.variant
                            ? value.variant === "primary"
                              ? "primary"
                              : "secondary"
                            : "primary"
                        }
                        size="md"
                      >
                        <CustomUrl className="outline-none" value={value}>
                          {value.label}
                        </CustomUrl>
                      </Button>
                    </div>
                  )
                },
              },
            }}
          />
        )}
      </CardContent>
    </Card>
  )
}
