'use client';

import type { buttonBlockSelection } from '@/sanity/selections/blocks/button-block';
import type { TypeFromSelection } from 'groqd';

import { CustomUrl } from '@/components/custom-url';
import { DecorativeLine } from '@/components/decorative-line';
import { Button } from '@shared/ui';

interface Props {
  buttonBlock: TypeFromSelection<typeof buttonBlockSelection>;
}

export function ButtonBlock({ buttonBlock }: Props) {
  return (
    <div className="grid-system max-width -mt-page p-gutter">
      <DecorativeLine forButtonBlock>
        <Button
          asChild
          size="md"
          className="w-full md:group-hover:after:translate-x-0"
          variant={
            buttonBlock.link?.variant
              ? buttonBlock.link.variant === 'primary'
                ? 'primary'
                : 'secondary'
              : 'primary'
          }
        >
          <CustomUrl className="outline-none" value={buttonBlock.link}>
            {buttonBlock.link?.label}
          </CustomUrl>
        </Button>
      </DecorativeLine>
    </div>
  );
}
