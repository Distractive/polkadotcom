import { defineArrayMember, defineField, defineType } from "sanity"

export default defineType({
  name: "header",
  title: "Header",
  type: "object",
  fields: [
    defineField({
      name: "isAlternate",
      title: "Use alternate header layout?",
      type: "boolean",
    }),
    defineField({
      name: "image",
      title: "Header Image [1600x400 for alternate layout]",
      type: "image",
    }),
    defineField({
      name: "mobileImage",
      title: "Alternate Layout Mobile Image [400x300]",
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
      name: "links",
      type: "array",
      of: [
        defineArrayMember({
          type: "customUrl",
        }),
      ],
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "video",
    }),
  ],
})
