import { DocumentIcon, SearchIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export default defineType({
  name: "cardSticky",
  title: "Card Sticky",
  type: "object",
  groups: [
    { title: "Heading", name: "heading", icon: SearchIcon },
    { title: "Content", name: "content", icon: DocumentIcon },
  ],
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      group: "heading",
      hidden: ({ parent, value }) => !value && !!parent?.icon,
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
      group: "content",
      hidden: ({ parent, value }) => !value && !!parent?.image,
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 5,
      group: "content",
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "customUrl",
      group: "content",
    }),
  ],
})
