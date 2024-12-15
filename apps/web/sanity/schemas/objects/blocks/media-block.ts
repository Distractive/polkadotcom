import { defineArrayMember, defineField, defineType } from "sanity"

export default defineType({
  name: "mediaBlock",
  title: "Media Block",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "video",
    }),
    defineField({
      name: "isFullWidthVideo",
      title: "Makes the video full width.",
      type: "boolean",
      initialValue: false,
    }),
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
      name: "body",
      title: "Body",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "links",
      type: "array",
      of: [
        defineArrayMember({
          type: "customUrl",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "heading",
    },
    prepare: ({ title }) => {
      return {
        title: title || "Media",
        subtitle: "- Media block",
      }
    },
  },
})
