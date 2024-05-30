import { defineArrayMember, defineField, defineType } from "sanity"

export default defineType({
  name: "cardsStat",
  title: "Cards Statistic",
  type: "object",
  description: "Create a list of statistic cards",
  groups: [
    { title: "Config", name: "config" },
    { title: "Heading", name: "heading" },
    { title: "Content", name: "contents" },
  ],
  fields: [
    defineField({
      title: "Heading",
      name: "heading",
      type: "string",
      group: "heading",
    }),
    defineField({
      title: "Body",
      name: "body",
      type: "text",
      rows: 3,
      group: "heading",
    }),
    defineField({
      name: "items",
      type: "array",
      of: [
        defineArrayMember({
          type: "card",
        }),
      ],
      group: "contents",
    }),
  ],
})
