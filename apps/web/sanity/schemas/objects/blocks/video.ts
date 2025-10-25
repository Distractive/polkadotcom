import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'video',
  title: 'Video',
  type: 'object',
  fields: [
    defineField({
      name: 'isYouTubeVideo',
      title: 'Use a YouTube video?',
      description: 'Leave this unchecked for self-hosted videos.',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'placeholderImage',
      title: 'Placeholder Image',
      description:
        "Use a 16:9 placeholder for YouTube videos. For self-hosted videos, use an image that matches your video's aspect ratio.",
      type: 'image',
    }),
    defineField({
      name: 'url',
      title: 'YouTube URL',
      type: 'string',
      hidden: ({ parent }) => !parent?.isYouTubeVideo,
    }),
    defineField({
      name: 'videoFile',
      title: 'Self-Hosted Video File',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      hidden: ({ parent }) => parent?.isYouTubeVideo,
    }),
  ],
});
