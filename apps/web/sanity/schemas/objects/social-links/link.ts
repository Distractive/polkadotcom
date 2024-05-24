import { defineField, defineType } from "sanity"

export default defineType({
  name: "socialLink",
  title: "Social Link",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "The title of the social link, used for screen readers.",
    }),
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
      title: "title",
    },
    prepare({ image, title }) {
      return {
        media: image,
        title: title,
      }
    },
  },
})
