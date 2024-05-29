import { DocumentIcon, SearchIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export default defineType({
  name: "card",
  title: "card",
  type: "object",
  groups: [
    { title: "Heading", name: "heading", icon: SearchIcon },
    { title: "Content", name: "content", icon: DocumentIcon },
  ],
  fields: [
    defineField({
      name: "headerImage",
      title: "Header Image",
      type: "image",
      group: "heading",
    }),
    defineField({
      name: "useAsBackgroundImage",
      title: "Use as background image?",
      description:
        "If true, the header image (if there is one) will be displayed as a background image, behind the card content",
      type: "boolean",
      initialValue: false,
      hidden: ({ parent, value }) => !value && !!parent?.headerImage,
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
      group: "content",
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
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 5,
      group: "content",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
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
