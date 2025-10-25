import { q, sanityImage } from 'groqd';
import type { Selection } from 'groqd';

export const videoSelection = {
  useSelfHostedVideo: q.boolean().optional().nullable(),
  url: q.string().optional().nullable(),
  videoFile: q('videoFile.asset->url').nullable(),
  usePlaceholderVideo: q.boolean().optional().nullable(),
  placeholderImage: sanityImage('placeholderImage', {
    withAsset: ['base', 'dimensions'],
  }).nullable(),
  placeholderVideo: q('placeholderVideo.asset->url').nullable(),
  isFullScreen: q.boolean().optional().nullable(),
  aspect: q.string().optional().nullable(),
} satisfies Selection;
