import type { homeSelection } from '@/sanity/selections/home/root';
import type { TypeFromSelection } from 'groqd';

import { ScrollFadeWrapper } from '@/animations/scroll/fade-up';
import { Ecosystem } from '@/features/home/sections/ecosystem';
import { Hero } from '@/features/home/sections/hero';
import { SmallCardsHome } from '@/features/home/sections/small-cards-home';
import { Stats } from '@/features/home/sections/stats';
import { CardsBlock } from '../page/blocks/cards/cards';
import { NewsletterCTA } from '../page/blocks/newsletter-cta';

interface Props {
  home: TypeFromSelection<typeof homeSelection>['home'];
}

export function Root({ home }: Props) {
  return (
    <div>
      <Hero hero={home.hero} backgroundVideo={home.video} />
      <ScrollFadeWrapper className="py-section" data-testid="network-cards">
        <SmallCardsHome cards={home.network} />
      </ScrollFadeWrapper>
      <ScrollFadeWrapper className="py-section">
        {home.cards?.[0] && <CardsBlock cards={home.cards[0]} />}
      </ScrollFadeWrapper>
      <ScrollFadeWrapper className="py-section">
        <Stats stats={home.stats} />
      </ScrollFadeWrapper>
      <ScrollFadeWrapper className="py-section">
        <Ecosystem ecosystem={home.ecosystem} />
      </ScrollFadeWrapper>
      <ScrollFadeWrapper className="py-section" data-testid="build-cards">
        <SmallCardsHome cards={home.build} />
      </ScrollFadeWrapper>
      <ScrollFadeWrapper className="py-section" data-testid="newsletter">
        {home.newsletterCTA?.[0] && (
          <NewsletterCTA cta={home.newsletterCTA[0]} />
        )}
      </ScrollFadeWrapper>
    </div>
  );
}
