import type { cardStatSelection } from "@/sanity/selections/blocks/card-stat"
import type { TypeFromSelection } from "groqd"
import { PortableText } from "next-sanity"

import {
  Button,
  Card,
  CardDescription,
  CardHeader,
  cn,
  Heading,
  Icon,
} from "@shared/ui"

interface Props {
  card: TypeFromSelection<typeof cardStatSelection>
  className?: string
}

export default function CardStatBlock({ card, className }: Props) {
  const { _key, heading, body, content } = card

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
        {content && (
          <div className="pt-card md:pt-gutter">
            <PortableText
              value={content}
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
                marks: {
                  link: ({ children, value }) => {
                    const rel = !value.href.startsWith("/")
                      ? "noreferrer noopener"
                      : undefined
                    return (
                      <>
                        <a href={value.href} rel={rel} className="font-bold">
                          {children}
                        </a>
                        <Icon
                          variant="arrowRightUp"
                          className={cn(
                            "ml-1 w-4 fill-current lg:w-5",
                            value.variant &&
                              value.variant === "primary" &&
                              "fill-white"
                          )}
                        />
                      </>
                    )
                  },
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
          </div>
        )}
      </Card>
    </>
  )
}
