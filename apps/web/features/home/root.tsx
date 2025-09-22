import type { homeSelection } from '@/sanity/selections/home/root';
import type { TypeFromSelection } from 'groqd';

import { FadeUp } from '@/animations/scroll/fade-up';
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

      <section className="py-section" data-testid="network-cards">
        <FadeUp>
          <SmallCardsHome cards={home.network} />
        </FadeUp>
      </section>

      <section className="py-section">
        <FadeUp>
          {home.cards?.[0] && <CardsBlock cards={home.cards[0]} />}
        </FadeUp>
      </section>

      <section className="py-section">
        <FadeUp>
          <Stats stats={home.stats} />
        </FadeUp>
      </section>

      <section className="py-section">
        <FadeUp>
          <Ecosystem ecosystem={home.ecosystem} />
        </FadeUp>
      </section>

      <section className="py-section" data-testid="build-cards">
        <FadeUp>
          <SmallCardsHome cards={home.build} />
        </FadeUp>
      </section>

      <section className="py-section" data-testid="newsletter">
        <FadeUp>
          {home.newsletterCTA?.[0] && (
            <NewsletterCTA cta={home.newsletterCTA[0]} />
          )}
        </FadeUp>
      </section>
    </div>
  );
}
