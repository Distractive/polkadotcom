import { CogIcon, DocumentIcon, SearchIcon } from "@sanity/icons"
import { defineArrayMember, defineField, defineType } from "sanity"

import { BLOG_POSTTYPE, PRESS_RELEASE_POSTTYPE } from "@/constants/global"

export default defineType({
  name: "post",
  title: "Post",
  icon: DocumentIcon,
  type: "document",
  groups: [
    { title: "Config", name: "config", icon: CogIcon },
    { title: "Content", name: "content", icon: DocumentIcon },
    { title: "Meta", name: "meta", icon: SearchIcon },
  ],
  fields: [
    defineField({
      name: "meta",
      type: "meta",
      group: "meta",
    }),
    defineField({
      name: "post_type",
      title: "Post Type",
      type: "string",
      options: {
        list: [BLOG_POSTTYPE, PRESS_RELEASE_POSTTYPE],
      },
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
      group: "config",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (rule) => rule.required(),
      group: "config",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      group: "config",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
      group: "config",
    }),
    defineField({
      name: "published_date",
      title: "Published Date",
      description:
        "The date this post was published, does not rely on system fields",
      type: "datetime",
      group: "config",
    }),
    defineField({
      name: "featured_image",
      title: "Featured Image",
      description: "Only for blog posts",
      type: "image",
      group: "content",
    }),
    defineField({
      name: "custom_excerpt",
      title: "Excerpt",
      description: "A custom excerpt for the post, to show on list page",
      type: "text",
      rows: 5,
      group: "content",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
        }),
        defineArrayMember({
          type: "image",
          fields: [
            {
              type: "string",
              name: "alt",
              title: "Alt",
              description: "The alt text of the image",
            },
            {
              type: "text",
              name: "caption",
              title: "Caption",
              description: "If the image needs a caption like a credit etc",
            },
          ],
        }),
        defineArrayMember({
          type: "youtube",
        }),
        defineArrayMember({
          name: "code",
          title: "Code Block",
          type: "code",
        }),
      ],
      group: "content",
    }),
  ],
})
