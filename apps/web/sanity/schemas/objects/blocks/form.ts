import { HBSPT_LIST } from "@/sanity/lib/lists"
import { defineField, defineType } from "sanity"

export default defineType({
  name: "form",
  title: "Hubspot Embedded Form",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "formType",
      title: "Form Type",
      type: "string",
      options: {
        list: HBSPT_LIST,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "heading",
    },
    prepare: ({ title }) => ({
      title,
      subtitle: "- Hubspot Embedded Form block",
    }),
  },
})
