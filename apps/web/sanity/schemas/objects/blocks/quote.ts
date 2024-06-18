import { HighlightDecorator } from "@/sanity/components/highlight-decorator"
import { HighlightIcon } from "@/sanity/components/highlight-icon"
import { defineField, defineType } from "sanity"

export default defineType({
  name: "quote",
  title: "Quote",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "H3", value: "h3" }],
          marks: {
            decorators: [
              {
                title: "Highlight",
                value: "highlight",
                icon: HighlightIcon,
                component: HighlightDecorator,
              },
            ],
            annotations: [],
          },
          lists: [],
        },
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 5,
    }),
  ],
  preview: {
    select: {
      blocks: "title",
    },
    prepare(value) {
      const block = (value.blocks || []).find(
        (block: any) => block._type === "block"
      )
      return {
        title: block
          ? block.children
              .filter((child: any) => child._type === "span")
              .map((span: any) => span.text)
              .join("")
          : "No title",
        subtitle: "- Quote block",
      }
    },
  },
})
