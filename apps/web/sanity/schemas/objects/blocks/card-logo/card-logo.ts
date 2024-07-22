import { DocumentIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export default defineType({
  name: "cardLogo",
  title: "Card Logo",
  type: "object",
  groups: [{ title: "Content", name: "content", icon: DocumentIcon }],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "customUrl",
      group: "content",
    }),
  ],
})
