import { defineArrayMember, defineField, defineType } from "sanity"

export default defineType({
  name: "pageBuilder",
  type: "object",
  fields: [
    defineField({
      name: "pageBuilder",
      type: "array",
      description: "Add content to the page using different blocks",
      validation: (Rule) => Rule.required().min(1),
      of: [
        defineArrayMember({
          name: "faqs",
          type: "faqs",
        }),
        defineArrayMember({
          name: "accordion",
          type: "accordion",
        }),
        defineArrayMember({
          name: "cards",
          type: "cards",
        }),
        defineArrayMember({
          name: "cardsSmall",
          type: "cardsSmall",
        }),
        defineArrayMember({
          name: "cardsTimeline",
          type: "cardsTimeline",
        }),
        defineArrayMember({
          name: "cardsStat",
          type: "cardsStat",
        }),
        defineArrayMember({
          name: "cardsLogo",
          type: "cardsLogo",
        }),
        defineArrayMember({
          name: "blockContent",
          type: "blockContent",
        }),
        defineArrayMember({
          name: "quote",
          type: "quote",
        }),
      ],
    }),
  ],
})
