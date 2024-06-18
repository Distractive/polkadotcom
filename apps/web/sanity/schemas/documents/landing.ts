import { CogIcon, DocumentIcon, SearchIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

export default defineType({
  name: "landing",
  title: "Landing Page",
  type: "document",
  groups: [
    { title: "Config", name: "config", icon: CogIcon },
    { title: "Content", name: "content", icon: DocumentIcon },
    { title: "Meta", name: "meta", icon: SearchIcon },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
      description: "The title of the page used for navigation",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      group: "config",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "meta",
      type: "meta",
      group: "meta",
    }),
    defineField({
      name: "header",
      title: "Header",
      type: "header",
      group: "config",
    }),

    defineField({
      name: "pageBuilder",
      type: "pageBuilder",
      group: "content",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
})
