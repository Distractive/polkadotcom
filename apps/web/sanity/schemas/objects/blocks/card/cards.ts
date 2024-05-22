import { defineArrayMember, defineField, defineType } from "sanity"

export default defineType({
  name: "cards",
  title: "Cards",
  type: "object",
  description: "Create a list of cards",
  groups: [
    { title: "Config", name: "config" },
    { title: "Heading", name: "heading" },
    { title: "Content", name: "contents" },
  ],
  fields: [
    defineField({
      name: "isCarousel",
      title: "Is Carousel?",
      description: "If true, the cards will be displayed in a carousel",
      type: "boolean",
      initialValue: false,
      group: "config",
    }),
    defineField({
      name: "hasTags",
      title: "Has Tags?",
      description: "If true, the card list will have tags filter",
      type: "boolean",
      initialValue: false,
      group: "config",
    }),
    defineField({
      name: "showSideBySide",
      title: "Show Side By Side?",
      description:
        "If true, the cards will be displayed side by side on desktop",
      type: "boolean",
      initialValue: false,
      group: "config",
      hidden: ({ parent, value }) => !value && !!parent?.isCarousel,
    }),
    defineField({
      title: "Heading",
      name: "heading",
      type: "string",
      group: "heading",
    }),
    defineField({
      title: "Body",
      name: "body",
      type: "text",
      rows: 3,
      group: "heading",
    }),
    defineField({
      name: "items",
      type: "array",
      of: [
        defineArrayMember({
          type: "card",
        }),
      ],
      group: "contents",
    }),
  ],
})
