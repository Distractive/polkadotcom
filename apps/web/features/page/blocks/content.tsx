import type { contentSelection } from "@/sanity/selections/blocks/content"
import { PortableText } from "@portabletext/react"
import type { TypeFromSelection } from "groqd"

import { Button, cn, Heading } from "@shared/ui"

interface Props {
  content: TypeFromSelection<typeof contentSelection>
}
export function ContentBlock({ content }: Props) {
  return (
    <div className="grid-system max-width px-gutter">
      <div
        className={cn(
          "col-span-full col-start-1 flex flex-col gap-copy",
          !content.fullWidth && "lg:col-span-8"
        )}
      >
        <PortableText
          value={content.content}
          components={{
            block: {
              h2: ({ children }) => <Heading variant="h2">{children}</Heading>,
              h3: ({ children }) => <Heading variant="h3">{children}</Heading>,
              h4: ({ children }) => <Heading variant="h4">{children}</Heading>,
            },
            list: {
              bullet: ({ children }) => (
                <ul className="my-4 list-outside list-disc pl-8 text-black marker:text-black">
                  {children}
                </ul>
              ),
            },
            listItem: {
              bullet: ({ children }) => <li>{children}</li>,
            },
            types: {
              customUrl: ({ value }) => {
                return (
                  <Button
                    variant={value.internal ? "primary" : "secondary"}
                    size="sm"
                    className="mr-auto mt-copy"
                  >
                    {value.label}
                  </Button>
                )
              },
            },
          }}
        />
      </div>
    </div>
  )
}
