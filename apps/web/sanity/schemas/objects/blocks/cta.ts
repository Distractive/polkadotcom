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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "useWhiteText",
      title: "Use white text?",
      type: "boolean",
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
    prepare: ({ title }) => ({
      title,
      subtitle: "- CTA",
    }),
  },
})
