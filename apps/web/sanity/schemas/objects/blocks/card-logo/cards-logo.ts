import { defineArrayMember, defineField, defineType } from "sanity"

export default defineType({
  name: "cardsLogo",
  title: "Cards Logo",
  type: "object",
  description: "Create a list of cards containing logos",
  groups: [{ title: "Content", name: "contents" }],
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
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "customUrl",
      group: "content",
    }),
    defineField({
      name: "items",
      type: "array",
      of: [
        defineArrayMember({
          type: "card",
        }),
      ],
      group: "contents",
    }),
  ],
})
