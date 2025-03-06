import type { cardStatSelection } from '@/sanity/selections/blocks/card-stat';
import type { TypeFromSelection } from 'groqd';
import { PortableText } from 'next-sanity';

import {
  Button,
  Card,
  CardDescription,
  CardHeader,
  Heading,
  Icon,
  cn,
} from '@shared/ui';

import { getTotalFeesUSD30d } from '@/app/api/stats/parity/metrics/get-total-fees-usd-30d';
import { getActiveValidators } from '@/app/api/stats/parity/metrics/get-active-validators';
import { getNominators } from '@/app/api/stats/parity/metrics/get-nominators';
import { getPercentStaked } from '@/app/api/stats/parity/metrics/get-percent-staked';
import { getTotalDOTStaked } from '@/app/api/stats/parity/metrics/get-total-dot-staked';
import { getTreasuryBalanceUSD } from '@/app/api/stats/parity/metrics/get-treasury-balance-usd';

interface Props {
  card: TypeFromSelection<typeof cardStatSelection>;
  className?: string;
}

export default async function CardStatBlock({ card, className }: Props) {
  const { _key, heading, body, content, useLiveMetric, metric } = card;

  let metricValue = null;

  if (useLiveMetric) {
    const cleanMetric = metric?.replace(
      /[\u200B-\u200F\u2028-\u202F\u2060-\u206F\uFEFF]/g,
      '',
    );

    switch (cleanMetric?.trim()) {
      case 'total_fees_usd_30d':
        metricValue = await getTotalFeesUSD30d();
        break;
      case 'active_validators':
        metricValue = await getActiveValidators();
        break;
      case 'nominators':
        metricValue = await getNominators();
        break;
      case 'percent_dot_supply_staked':
        metricValue = await getPercentStaked();
        break;
      case 'dot_staked':
        metricValue = await getTotalDOTStaked();
        break;
      case 'treasury_balance_usd':
        metricValue = await getTreasuryBalanceUSD();
        break;
      default:
        metricValue = 'Metric not available';
    }
  }

  return (
    <Card key={_key} className={cn('bg-white p-gutter', className)}>
      <CardHeader className="grid gap-copy">
        <Heading variant="h3" size="h2">
          {useLiveMetric ? metricValue : heading}
        </Heading>
        <CardDescription>{body}</CardDescription>
      </CardHeader>

      {content && (
        <div className="pt-card md:pt-gutter">
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
                    <a href={value.href} rel={rel} className="font-bold">
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
