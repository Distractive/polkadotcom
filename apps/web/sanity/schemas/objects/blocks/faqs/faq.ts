import { defineField, defineType } from "sanity"

export default defineType({
  name: "faq",
  title: "FAQ",
  type: "object",
  fields: [
    defineField({
      name: "question",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
          marks: {
            decorators: [],
            annotations: [],
          },
        },
        {
          type: "customUrl",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
})
