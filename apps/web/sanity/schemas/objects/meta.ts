import { defineField, defineType } from "sanity"

export default defineType({
  name: "meta",
  title: "Meta",
  type: "object",
  description: "Meta data",
  fields: [
    defineField({
      name: "meta_title",
      title: "Meta Title",
      type: "string",
    }),
    defineField({
      name: "meta_description",
      title: "Meta Description",
      type: "text",
      rows: 5,
    }),
  ],
})
