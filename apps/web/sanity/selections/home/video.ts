import { q, sanityImage } from 'groqd';
import type { Selection } from 'groqd';

export const videoSelection = {
  video: q('video').grab$({
    title: q.string(),
    video: q('video').grab({
      placeholderImage: sanityImage('placeholderImage', {
        withAsset: ['base', 'dimensions'],
      }),
      url: q.string(),
    }),
  }),
} satisfies Selection;
