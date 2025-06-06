import type { pageBuilderSelection } from '@/sanity/selections/page-builder';
import type { TypeFromSelection } from 'groqd';

import NotFound from '@/app/(site)/not-found';
import { AccordionBlock } from '@/features/page/blocks/accordion';
import { ButtonBlock } from '@/features/page/blocks/button-block';
import { CardsLogoBlock } from '@/features/page/blocks/cards-logo/cards-logo';
import { CardsSmallBlock } from '@/features/page/blocks/cards-small/cards-small';
import { CardsStatBlock } from '@/features/page/blocks/cards-stats/cards-stat';
import { CardsStickyBlock } from '@/features/page/blocks/cards-sticky/cards';
import { CardsTimelineBlock } from '@/features/page/blocks/cards-timeline/cards-timeline';
import { CardsBlock } from '@/features/page/blocks/cards/cards';
import { ContentBlock } from '@/features/page/blocks/content';
import { FAQBlock } from '@/features/page/blocks/faqs';
import { EmbedFormBlock } from '@/features/page/blocks/form-embed';
import { FormModalBlock } from '@/features/page/blocks/form-modal';
import { MediaBlock } from '@/features/page/blocks/media-block';
import { QuoteBlock } from '@/features/page/blocks/quote';
import { SideBySideBlock } from '@/features/page/blocks/side-by-side';

import { CountdownTimer } from './blocks/countdown-timer';
import { CTA } from './blocks/cta';

interface Props {
  pageBuilder: TypeFromSelection<typeof pageBuilderSelection>['pageBuilder'];
}

export function PageBuilder({ pageBuilder }: Props) {
  return pageBuilder?.map((item) => {
    switch (item._type) {
      case 'faqs':
        return <FAQBlock faqs={item} />;
      case 'accordion':
        return <AccordionBlock accordion={item} />;
      case 'cards':
        return <CardsBlock cards={item} />;
      case 'buttonBlock':
        return <ButtonBlock buttonBlock={item} />;
      case 'cardsSmall':
        return <CardsSmallBlock cards={item} />;
      case 'cardsSticky':
        return <CardsStickyBlock cards={item} />;
      case 'cardsTimeline':
        return <CardsTimelineBlock cards={item} />;
      case 'cardsStat':
        return <CardsStatBlock cards={item} />;
      case 'cardsLogo':
        return <CardsLogoBlock cards={item} />;
      case 'blockContent':
        return <ContentBlock content={item} />;
      case 'sideBySide':
        return <SideBySideBlock content={item} />;
      case 'quote':
        return <QuoteBlock quote={item} />;
      case 'mediaBlock':
        return <MediaBlock mediaBlock={item} />;
      case 'modal':
        return <FormModalBlock modal={item} />;
      case 'form':
        return <EmbedFormBlock form={item} />;
      case 'cta':
        return <CTA cta={item} />;
      case 'countdownTimer':
        return <CountdownTimer countdownTimer={item} />;
      case 'notfound':
        return <NotFound />;
      default:
        return <p>Unknown type: {item._type}</p>;
    }
  });
}
