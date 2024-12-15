import { Key } from "react"
import Image from "next/image"
import { urlForImage } from "@/sanity/lib/image"
import { PortableText } from "@portabletext/react"

import { cn, Heading } from "@shared/ui"
import { CustomUrl } from "@/components/custom-url"

interface Props {
  body: any
}

export function Body({ body }: Props) {
  return (
    <PortableText
      value={body}
      components={{
        marks: {
          link: ({ children, value }) => {
            const isExternal = value.href.startsWith("http")
            return (
              <a
                className="inline-flex font-default font-bold text-grey-900 underline  underline-offset-2 transition-colors duration-200 ease-in-out hover:text-pink"
                href={value.href}
                target={isExternal ? "_blank" : "_self"}
                rel={isExternal ? "noopener noreferrer" : ""}
              >
                {children}
              </a>
            )
          },
        },
        block: {
          normal: ({ children }) => (
            <p className="mb-6 font-default text-lg text-grey-900">
              {children}
            </p>
          ),
          h1: ({ children }) => (
            <Heading variant={"h1"} className="mb-4 mt-12">
              {children}
            </Heading>
          ),
          h2: ({ children }) => (
            <Heading variant={"h2"} className="mb-4 mt-16">
              {children}
            </Heading>
          ),
          h3: ({ children }) => (
            <Heading variant={"h3"} className="mb-4 mt-16">
              {children}
            </Heading>
          ),
          h4: ({ children }) => (
            <Heading variant={"h4"} className="mb-4 mt-16">
              {children}
            </Heading>
          ),
        },
        list: {
          bullet: ({ children }) => (
            <ul className="mx-0 my-4 list-outside list-disc pl-7 text-grey-900 md:my-6">
              {children}
            </ul>
          ),
          number: ({ children }) => (
            <ol className="mx-0 my-4 list-outside list-decimal pl-7 text-grey-900 md:my-6">
              {children}
            </ol>
          ),
        },
        listItem: {
          bullet: ({ children }) => <li className="text-lg">{children}</li>,
          number: ({ children }) => <li className="text-lg">{children}</li>,
        },
        types: {
          image: ({ value }) => {
            return (
              <figure className="my-6">
                <img
                  className="aspect-2 m-0 mb-4 block w-full rounded-2xl object-cover object-center"
                  src={urlForImage(value.image)}
                  alt={value.alt}
                  loading="lazy"
                />
                <figcaption className="mx-auto w-5/6 text-sm italic">
                  {value.caption}
                </figcaption>
              </figure>
            )
          },
          code: ({ value }) => {
            return (
              <pre className="overflow-x-auto p-4">
                <code>{value.code}</code>
              </pre>
            )
          },
          youtube: ({ value }) => {
            return (
              <iframe
                title={value.title}
                width="560"
                height="315"
                src={value.url}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              />
            )
          },
          custom_quote: ({ value }) => {
            return (
              <div className="mx-auto my-10 text-lg">
                <blockquote className="rounded-3xl border border-grey-400  p-4 text-grey-900 md:p-12">
                  <div className="flex flex-col items-start gap-10 md:flex-row">
                    {value.image && (
                      <div className="shrink-0">
                        <div className="w-[10rem] overflow-hidden rounded-3xl">
                          <img
                            src={urlForImage(value.image)}
                            alt={value.image.alt || `Image of ${value.author}`}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    )}
                    <div className="flex flex-col justify-center">
                      {value.text && (
                        <p className="font-default">{value.text}</p>
                      )}
                      {value.author && (
                        <footer className="mt-4">
                          <cite className="font-default font-bold not-italic">
                            - {value.author}
                          </cite>
                        </footer>
                      )}
                    </div>
                  </div>
                </blockquote>
              </div>
            )
          },
          summary: ({ value }) => {
            const callouts = value.callouts || []

            const linkTitle =
              value.titleLink.internal || value.titleLink.external

            return (
              <div className="mx-auto mb-10 text-lg">
                <div className="rounded-3xl border border-grey-400  p-8 text-grey-900 md:p-12">
                  <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                    {/* First Column: Sector and Links */}
                    <div className="pr-4 xl:col-span-1">
                      <Heading variant="h3" className="mb-4">
                        {linkTitle ? (
                          <CustomUrl
                            value={value.titleLink}
                            className="hover:cursor-pointer hover:text-pink "
                          >
                            {value.title}
                          </CustomUrl>
                        ) : (
                          value.title
                        )}
                      </Heading>
                      {value.links && value.links.length > 0 && (
                        <ul className="list-disc pl-5">
                          {value.links.map((link: any, index: Key) => (
                            <li key={index}>
                              <CustomUrl
                                className="inline-flex gap-2 text-left  underline decoration-black/0 underline-offset-4 transition duration-500 ease-out hover:decoration-black"
                                value={link}
                              >
                                {link.label}
                              </CustomUrl>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Second and Third Columns: Callouts */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:col-span-2">
                      {callouts.map((callout: any, index: Key) => (
                        <div key={index} className="font-default">
                          <PortableText
                            value={callout.text}
                            components={{
                              marks: {
                                strong: ({ children }) => (
                                  <strong className="font-bold">
                                    {children}
                                  </strong>
                                ),
                                link: ({ children, value }) => {
                                  const isExternal =
                                    value.href.startsWith("http")
                                  return (
                                    <a
                                      className="inline-flex font-bold underline underline-offset-2 transition-colors duration-500 ease-in-out hover:text-pink"
                                      href={value.href}
                                      target={isExternal ? "_blank" : "_self"}
                                      rel={
                                        isExternal ? "noopener noreferrer" : ""
                                      }
                                    >
                                      {children}
                                    </a>
                                  )
                                },
                              },
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          },
        },
      }}
    />
  )
}
