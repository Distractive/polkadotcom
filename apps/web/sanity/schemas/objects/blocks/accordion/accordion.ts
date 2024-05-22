import { defineArrayMember, defineField, defineType } from "sanity"

export default defineType({
  name: "accordion",
  title: "Accordion",
  type: "object",
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Has Numbers",
      name: "hasNumbers",
      type: "boolean",
      description: "Show numbers in front of the accordion heading",
    }),
    defineField({
      name: "items",
      type: "array",
      of: [
        defineArrayMember({
          type: "accordion-item",
        }),
      ],
      validation: (Rule) => Rule.required().min(2).max(4),
    }),
  ],
})
