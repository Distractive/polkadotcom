import { CogIcon, DocumentIcon, DocumentsIcon, SearchIcon } from "@sanity/icons"
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
      name: "tierthree",
      title: "Is Tier 3 page?",
      type: "boolean",
      description:
        "Check if this is a `Tier 3` page so it doesn't create folders",
    }),
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
      name: "breadcrumb",
      type: "string",
      group: "config",
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
      hidden: ({ parent }) => parent.hideHeader,
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
      subtitle: "tierthree",
    },
    prepare: ({ title, subtitle }) => ({
      title,
      media: subtitle ? DocumentIcon : DocumentsIcon,
    }),
  },
})
