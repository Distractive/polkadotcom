import { defineField, defineType } from "sanity"

export default defineType({
  name: "accordion-item",
  title: "Accordion Item",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H4", value: "h4" },
          ],
          marks: {
            decorators: [{ title: "Strong", value: "strong" }],
          },
        },
        {
          type: "break",
          initialValue: { style: "lineBreak" },
        },
        {
          type: "customUrl",
        },
      ],
    }),
  ],
})
