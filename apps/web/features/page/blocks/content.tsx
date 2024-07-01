import type { contentSelection } from "@/sanity/selections/blocks/content"
import { PortableText } from "@portabletext/react"
import type { TypeFromSelection } from "groqd"

import { Button, cn, Heading } from "@shared/ui"

interface Props {
  content: TypeFromSelection<typeof contentSelection>
}
export function ContentBlock({ content }: Props) {
  return (
    <div className="grid-system max-width pt-header-top px-gutter">
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
              h3: ({ children }) => (
                <Heading variant="h3" size="h2">
                  {children}
                </Heading>
              ),
              h4: ({ children }) => <Heading variant="h4">{children}</Heading>,
            },
            list: {
              bullet: ({ children }) => (
                <ul className="my-4 list-outside list-disc pl-8 text-black marker:text-black">
                  {children}
                </ul>
              ),
              number: ({ children }) => (
                <ol className="my-4 list-outside list-decimal pl-8 text-black marker:text-black">
                  {children}
                </ol>
              ),
            },
            listItem: {
              bullet: ({ children }) => <li>{children}</li>,
              number: ({ children }) => <li>{children}</li>,
            },
            marks: {
              link: ({ children, value }) => {
                const rel = !value.href.startsWith("/")
                  ? "noreferrer noopener"
                  : undefined
                return (
                  <a href={value.href} rel={rel} className="link-styling">
                    {children}
                  </a>
                )
              },
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
