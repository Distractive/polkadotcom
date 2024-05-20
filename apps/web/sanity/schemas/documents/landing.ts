import { defineField, defineType } from "sanity"

export default defineType({
  name: "landing",
  title: "Landing Page",
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
      type: "pageBuilder",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
})
