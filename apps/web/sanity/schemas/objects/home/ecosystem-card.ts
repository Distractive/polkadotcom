import { defineField, defineType } from "sanity"

export default defineType({
  name: "ecosystemCard",
  title: "Ecosystem Card",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
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
