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
      title: "Header Image [Regular: 1000x750, Alternate: 1600x400]",
      type: "image",
    }),
    defineField({
      name: "mobileImage",
      title: "Alternate Layout Mobile Image [400x300]",
      type: "image",
    }),
    defineField({
      name: "altText",
      title: "Alt Text",
      type: "string",
    }),
    defineField({
      name: "hideBreadcrumbs",
      title: "Hide breadcrumbs?",
      type: "boolean",
      initialValue: false,
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
