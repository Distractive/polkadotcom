import type { cardSmallSelection } from '@/sanity/selections/blocks/card-small';
import type { TypeFromSelection } from 'groqd';

import { CustomUrl } from '@/components/custom-url';
import { urlForImage } from '@/sanity/lib/image';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  Heading,
  Icon,
  cn,
} from '@shared/ui';

interface Props {
  card: TypeFromSelection<typeof cardSmallSelection>;
  className?: string;
}

export default function CardSmallBlock({ card, className }: Props) {
  const { _key, heading, body, link, icon, eyebrow } = card;

  return (
    <Card
      key={_key}
      className={cn(
        link &&
          'focus-within:shadow-card focus-within:backdrop-blur-0 md:cursor-pointer md:hover:shadow-card md:hover:backdrop-blur-0',
        className,
      )}
    >
      <CustomUrl value={link} isWrapper className="w-full h-full">
        <div
          className={cn(
            'flex h-full w-full justify-between items-start p-6 lg:p-card',
          )}
        >
          <div
            className={cn(
              'flex gap-5 flex-1 min-w-0',
              icon ? 'items-center' : 'items-start',
            )}
          >
            {icon && (
              <img
                src={urlForImage(icon.asset)}
                alt=""
                loading="lazy"
                className={cn(
                  'size-14 rounded-2xl object-cover object-center flex-shrink-0',
                )}
              />
            )}
            <CardContent className="grid flex-1 min-w-0">
              {eyebrow && (
                <span className="text-caps-small text-base font-bold uppercase">
                  {eyebrow}
                </span>
              )}
              {heading && (
                <Heading
                  variant="h3"
                  size="h4"
                  className={cn(
                    'transition-colors duration-200 ease-in-out',
                    link &&
                      'group-focus-within:text-pink md:group-hover:text-pink',
                  )}
                >
                  {heading}
                </Heading>
              )}
              {body && (
                <CardDescription className="pt-copy">{body}</CardDescription>
              )}
              {link?.variant && (link.external || link.internal) && (
                <Button
                  tabIndex={-1}
                  asChild
                  variant={
                    link.variant
                      ? link.variant === 'primary'
                        ? 'primary'
                        : 'secondary'
                      : 'primary'
                  }
                  size="md"
                  className="mt-copy group-focus-within:after:translate-x-0 md:mr-auto "
                >
                  <CustomUrl className="outline-none" value={link} isNested>
                    {link.label}
                  </CustomUrl>
                </Button>
              )}
            </CardContent>
          </div>
          {link && !link.variant && (
            <div className="flex justify-center items-center flex-shrink-0 ml-4 h-full">
              <Icon
                variant={link.internal ? 'arrowRight' : 'arrowRightUp'}
                className="transition-transform duration-200 ease-in-out group-hover:translate-x-2"
              />
            </div>
          )}
        </div>
      </CustomUrl>
    </Card>
  );
}
