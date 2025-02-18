import { q } from 'groqd';
import type { Selection } from 'groqd';

import { faqsSelection } from '../selections/blocks/faqs';
import { accordionSelection } from './blocks/accordion';
import { buttonBlockSelection } from './blocks/button-block';
import { cardsSelection } from './blocks/cards';
import { cardsLogoSelection } from './blocks/cards-logo';
import { cardsSmallSelection } from './blocks/cards-small';
import { cardsStatSelection } from './blocks/cards-stat';
import { cardsStickySelection } from './blocks/cards-sticky';
import { cardsTimelineSelection } from './blocks/cards-timeline';
import { contentSelection } from './blocks/content';
import { countdownTimerSelection } from './blocks/countdown-timer';
import { ctaSelection } from './blocks/cta';
import { formSelection } from './blocks/form';
import { mediaBlockSelection } from './blocks/media-block';
import { modalSelection } from './blocks/modal';
import { quoteSelection } from './blocks/quote';
import { sideBySideSelection } from './blocks/side-by-side';

export const pageBuilderSelection = {
  pageBuilder: q('pageBuilder.pageBuilder')
    .filter()
    .select({
      '_type == "faqs"': {
        _type: q.literal('faqs'),
        ...faqsSelection,
      },
      '_type == "accordion"': {
        _type: q.literal('accordion'),
        ...accordionSelection,
      },
      '_type == "buttonBlock"': {
        _type: q.literal('buttonBlock'),
        ...buttonBlockSelection,
      },
      '_type == "cards"': {
        _type: q.literal('cards'),
        ...cardsSelection,
      },
      '_type == "cardsSmall"': {
        _type: q.literal('cardsSmall'),
        ...cardsSmallSelection,
      },
      '_type == "cardsSticky"': {
        _type: q.literal('cardsSticky'),
        ...cardsStickySelection,
      },
      '_type == "cardsTimeline"': {
        _type: q.literal('cardsTimeline'),
        ...cardsTimelineSelection,
      },
      '_type == "cardsStat"': {
        _type: q.literal('cardsStat'),
        ...cardsStatSelection,
      },
      '_type == "cardsLogo"': {
        _type: q.literal('cardsLogo'),
        ...cardsLogoSelection,
      },
      '_type == "blockContent"': {
        _type: q.literal('blockContent'),
        ...contentSelection,
      },
      '_type == "sideBySide"': {
        _type: q.literal('sideBySide'),
        ...sideBySideSelection,
      },
      '_type == "quote"': {
        _type: q.literal('quote'),
        ...quoteSelection,
      },
      '_type == "mediaBlock"': {
        _type: q.literal('mediaBlock'),
        ...mediaBlockSelection,
      },
      '_type == "modal"': {
        _type: q.literal('modal'),
        ...modalSelection,
      },
      '_type == "form"': {
        _type: q.literal('form'),
        ...formSelection,
      },
      '_type == "cta"': {
        _type: q.literal('cta'),
        ...ctaSelection,
      },
      '_type == "countdownTimer"': {
        _type: q.literal('countdownTimer'),
        ...countdownTimerSelection,
      },
      default: {
        _key: q.string(),
        _type: ['"unsupported"', q.literal('unsupported')],
        unsupportedType: ['_type', q.string()],
      },
    })
    .nullable(),
} satisfies Selection;
