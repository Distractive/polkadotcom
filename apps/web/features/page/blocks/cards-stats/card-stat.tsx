import type { cardStatSelection } from '@/sanity/selections/blocks/card-stat';
import type { TypeFromSelection } from 'groqd';
import { PortableText } from 'next-sanity';

import { Button, Card, CardHeader, Heading, Icon, cn } from '@shared/ui';

import {
  LiveMetric,
  type metricFetchers,
} from '@/features/metrics/live-metric';

interface Props {
  card: TypeFromSelection<typeof cardStatSelection>;
  className?: string;
}

export default async function CardStatBlock({ card, className }: Props) {
  const {
    _key,
    heading,
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
    <Card key={_key} className={cn('bg-white p-gutter', className)}>
      <CardHeader className="grid gap-copy">
        <Heading variant="h3" size="h2">
          {useLiveMetric && liveMetric !== null && liveMetric !== undefined ? (
            <LiveMetric
              metric={cleanMetric}
              fallbackMetric={heading}
              addDollarSign={addDollarSign}
              displayInMillions={displayInMillions}
            />
          ) : (
            heading
          )}
        </Heading>
        <div className="font-bold text-black text-xl font-unbounded">
          <Heading variant="h3" size="h4" className="font-light">
            {body}
          </Heading>
        </div>

        {/* <div className="font-bold text-black text-xl font-unbounded">
          <CardDescription>{body}</CardDescription>
        </div> */}
      </CardHeader>

      {content && (
        <div className="pt-4  md:pt-5">
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
