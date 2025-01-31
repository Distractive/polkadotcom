import type { contentSelection } from "@/sanity/selections/blocks/content"
import { PortableText } from "@portabletext/react"
import type { TypeFromSelection } from "groqd"

import { Button, cn, Heading } from "@shared/ui"
import { CustomUrl } from "@/components/custom-url"

interface Props {
  content: TypeFromSelection<typeof contentSelection>
}

interface BreakNode {
  _type: "break"
  style: "break"
}

export function ContentBlock({ content }: Props) {
  return (
    <div className={cn("grid-system max-width px-gutter")}>
      <div
        className={cn(
          "col-span-full col-start-1 flex flex-col gap-copy justify-self-center  text-grey-900",
          !content.fullWidth && "lg:col-span-8",
          content.isCentered && "text-center lg:col-start-3",
          content.isCentered && content.fullWidth && "lg:col-start-1"
        )}
      >
        {content.content && (
          <PortableText
            value={content.content}
            components={{
              block: {
                h2: ({ children }) => (
                  <Heading variant="h2">{children}</Heading>
                ),
                h3: ({ children }) => (
                  <Heading variant="h3" size="h2">
                    {children}
                  </Heading>
                ),
                h4: ({ children }) => (
                  <Heading variant="h4">{children}</Heading>
                ),
              },
              list: {
                bullet: ({ children }) => (
                  <ul className="my-4 list-outside list-disc pl-8 marker:text-black">
                    {children}
                  </ul>
                ),
                number: ({ children }) => (
                  <ol className="my-4 list-outside list-decimal pl-8 text-grey-900 marker:text-black ">
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
                      size="md"
                      className="mr-auto mt-copy"
                      asChild
                    >
                      <CustomUrl
                        className="outline-none"
                        value={{
                          internal: value?.internal,
                          external: value?.external,
                        }}
                      >
                        {value.label}
                      </CustomUrl>
                    </Button>
                  )
                },
                break: ({ value }: { value: BreakNode }) => {
                  return <br className="my-4" />
                },
              },
            }}
          />
        )}
      </div>
    </div>
  )
}
