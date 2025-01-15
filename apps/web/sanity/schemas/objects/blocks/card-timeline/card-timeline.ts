import { defineField, defineType } from "sanity"

export default defineType({
  name: "cardTimeline",
  title: "Timeline",
  type: "object",
  fields: [
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      validation: (Rule) => Rule.required(),
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
            { title: "Large", value: "large" },
          ],
          marks: {
            decorators: [{ title: "Strong", value: "strong" }],
          },
        },
        { type: "customUrl" },
      ],
    }),
  ],
})
