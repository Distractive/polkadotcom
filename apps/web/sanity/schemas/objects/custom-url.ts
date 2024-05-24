import { defineType } from "sanity"

export default defineType({
  name: "customUrl",
  title: "Custom URL",
  type: "object",
  fields: [
    {
      name: "label",
      title: "Label",
      type: "string",
    },
    {
      name: "external",
      type: "url",
      title: "URL",
      hidden: ({ parent, value }) => !value && !!parent?.internal,
      validation: (Rule) =>
        Rule.uri({
          scheme: ["https"],
        }),
    },
    {
      name: "internal",
      type: "reference",
      to: [{ type: "page" }, { type: "landing" }, { type: "hygiene" }],
      hidden: ({ parent, value }) => !value && !!parent?.external,
    },
  ],
})
