import { defineField, defineType } from "sanity"

export default defineType({
  name: "socialLink",
  title: "Social Link",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["https"],
        }),
    }),
  ],
  preview: {
    select: {
      image: "image.asset",
      title: "url",
    },
    prepare({ image, title }) {
      return {
        media: image,
        title: title,
      }
    },
  },
})
