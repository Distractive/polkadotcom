import { urlForImage } from "@/sanity/lib/image"
import { PortableText } from "@portabletext/react"

import { Heading } from "@shared/ui"

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
        },
      }}
    />
  )
}
