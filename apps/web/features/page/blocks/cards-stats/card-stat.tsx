import type { metricFetchers } from '@/app/api/stats/parity/metrics/index';
import type { cardStatSelection } from '@/sanity/selections/blocks/card-stat';
import { PortableText } from '@portabletext/react';
import { Button, Card, CardHeader, Heading, Icon, cn } from '@shared/ui';
import type { TypeFromSelection } from 'groqd';

import { LiveMetric } from '@/features/metrics/live-metric';
import { urlForImage } from '@/sanity/lib/image';

interface Props {
  card: TypeFromSelection<typeof cardStatSelection>;
  className?: string;
  style?: React.CSSProperties;
}

export default function CardStatBlock({ card, className, style }: Props) {
  const {
    _key,
    icon,
    makeIconFullWidth,
    heading,
    fallbackHeading,
    body,
    content,
    useLiveMetric,
    liveMetric,
    addDollarSign,
    displayInMillions,
  } = card;

  const cleanMetric = liveMetric?.replace(
    /[\u200B-\u200F\u2028-\u202F\u2060-\u206F\uFEFF]/g,
    '',
  ) as keyof typeof metricFetchers;
  return (
    <Card key={_key} className={cn('bg-white p-card', className)} style={style}>
      <CardHeader className="grid">
        {icon && (
          <div className="pb-4 w-full">
            <img
              src={urlForImage(icon.asset)}
              alt=""
              loading="lazy"
              className={cn(
                'w-full size-14 lg:size-auto rounded-2xl object-center object-contain',
                !makeIconFullWidth && '!size-14',
              )}
            />
          </div>
        )}
        <Heading variant="h3" size="h3" className="pb-3">
          {useLiveMetric && liveMetric !== null && liveMetric !== undefined ? (
            <>
              <LiveMetric
                metric={cleanMetric}
                fallback={fallbackHeading}
                addDollarSign={addDollarSign}
                displayInMillions={displayInMillions}
              />
              {heading}
            </>
          ) : (
            heading
          )}
        </Heading>
        {body && <div className={cn(content && 'pb-6')}>{body}</div>}
      </CardHeader>

      {content && (
        <div className="text-sm">
          <PortableText
            value={content}
            components={{
              list: {
                bullet: ({ children }) => (
                  <ul className="list-inside list-disc">{children}</ul>
                ),
                number: ({ children }) => (
                  <ol className="list-inside list-decimal">{children}</ol>
                ),
              },
              listItem: {
                bullet: ({ children }) => <li>{children}</li>,
                number: ({ children }) => <li>{children}</li>,
              },
              marks: {
                link: ({ children, value }) => {
                  const rel = !value.href.startsWith('/')
                    ? 'noreferrer noopener'
                    : undefined;
                  return (
                    <a href={value.href} rel={rel} className="font-normal">
                      {children}
                      <Icon
                        variant="arrowRightUp"
                        className={cn(
                          'ml-1 w-4 fill-current lg:w-5',
                          value.variant === 'primary' && 'fill-white',
                        )}
                      />
                    </a>
                  );
                },
              },
              types: {
                customUrl: ({ value }) => (
                  <Button
                    variant={value.internal ? 'primary' : 'secondary'}
                    size="md"
                  >
                    {value.label}
                  </Button>
                ),
              },
            }}
          />
        </div>
      )}
    </Card>
  );
}
