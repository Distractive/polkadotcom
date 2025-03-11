import type { statsSelection } from '@/sanity/selections/home/stats';
import type { TypeFromSelection } from 'groqd';

import { Card, CardDescription, CardHeader, Heading, cn } from '@shared/ui';
import { LiveMetric } from '@/features/metrics/live-metric';

interface Props {
  stats: TypeFromSelection<typeof statsSelection>['stats'];
}

export function Stats({ stats }: Props) {
  return (
    <div
      id="stats-pile"
      className="grid-pile relative  "
      data-testid="stats-pile"
    >
      {/* biome-ignore lint/style/useSelfClosingElements: <Not possible for div> */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(225deg,rgba(240,255,255,0%)_0%,#FFFFFF_100%),linear-gradient(to_bottom,rgba(255,255,255,0%)_0%,#FFFFFF_100%),linear-gradient(225deg,#E4FF07_0%,#07FFFF_100%)]"></div>

      <article
        id="stats.wrapper"
        className="grid-pile grid-system relative col-span-12 h-auto items-center justify-center overflow-x-hidden lg:h-full"
      >
        <div
          id="stats.content"
          className={cn(
            'max-width grid-system col-span-full sm:w-dvw',
            'md:col-span-full md:col-start-1 md:w-full',
            'lg:col-span-full lg:col-start-1',
            'xl:col-span-10 xl:col-start-2',
            'mt-header-top',
          )}
        >
          <Heading
            variant="h2"
            className={cn(
              'px-gutter  leading-[1.1] lg:pl-gutter lg:pr-gutter',
              'col-span-full md:col-span-3 md:col-start-1  md:text-[3.25rem] lg:col-start-2 xl:col-start-2 xl:text-[3.813rem]',
              '!hyphens-none !break-normal',
            )}
            size="display"
            aria-label={stats.title}
            role="heading"
          >
            {stats.title}
          </Heading>
          <div
            className={cn(
              'grid-system relative col-span-full mt-10 gap-card px-gutter lg:mt-0',
              'lg:col-span-8 lg:col-start-7',
              'xl:col-span-8 xl:col-start-7',
            )}
          >
            {stats.items.map((item, index) => (
              <Card
                key={item._key}
                className={cn(
                  'stats-card  bg-white p-card',
                  'col-span-full col-start-1 md:col-span-2 lg:col-span-6',
                  // nudge down second column
                  index % 2 !== 0 && 'lg:translate-y-24',
                )}
                data-index={index}
              >
                <CardHeader className="grid w-5/6 gap-copy lg:w-full">
                  <Heading variant="h3" className="!hyphens-none !break-normal">
                    {item.heading}
                  </Heading>
                  <CardDescription>{item.body}</CardDescription>
                </CardHeader>
              </Card>
            ))}
            {/* Test for live metrics */}
            <Card
              className={cn(
                'stats-card  bg-white p-card',
                'col-span-full col-start-1 md:col-span-2 lg:col-span-6',
              )}
            >
              <CardHeader className="grid w-5/6 gap-copy lg:w-full">
                <Heading variant="h3" className="!hyphens-none !break-normal">
                  <LiveMetric metric="totalFeesUSD30d" />
                </Heading>
                <CardDescription>Total Fees</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </article>
    </div>
  );
}
