"use client"

import { useCallback, useState } from "react"
import { type cardSelection } from "@/sanity/selections/blocks/card"
import type { TypeFromSelection } from "groqd"

import { Button, cn, Icon } from "@shared/ui"
import { DecorativeLine } from "@/components/decorative-line"

import CardBlock from "./card"

interface Props {
  tags: string[] | null
  cards: TypeFromSelection<typeof cardSelection>[]
}

export function CardTags({ tags, cards }: Props) {
  const VISIBLE_COUNT = 6
  const [filteredItems, setFilteredItems] = useState(cards)
  const [currentTag, setCurrentTag] = useState("All")
  const [visibleCount, setVisibleCount] = useState(VISIBLE_COUNT)

  const handleTagClick = useCallback(
    (tag: string) => {
      if (tag === "All") {
        setFilteredItems(cards)
        return
      }
      const filtered = cards.filter((card) => {
        return card.selectedTags?.includes(tag)
      })
      setFilteredItems(filtered)
    },
    [cards]
  )

  const showMoreItems = () => {
    setVisibleCount((prevCount) => prevCount + VISIBLE_COUNT)
  }

  return (
    <>
      <ul className="col-span-12 flex gap-3">
        <li
          key="all"
          className={cn(
            "flex cursor-pointer items-center justify-center rounded bg-grey-200 text-sm leading-relaxed transition-colors  ",
            "hover:bg-purple-500 hover:text-white",
            "relative",
            currentTag === "All" && "bg-purple-500 text-white"
          )}
          aria-label={`Filter by All`}
        >
          <button
            type="button"
            onClick={() => {
              handleTagClick("All")
              setCurrentTag("All")
              setVisibleCount(VISIBLE_COUNT)
            }}
            className="px-4 py-1"
          >
            All
          </button>
        </li>
        {tags?.map((tag) => (
          <li
            key={tag}
            className={cn(
              "flex cursor-pointer items-center justify-center rounded bg-grey-200 text-sm leading-relaxed transition-colors",
              "hover:bg-purple-500 hover:text-white",
              "relative",
              currentTag === tag && "bg-purple-500 text-white"
            )}
            aria-label={`Filter by ${tag}`}
          >
            <button
              type="button"
              onClick={() => {
                handleTagClick(tag)
                setCurrentTag(tag)
                setVisibleCount(VISIBLE_COUNT)
              }}
              className="px-4 py-1"
            >
              {tag}
            </button>
          </li>
        ))}
      </ul>
      <div
        className={cn(
          "grid-system col-span-12 !mx-0 gap-gutter !px-0 lg:col-span-12"
        )}
      >
        {filteredItems.slice(0, visibleCount).map((card) => (
          <CardBlock
            key={card._key}
            card={card}
            className={cn("col-span-12 md:col-span-3 lg:col-span-4")}
          />
        ))}
      </div>
      <DecorativeLine>
        <Button
          variant={
            visibleCount >= filteredItems.length ? "disabled" : "secondary"
          }
          size={"sm"}
          onClick={showMoreItems}
        >
          Show More
          <Icon
            variant="chevronDown"
            className={cn(
              visibleCount >= filteredItems.length && "fill-grey-300"
            )}
          />
        </Button>
      </DecorativeLine>
    </>
  )
}
