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
            <h1 className="font-display my-2 text-3xl">{children}</h1>
          ),
          h3: ({ children }) => (
            <h3 className="font-display my-2 text-2xl">{children}</h3>
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
        },
      }}
    />
  )
}
