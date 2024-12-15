import { defineField, defineType } from "sanity"

export default defineType({
  name: "video",
  title: "Video",
  type: "object",
  fields: [
    defineField({
      name: "placeholderImage",
      title: "Placeholder Image",
      type: "image",
    }),
    defineField({
      name: "url",
      title: "URL for Video",
      type: "string",
    }),
  ],
})
