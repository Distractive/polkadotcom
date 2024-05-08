import { urlForImage } from "@/sanity/lib/image"
import { PortableText } from "@portabletext/react"

interface Props {
  body: any
}

export function Body({ body }: Props) {
  return (
    <PortableText
      value={body}
      components={{
        block: {
          h2: ({ children }) => (
            <h1 className="my-2 font-display text-3xl">{children}</h1>
          ),
          h3: ({ children }) => (
            <h3 className="my-2 font-display text-2xl">{children}</h3>
          ),
        },
        list: {
          bullet: ({ children }) => (
            <ul className="my-4 list-outside list-disc pl-8">{children}</ul>
          ),
          number: ({ children }) => (
            <ol className="my-4 list-outside list-decimal pl-8">{children}</ol>
          ),
        },
        listItem: {
          bullet: ({ children }) => <li>{children}</li>,
          number: ({ children }) => <li>{children}</li>,
        },
        types: {
          image: ({ value }) => {
            return (
              <figure>
                <img
                  className="aspect-2 m-0 block w-full object-cover object-center"
                  src={urlForImage(value.image)}
                  alt={value.alt}
                  loading="lazy"
                />
                <figcaption>{value.caption}</figcaption>
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
