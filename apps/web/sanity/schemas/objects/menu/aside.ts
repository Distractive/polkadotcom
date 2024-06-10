import { defineField, defineType } from "sanity"

export default defineType({
  name: "aside",
  title: "Aside",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "customUrl",
    }),
  ],
})
