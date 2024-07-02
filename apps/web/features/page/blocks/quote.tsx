import { type quoteSelection } from "@/sanity/selections/blocks/quote"
import { type TypeFromSelection } from "groqd"
import { PortableText } from "next-sanity"

import { cn, Heading } from "@shared/ui"

interface Props {
  className?: string
  quote: TypeFromSelection<typeof quoteSelection>
}

export function QuoteBlock({ quote, className }: Props) {
  return (
    <div className={cn("max-width grid-system gap-card px-gutter", className)}>
      {quote.image && (
        <img
          src={quote.image.asset.url}
          alt=""
          className="col-span-2 w-full rounded-xl md:col-span-1 lg:col-span-2 lg:col-start-2"
        />
      )}
      <div
        className={cn(
          "col-span-full flex flex-col gap-copy lg:col-span-8",
          quote.image ? "lg:col-start-4" : "lg:col-start-3"
        )}
      >
        <PortableText
          value={quote.title}
          components={{
            block: {
              h3: ({ children }) => (
                <Heading variant="h2" size="h3">
                  {children}
                </Heading>
              ),
            },
            marks: {
              highlight: ({ children }) => (
                <strong className="font-medium text-pink">{children}</strong>
              ),
            },
          }}
        />
        {quote.body && (
          <p
            className={cn(
              "text-lg leading-[150%] text-grey-500 md:text-balance",
              className
            )}
          >
            {quote.body}
          </p>
        )}
      </div>
    </div>
  )
}
