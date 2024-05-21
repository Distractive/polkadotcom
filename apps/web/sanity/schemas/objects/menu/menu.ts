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
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "menuItem" }],
    }),
  ],
})
