import { q } from 'groqd';
import type { Selection } from 'groqd';

import { navigationMenuSelection } from './navigation-menu';

export const navigationSelection = {
  menu: q('menu')
    .filter()
    .grab({
      ...navigationMenuSelection,
    }),
} satisfies Selection;
