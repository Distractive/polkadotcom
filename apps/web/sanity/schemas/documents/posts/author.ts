import { UserIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export default defineType({
  name: "author",
  title: "Author",
  icon: UserIcon,
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "g_id",
      title: "Ghost ID: Will delete after migration",
      type: "string",
    }),
  ],
})
