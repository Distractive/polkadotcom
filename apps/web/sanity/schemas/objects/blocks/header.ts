import { defineField, defineType } from "sanity"

export default defineType({
  name: "header",
  title: "Header",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Header Image",
      type: "image",
    }),
    defineField({
      name: "title",
      title: "Title",
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
    defineField({
      name: "video",
      title: "Video",
      type: "video",
    }),
  ],
})
