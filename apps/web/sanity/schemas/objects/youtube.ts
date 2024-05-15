import { PlayIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"

import { YouTubePreview } from "../../previews/youtube"

export default defineType({
  name: "youtube",
  type: "object",
  title: "YouTube Embed",
  icon: PlayIcon,
  components: { preview: YouTubePreview },
  fields: [
    defineField({
      name: "url",
      type: "url",
      title: "YouTube iframe embed src",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
  ],
  preview: {
    select: {
      url: "url",
      title: "title",
    },
  },
})
