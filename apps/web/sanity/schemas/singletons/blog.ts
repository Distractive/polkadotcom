import { defineField, defineType } from "sanity"

export default defineType({
  name: "blog",
  title: "Blog",
  type: "document",
  groups: [
    { title: "Config", name: "config" },
    { title: "Heading", name: "heading" },
  ],
  fields: [
    defineField({
      name: "parent",
      type: "reference",
      to: [{ type: "landing" }],
      options: {
        filter: "!defined(parent)",
      },
      group: "config",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "config",
      options: {
        source: "title",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "headerImage",
      title: "Header Image",
      type: "image",
      group: "heading",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      group: "heading",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 5,
      group: "heading",
      validation: (Rule) => Rule.required(),
    }),
  ],
})
