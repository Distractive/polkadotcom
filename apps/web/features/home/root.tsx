import type { homeSelection } from '@/sanity/selections/home/root';
import type { TypeFromSelection } from 'groqd';

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
      <div className="py-section section-fade-in">
        <SmallCardsHome cards={home.network} />
      </div>
      <div className="py-section section-fade-in">
        {home.cards?.[0] && <CardsBlock cards={home.cards[0]} />}
      </div>
      <div className="py-section section-fade-in">
        <Stats stats={home.stats} />
      </div>
      <div className="py-section section-fade-in">
        <Ecosystem ecosystem={home.ecosystem} />
      </div>
      <div className="py-section section-fade-in">
        <SmallCardsHome cards={home.build} />
      </div>
      {/* <Connected connected={home.connected} /> */}
      <div className="py-32 section-fade-in">
        {home.newsletterCTA?.[0] && (
          <NewsletterCTA cta={home.newsletterCTA[0]} />
        )}
      </div>
    </div>
  );
}
