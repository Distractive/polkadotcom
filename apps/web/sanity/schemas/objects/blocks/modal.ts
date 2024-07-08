import { defineField, defineType } from "sanity"

export default defineType({
  name: "modal",
  title: "Modal",
  type: "object",
  groups: [
    { title: "Call to action", name: "cta" },
    { title: "Modal", name: "modal" },
  ],
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      group: "cta",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "string",
      group: "cta",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cta",
      title: "Button label",
      type: "string",
      group: "cta",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "modalHeading",
      title: "Modal Heading",
      type: "string",
      group: "modal",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "formType",
      title: "Form Type",
      type: "string",
      group: "modal",
      options: {
        list: [
          { title: "Newsletter", value: "newsletter" },
          { title: "Contact", value: "contact" },
        ],
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
      subtitle: "- Modal block",
    }),
  },
})
