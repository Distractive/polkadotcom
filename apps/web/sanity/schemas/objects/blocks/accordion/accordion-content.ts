import { defineField, defineType } from "sanity"

export default defineType({
  name: "accordion-content",
  title: "Accordion Content",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "copy",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
  ],
})
