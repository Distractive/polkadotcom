import { defineField, defineType } from "sanity"

export default defineType({
  name: "card",
  title: "card",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "copy",
      title: "Copy",
      type: "text",
    }),
    defineField({
      name: "headerImage",
      title: "Header Image",
      type: "image",
    }),
    defineField({
      name: "headerAspect",
      title: "Header Aspect Ratio",
      type: "string",
      options: {
        list: ["square", "landscape", "portrait"],
      },
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "customUrl",
    }),
  ],
})
