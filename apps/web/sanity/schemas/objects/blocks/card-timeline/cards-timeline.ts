import { defineArrayMember, defineField, defineType } from "sanity"

export default defineType({
  name: "cardsTimeline",
  title: "Cards Timeline",
  type: "object",
  description: "Create a timeline ",
  fields: [
    defineField({
      title: "Heading",
      name: "heading",
      type: "string",
    }),
    defineField({
      name: "items",
      type: "array",
      of: [
        defineArrayMember({
          type: "cardTimeline",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "heading",
    },
    prepare: ({ title }) => ({
      title,
      subtitle: "- Timeline block",
    }),
  },
})
