import { defineField, defineType } from "sanity"

export default defineType({
  name: "homeVideo",
  title: "Video",
  type: "object",
  description: "Content for the video section",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "video",
    }),
  ],
})
