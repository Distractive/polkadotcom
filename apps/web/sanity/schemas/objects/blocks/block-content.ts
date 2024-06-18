import { defineField, defineType } from "sanity"

export default defineType({
  name: "blockContent",
  title: "Block Content",
  type: "object",
  fields: [
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
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
    defineField({
      name: "fullWidth",
      title: "Full width?",
      description:
        "If false the content will be approximately 2/3 of the screen width on desktop. On mobile it will revert to full width.",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({
      title,
      subtitle: "- Content block",
    }),
  },
})
