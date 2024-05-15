import { defineArrayMember, defineField, defineType } from "sanity"

export default defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pageBuilder",
      type: "array",
      title: "Page builder",
      description: "Add content to the page using different blocks",
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
      ],
    }),
  ],
})
