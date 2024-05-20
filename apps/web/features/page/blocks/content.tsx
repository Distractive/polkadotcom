import type { contentSelection } from "@/sanity/selections/blocks/content"
import { PortableText } from "@portabletext/react"
import type { TypeFromSelection } from "groqd"

import { Heading } from "@shared/ui"

interface Props {
  content: TypeFromSelection<typeof contentSelection>["content"]
}
export function ContentBlock({ content }: Props) {
  return (
    <PortableText
      value={content}
      components={{
        block: {
          h2: ({ children }) => <Heading variant="h2">{children}</Heading>,
          h3: ({ children }) => <Heading variant="h3">{children}</Heading>,
          h4: ({ children }) => <Heading variant="h4">{children}</Heading>,
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
      }}
    />
  )
}
