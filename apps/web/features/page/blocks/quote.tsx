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
    <div
      className={cn(
        "m-gutter md:flex md:items-start lg:justify-center",
        className
      )}
    >
      {quote.image && (
        <img
          src={quote.image.asset.url}
          alt=""
          className="mb-gutter size-[6.125rem] rounded-xl md:mr-gutter md:mt-1 md:size-[11.5rem]"
        />
      )}
      <div className={cn("lg:max-w-5xl")}>
        <h3
          className={cn(
            "font-display text-5xl leading-[110%] md:text-4xl lg:text-[3.75rem]"
          )}
        >
          {quote.title}
        </h3>
        {quote.body && (
          <p
            className={cn(
              "pt-gutter text-lg leading-[150%] text-grey-500",
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
