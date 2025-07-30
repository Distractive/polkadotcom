import type { newsletterCTASelection } from '@/sanity/selections/blocks/newsletter-cta';
import type { TypeFromSelection } from 'groqd';
import { NewsletterCTA } from './newsletter-cta';

interface Props {
  cta: TypeFromSelection<typeof newsletterCTASelection>;
}

export function Newsletter({ cta }: Props) {
  return (
    <div className="" data-testid="newsletter">
      <NewsletterCTA cta={cta} />
    </div>
  );
}
