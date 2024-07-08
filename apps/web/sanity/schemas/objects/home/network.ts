import { defineArrayMember, defineField, defineType } from "sanity"

export default defineType({
  name: "homeNetwork",
  title: "Network",
  type: "object",
  description: "Content for the network section",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "body",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "items",
      type: "array",
      of: [
        defineArrayMember({
          type: "smallCard",
        }),
      ],
    }),
  ],
})
