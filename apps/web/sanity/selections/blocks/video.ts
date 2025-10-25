import { q, sanityImage } from 'groqd';
import type { Selection } from 'groqd';

export const videoSelection = {
  isYouTubeVideo: q.boolean().optional().nullable(),
  placeholderImage: sanityImage('placeholderImage', {
    withAsset: ['base', 'dimensions'],
  }).nullable(),
  url: q.string().optional().nullable(),
  videoFile: q('videoFile')
    .grab$({
      asset: q('asset').deref().grab$({
        url: q.string(),
        mimeType: q.string().optional(),
      }),
    })
    .nullable(),
} satisfies Selection;
