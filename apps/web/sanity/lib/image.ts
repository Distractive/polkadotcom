import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';

import { env } from '@/env.mjs';

const imageBuilder = createImageUrlBuilder({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
});

export const urlForImage = (source: Image) => {
  // Check if the image is an SVG, don't apply webp conversion
  if (source.mimeType === 'image/svg+xml' || source.extension === 'svg') {
    return imageBuilder?.image(source).url();
  }

  return imageBuilder?.image(source).format('webp').fit('max').url();
};
