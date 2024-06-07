import { defineArrayMember, defineField, defineType } from "sanity"

export default defineType({
  name: "faqs",
  title: "FAQs",
  type: "object",
  description: "Each FAQ item will be displayed as a question and answer pair.",
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      type: "array",
      of: [
        defineArrayMember({
          type: "faq",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({
      title,
      subtitle: "- FAQs block",
    }),
  },
})
