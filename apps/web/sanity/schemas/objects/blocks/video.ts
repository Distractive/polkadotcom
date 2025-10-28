import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'video',
  title: 'Video',
  type: 'object',
  fields: [
    defineField({
      name: 'useSelfHostedVideo',
      title: 'Use a self-hosted video?',
      description: 'Leave this unchecked for YouTube videos.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'useSquareAspectRatio',
      title: 'Use Square Aspect Ratio',
      description:
        'Turn on to use a 1:1 aspect ratio for the placeholder and video container.',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }) => !parent?.useSelfHostedVideo,
    }),
    defineField({
      name: 'isFullScreen',
      title: 'Enable Fullscreen Mode',
      description:
        'When enabled, adds a button to launch the video in fullscreen mode. Only works with self-hosted videos.',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }) => !parent?.useSelfHostedVideo,
    }),
    defineField({
      name: 'url',
      title: 'YouTube URL',
      type: 'string',
      hidden: ({ parent }) => parent?.useSelfHostedVideo,
    }),
    defineField({
      name: 'videoFile',
      title: 'Self-Hosted Video File',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      hidden: ({ parent }) => !parent?.useSelfHostedVideo,
    }),
    defineField({
      name: 'usePlaceholderVideo',
      title: 'Use a placeholder video?',
      description:
        'When enabled, the placeholder video will replace the placeholder image and will autoplay continuously without controls until clicked.',
      type: 'boolean',
      initialValue: false,
      hidden: ({ parent }) => !parent?.useSelfHostedVideo,
    }),
    defineField({
      name: 'placeholderImage',
      title: 'Placeholder Image',
      description:
        "Use a placeholder image that matches your video's aspect ratio. (Gifs are supported.)",
      type: 'image',
      hidden: ({ parent }) => parent?.usePlaceholderVideo,
    }),
    defineField({
      name: 'placeholderVideo',
      title: 'Placeholder Video',
      description:
        "Upload a placeholder video that matches your main video's aspect ratio. This will loop silently until clicked.",
      type: 'file',
      options: {
        accept: 'video/*',
      },
      hidden: ({ parent }) =>
        !parent?.useSelfHostedVideo || !parent?.usePlaceholderVideo,
    }),
  ],
});
