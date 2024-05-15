import { defineArrayMember, defineField, defineType } from "sanity"

export default defineType({
  name: "accordion-item",
  title: "Accordion Item",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        defineArrayMember({
          type: "accordion-content",
        }),
      ],
      validation: (Rule) => Rule.required().min(1).max(3),
    }),
  ],
})
