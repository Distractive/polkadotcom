import { type Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getGlossary } from "@/sanity/queries/glossary"
import { getSingletonMeta } from "@/sanity/queries/page"
import { cleanTerm, groupEntriesByLetter } from "@/utils/glossary/glossaryUtils"

import { Heading } from "@shared/ui"
import { HeaderBlock } from "@/features/page/blocks/header"
import { Body } from "@/features/post/body"
import { SearchBar } from "@/features/posts/search-bar"

import AlphabetNav from "./alphabet-nav"

export const dynamicParams = true

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getSingletonMeta("glossary")

  if (!meta) {
    return {
      title: "Glossary Not Found | Polkadot",
      description: "The glossary page you're looking for could not be found.",
    }
  }

  return {
    title: meta?.meta?.meta_title || "Polkadot Glossary",
    description:
      meta?.meta?.meta_description ||
      "Explore key terms and concepts in the Polkadot ecosystem. A comprehensive glossary explaining the terminology used in blockchain interoperability, shared security, and Polkadot's innovative technology.",
    openGraph: {
      images: [meta?.meta?.meta_image?.asset.path || ""],
      title: meta?.meta?.meta_title || "Polkadot Glossary",
      description:
        meta?.meta?.meta_description ||
        "Explore key terms and concepts in the Polkadot ecosystem. A comprehensive glossary explaining the terminology used in blockchain interoperability, shared security, and Polkadot's innovative technology.",
    },
  }
}

export default async function Page() {
  const data = await getGlossary()
  if (!data) {
    return notFound()
  }

  const groupedEntries = groupEntriesByLetter(data.entries)

  const availableLetters = Object.keys(groupedEntries).sort()

  return (
    <div className="max-width grid-system col-span-full">
      {data.header && (
        <HeaderBlock header={data.header} className="!mb-12 !text-grey-900" />
      )}
      <div className="col-span-full px-gutter lg:col-span-8 lg:col-start-3">
        <div className="mb-6 max-w-[24rem]">
          <SearchBar
            searches={data.entries.map((entry) => ({
              _id: entry._id,
              title: cleanTerm(true, entry.term),
              cleanedTerm: cleanTerm(false, entry.term),
              slug: entry.term,
            }))}
            postType="glossary"
          />
        </div>

        <AlphabetNav availableLetters={availableLetters} />

        {availableLetters.map((letter) => (
          <section
            key={letter}
            id={`section-${letter}`}
            className="mb-16 scroll-mt-24 md:scroll-mt-10"
          >
            <Heading variant="h2" className="mb-8 text-5xl font-bold">
              {letter}
            </Heading>

            {groupedEntries[letter]?.map((entry) => (
              <div
                key={entry._id}
                className="mb-12 scroll-mt-24 md:scroll-mt-10"
                data-term={cleanTerm(false, entry.term)}
                id={cleanTerm(false, entry.term)}
              >
                <div>
                  {entry.createFullPageEntry ? (
                    <div className="">
                      <Link
                        href={`/glossary/${entry.slug?.current || ""}`}
                        className="group outline-none"
                      >
                        <div className="flex flex-row gap-2">
                          <Heading
                            variant="h3"
                            className="mb-2 group-hover:text-pink"
                          >
                            {entry.term}
                          </Heading>
                          <div className="text-lg font-bold text-black group-hover:text-pink">
                            →
                          </div>
                        </div>
                      </Link>
                    </div>
                  ) : (
                    <div className="flex flex-row gap-2">
                      <Heading variant="h3" className="mb-2">
                        {entry.term}
                      </Heading>
                    </div>
                  )}
                </div>

                <Body body={entry.shortEntry} />
                {entry.createFullPageEntry && (
                  <Link
                    href={`/glossary/${entry.slug?.current || ""}`}
                    className="inline-block text-pink-500 hover:cursor-pointer hover:underline"
                  >
                    Read more &nbsp;→
                  </Link>
                )}
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  )
}
