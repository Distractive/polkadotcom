import { defineField, defineType } from "sanity"

export default defineType({
  name: "notfound",
  title: "Page 404",
  type: "document",
  fields: [
    defineField({
      name: "headerImage",
      title: "Header Image",
      type: "image",
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "customUrl",
    }),
  ],
})
