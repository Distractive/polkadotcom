import { defineArrayMember, defineField, defineType } from "sanity"

export default defineType({
  name: "homeConnected",
  title: "Connected",
  type: "object",
  description: "Content for the connected section",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "items",
      type: "array",
      of: [
        defineArrayMember({
          type: "connectedCard",
        }),
      ],
    }),
  ],
})
