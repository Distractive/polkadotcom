import { defineArrayMember, defineField, defineType } from "sanity"

export default defineType({
  name: "summary",
  title: "Summary",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "titleLink",
      title: "Title Link",
      type: "customUrl",
    }),
    defineField({
      name: "links",
      type: "array",
      of: [
        defineArrayMember({
          type: "customUrl",
        }),
      ],
    }),
    defineField({
      name: "callouts",
      title: "Callouts",
      type: "array",
      of: [
        {
          type: "object",
          name: "callout",
          fields: [
            {
              name: "text",
              title: "Text",
              type: "array",
              of: [
                {
                  type: "block",
                  styles: [],
                  marks: {
                    decorators: [{ title: "Strong", value: "strong" }],
                  },
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
})
