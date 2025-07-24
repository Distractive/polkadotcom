import type { TypeFromSelection } from 'groqd';
import type { newsletterCTASelection } from '@/sanity/selections/blocks/newsletter-cta';
import { NewsletterCTA } from './newsletter-cta';

interface Props {
  cta: TypeFromSelection<typeof newsletterCTASelection>;
}

export function Newsletter({ cta }: Props) {
  return (
    <div className="py-16" data-testid="newsletter">
      <NewsletterCTA cta={cta} />
    </div>
  );
}
