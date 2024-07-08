import { defineField, defineType } from "sanity"

export default defineType({
  name: "smallCard",
  title: "Small Card",
  type: "object",
  fields: [
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
      rows: 2,
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "customUrl",
    }),
  ],
})
