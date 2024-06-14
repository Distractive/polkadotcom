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
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "customUrl",
    }),
  ],
})
