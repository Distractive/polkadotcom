import { defineArrayMember, defineField, defineType } from "sanity"

export default defineType({
  name: "cta",
  title: "CTA",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Background Image",
      type: "image",
    }),
    defineField({
      name: "altText",
      title: "Alt Text",
      type: "string",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "isCentered",
      title: "Center the box?",
      type: "boolean",
    }),
    defineField({
      name: "useWhiteText",
      title: "Use white text?",
      type: "boolean",
    }),
    defineField({
      name: "twoThirdsText",
      title: "Reduce text to 2/3rds width to make room for background graphic?",
      type: "boolean",
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
        {
          type: "newsletterButton",
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
      subtitle: "- CTA",
    }),
  },
})
