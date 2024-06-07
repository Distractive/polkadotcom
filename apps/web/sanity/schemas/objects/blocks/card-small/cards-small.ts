import { defineArrayMember, defineField, defineType } from "sanity"

export default defineType({
  name: "cardsSmall",
  title: "Cards Small",
  type: "object",
  description: "Create a list of small cards",
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
          type: "cardSmall",
        }),
      ],
      group: "contents",
    }),
  ],
  preview: {
    select: {
      title: "heading",
    },
    prepare: ({ title }) => ({
      title,
      subtitle: "- Small Cards block",
    }),
  },
})
