import { defineField, defineType } from "sanity"

export default defineType({
  name: "sideBySide",
  title: "Side by Side",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "string",
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "video",
    }),
    defineField({
      title: "Image",
      name: "image",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "altText",
      title: "Alt Text",
      type: "string",
    }),
    defineField({
      title: "is image on left?",
      name: "isImageOnLeft",
      type: "boolean",
      initialValue: false,
      description:
        "Show the image on the left side of the content, on desktop only",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H3", value: "h3" },
            { title: "Smallprint", value: "smallprint" },
          ],
          marks: {
            decorators: [{ title: "Strong", value: "strong" }],
          },
        },
        {
          type: "break",
          initialValue: { style: "lineBreak" },
        },
        {
          type: "customUrl",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "heading",
    },
    prepare: ({ title }) => ({
      title,
      subtitle: "- Side by side block",
    }),
  },
})
