"use client"

import { type quoteSelection } from "@/sanity/selections/blocks/quote"
import { type TypeFromSelection } from "groqd"

import { cn } from "@shared/ui"

interface Props {
  className?: string
  quote: TypeFromSelection<typeof quoteSelection>
}

export function QuoteBlock({ quote, className }: Props) {
  return (
    <div className={cn("grid-system gap-card px-gutter", className)}>
      {quote.image && (
        <img
          src={quote.image.asset.url}
          alt=""
          className="col-span-2 w-full rounded-xl md:col-span-1 lg:col-span-2 lg:col-start-2"
        />
      )}
      <div
        className={cn(
          "col-span-full flex flex-col gap-copy lg:col-span-8 lg:col-start-4"
        )}
      >
        <h3
          className={cn(
            "font-display text-5xl leading-[110%] md:text-4xl xl:text-[3.75rem]"
          )}
        >
          {quote.title}
        </h3>
        {quote.body && (
          <p className={cn("text-lg leading-[150%] text-grey-500", className)}>
            {quote.body}
          </p>
        )}
      </div>
    </div>
  )
}
