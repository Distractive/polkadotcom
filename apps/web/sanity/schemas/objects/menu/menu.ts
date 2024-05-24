import { defineField, defineType } from "sanity"

export default defineType({
  name: "menu",
  title: "Menu",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "customUrl",
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "menuItem" }],
    }),
  ],
})
