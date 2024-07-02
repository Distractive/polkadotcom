"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import type { ReactNode } from "react"
import Link from "next/link"
import type { searchSelection } from "@/sanity/queries/search"
import type { TypeFromSelection } from "groqd"

import { BLOG_POSTTYPE, type PRESS_RELEASE_POSTTYPE } from "@/constants/global"
import { cn, Icon } from "@shared/ui"

interface Props {
  searches: ReadonlyArray<TypeFromSelection<typeof searchSelection>>
  postType: typeof BLOG_POSTTYPE | typeof PRESS_RELEASE_POSTTYPE
}

export function SearchBar({ searches, postType }: Props) {
  const MAX_RESULTS = 30
  const [searchable, setSearchable] = useState<string>("")
  const [findings, setFindings] = useState<Array<number>>([])

  const blogList = useMemo(
    () =>
      searches.map((search) => {
        let title = search.title
        const specialCharactersPattern = /[^A-Za-z0-9\s]/g

        // replace special characters with an empty string
        title = title.replace(specialCharactersPattern, "")
        title = title.toLowerCase()
        return title
      }),
    [searches]
  )

  useEffect(() => {
    // ignoring empty searches
    if (searchable.trim().split(" ").join("").length <= 0) {
      setFindings([])
      return
    }

    let results: Array<{ index: number; score: number }> = []
    blogList.map((title, index) => {
      let score = 0
      searchable
        .trim()
        .split(" ")
        .map((searchTerm) => {
          if (title.indexOf(searchTerm) != -1) {
            score++
          }
        })

      results.push({ index: index, score: score })
    })

    results = results.sort((a, b) => b.score - a.score)

    const finds: Array<number> = results
      .filter((result) => {
        return result.score > 0
      })
      .map((finding) => finding.index)
      .slice(0, MAX_RESULTS)

    setFindings(finds)
  }, [searchable, blogList])

  return (
    <SearchBarContent>
      <SearchBarInput
        hasDrawerResultsOpen={searchable.length > 0}
        onClick={() => {
          setSearchable("")
        }}
        onChange={(value) => {
          setSearchable(value.toLowerCase())
        }}
      />

      <SearchBarResults isOpen={searchable.length > 0}>
        {findings.length > 0 &&
          findings.map((finding) => {
            return (
              <SearchBarListItem
                key={searches[finding]?._id}
                href={
                  postType == BLOG_POSTTYPE
                    ? `/blog/${searches[finding]?.slug}`
                    : `/newsroom/press-releases/${searches[finding]?.slug}`
                }
              >
                {searches[finding]?.title}
              </SearchBarListItem>
            )
          })}

        {searchable.length > 0 && findings.length == 0 && (
          <div className="flex h-28 w-full flex-col flex-wrap items-center justify-center text-blue ">
            <p className="text-center font-bold">No matches found</p>
            <p className="text-center">
              Please check spelling or try using more general terms
            </p>
          </div>
        )}
      </SearchBarResults>
    </SearchBarContent>
  )
}

interface SearchBarInputProps {
  onChange: (value: string) => void
  onClick?: () => void
  hasDrawerResultsOpen: boolean
}

const SearchBarInput = ({
  onChange,
  onClick,
  hasDrawerResultsOpen,
}: SearchBarInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div
      className={cn(
        "peer col-span-full flex items-center gap-1 self-stretch bg-grey-100 p-4 ring-1 ring-inset ring-grey-300 focus-within:ring-grey-500 hover:ring-grey-500",
        "transition-all duration-300",
        hasDrawerResultsOpen ? "rounded-tl-2xl rounded-tr-2xl" : "rounded-2xl"
      )}
    >
      <Icon variant={"magnify"} className="size-6" />
      <input
        aria-label="Enter your search"
        ref={inputRef}
        className="w-full bg-grey-100 text-black outline-none  placeholder:flex placeholder:font-default placeholder:text-grey-500"
        placeholder="Enter your search"
        type="text"
        onChange={(e) => {
          onChange(e.target.value)
        }}
      />
      {hasDrawerResultsOpen && (
        <button
          role="button"
          aria-label="clear field"
          tabIndex={0}
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.value = ""
              inputRef.current.focus()
            }
            if (onClick) onClick()
          }}
          className="group absolute right-4 top-4 outline-none"
        >
          <Icon
            variant={"close"}
            className="size-6 cursor-pointer group-hover:fill-pink group-focus:fill-pink"
          />
        </button>
      )}
    </div>
  )
}

const SearchBarResults = ({
  children,
  isOpen,
}: {
  children: React.ReactNode
  isOpen: boolean
}) => {
  return (
    <div
      className={cn(
        isOpen
          ? "pointer-events-auto top-14 max-h-64 opacity-100"
          : "pointer-events-none top-10 h-0 opacity-80",
        "transition-all duration-300",
        "absolute",
        " w-full flex-col items-start justify-center overflow-auto rounded-bl-2xl rounded-br-2xl",
        "border border-t-0 border-grey-300 bg-grey-100 px-4 py-2 peer-focus-within:border-grey-500 peer-hover:border-grey-500"
      )}
    >
      {children}
    </div>
  )
}

const SearchBarListItem = ({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) => {
  return (
    <Link
      href={href}
      className="line-clamp-1 h-10 overflow-hidden rounded-lg p-2 leading-roomy text-blue hover:bg-grey-300 "
    >
      {children}
    </Link>
  )
}

const SearchBarContent = ({ children }: { children: ReactNode }) => {
  return <div className="relative z-20">{children}</div>
}
