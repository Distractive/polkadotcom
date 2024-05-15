import { defineArrayMember, defineField, defineType } from "sanity"

export default defineType({
  name: "cards",
  title: "Cards",
  type: "object",
  description: "Create a list of cards",
  fields: [
    defineField({
      title: "Heading",
      name: "heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isCarousel",
      title: "Is Carousel?",
      description: "If true, the cards will be displayed in a carousel",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "items",
      type: "array",
      of: [
        defineArrayMember({
          type: "card",
        }),
      ],
    }),
  ],
})
