import { BlockElementIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export default defineType({
  name: "navigation",
  type: "document",
  title: "Navigation",
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: "menu",
      type: "array",
      title: "Menu",
      of: [{ type: "menu" }],
    }),
  ],
})
