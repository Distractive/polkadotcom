import { q } from 'groqd';
import type { Selection } from 'groqd';

import { singletonMetaSelection } from '../singleton-meta';
import { buildSelection } from './build';
import { connectedSelection } from './connected';
import { ecosystemSelection } from './ecosystem';
import { heroSelection } from './hero';
import { networkSelection } from './network';
import { statsSelection } from './stats';
import { videoSelection } from './video';
import { newsletterCTASelection } from '../blocks/newsletter-cta';

export const homeSelection = {
  home: q('*')
    .filterByType('home')
    .grab$({
      ...heroSelection,
      ...videoSelection,
      ...connectedSelection,
      ...ecosystemSelection,
      ...statsSelection,
      ...networkSelection,
      ...buildSelection,
      ...singletonMetaSelection,
      newsletterCTA: q('newsletterCTA')
        .filter()
        .grab$({ ...newsletterCTASelection }),
    })
    .slice(0),
} satisfies Selection;
