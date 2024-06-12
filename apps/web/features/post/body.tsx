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
                className="inline-flex font-default font-bold underline underline-offset-2  transition-colors duration-500 ease-in-out hover:text-pink"
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
            <p className="mb-6 font-default text-lg">{children}</p>
          ),
          h1: ({ children }) => (
            <Heading variant={"h1"} className="mb-6">
              {children}
            </Heading>
          ),
          h2: ({ children }) => (
            <Heading variant={"h2"} className="mb-6">
              {children}
            </Heading>
          ),
          h3: ({ children }) => (
            <Heading variant={"h3"} className="mb-6">
              {children}
            </Heading>
          ),
          h4: ({ children }) => (
            <Heading variant={"h4"} className="mb-6">
              {children}
            </Heading>
          ),
        },
        list: {
          bullet: ({ children }) => (
            <ul className="mx-0 my-8 list-outside list-disc pl-7 md:my-12">
              {children}
            </ul>
          ),
          number: ({ children }) => (
            <ol className="mx-0 my-8 list-outside list-decimal pl-7 md:my-12">
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
              <figure className="my-12 md:my-24">
                <img
                  className="aspect-2 m-0 mb-4 block w-full rounded-2xl object-cover object-center"
                  src={urlForImage(value.image)}
                  alt={value.alt}
                  loading="lazy"
                />
                <figcaption className="text-lg">{value.caption}</figcaption>
              </figure>
            )
          },
          code: ({ value }) => {
            return (
              <pre className="overflow-x-auto border-8 border-l-grey-500 p-4">
                <code className="font-default">{value.code}</code>
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
