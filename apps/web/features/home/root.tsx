import type { homeSelection } from '@/sanity/selections/home/root';
import type { TypeFromSelection } from 'groqd';

// import { Connected } from '@/features/home/sections/connected';
import { Ecosystem } from '@/features/home/sections/ecosystem';
import { Hero } from '@/features/home/sections/hero';
import { SmallCardsHome } from '@/features/home/sections/small-cards-home';
import { Build } from '@/features/home/sections/start-building';
import { Stats } from '@/features/home/sections/stats';
import { Video } from '@/features/home/sections/video';
import { CardsBlock } from '../page/blocks/cards/cards';

import { Newsletter } from '../page/blocks/newsletter';

interface Props {
  home: TypeFromSelection<typeof homeSelection>['home'];
}

export function Root({ home }: Props) {
  return (
    <div>
      <Hero hero={home.hero} />
      <Video video={home.video} />
      <SmallCardsHome network={home.network} />
      <Stats stats={home.stats} />
      <Ecosystem ecosystem={home.ecosystem} />
      <Build build={home.build} />
      {/* <Connected connected={home.connected} /> */}
      <div className="py-section max-width">
        {home.cards?.[0] && <CardsBlock cards={home.cards[0]} />}
      </div>
      <div className="py-section">
        {home.newsletterCTA?.[0] && <Newsletter cta={home.newsletterCTA[0]} />}
      </div>
    </div>
  );
}
