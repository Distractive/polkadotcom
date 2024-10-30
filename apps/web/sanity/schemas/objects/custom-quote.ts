import { defineField, defineType } from "sanity"

export default defineType({
  name: "custom_quote",
  title: "Custom Quote",
  type: "object",
  preview: {
    select: {
      title: "text",
      author: "author",
    },
    prepare({ title, author }) {
      return {
        title: title ? `Quote: ${title.substring(0, 50)}...` : "Empty Quote",
        subtitle: author ? `By ${author}` : "No author",
      }
    },
  },
  fields: [
    defineField({
      name: "text",
      title: "Quote Text",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Author Image",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text",
        },
      ],
    }),
  ],
})
