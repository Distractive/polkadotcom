import type { statsSelection } from '@/sanity/selections/home/stats';
import type { TypeFromSelection } from 'groqd';

import { Heading, cn } from '@shared/ui';

import HomeGradient from '@/features/gradients/home-gradient';
import CardStatBlock from '@/features/page/blocks/cards-stats/card-stat';

interface Props {
  stats: TypeFromSelection<typeof statsSelection>['stats'];
}

export function Stats({ stats }: Props) {
  return (
    <div
      id="stats-pile"
      className="grid-pile relative py-section"
      data-testid="stats-pile"
    >
      <HomeGradient />

      <div
        id="stats.wrapper"
        className=" relative col-span-12 h-auto items-center justify-center lg:h-full "
      >
        <div
          id="stats.content"
          className={cn(
            'max-width grid-system px-gutter col-span-full sm:w-dvw',
          )}
        >
          <div className="col-span-full md:col-span-3 md:col-start-1 lg:col-span-4 lg:col-start-1">
            {stats?.title && (
              <Heading
                variant="h2"
                className={cn('!hyphens-none !break-normal')}
                size="h2"
                aria-label={stats?.title}
                role="heading"
              >
                {stats?.title || ''}
              </Heading>
            )}
            {stats?.body && (
              <p className="pt-5 text-lg text-black">{stats?.body}</p>
            )}
          </div>
          <div
            className={cn(
              'columns-1 md:columns-2 relative col-span-full mt-10 lg:mt-0',
              'col-span-full md:col-start-1',
              'lg:col-span-7 lg:col-start-6',
            )}
          >
            {stats?.items.map((item, index) => {
              return (
                <CardStatBlock
                  key={item._key}
                  card={item}
                  className={cn(
                    'stats-card',
                    'break-inside-avoid mb-4 md:mb-8 p-card lg:p-8 !h-fit',
                    // Nudge down second column on md and above
                    stats.columnPadding &&
                      (index === 3 || index === 4) &&
                      'md:translate-y-[var(--column-padding)]',
                  )}
                  style={
                    {
                      '--column-padding': stats.columnPadding
                        ? `${stats.columnPadding}rem`
                        : '0rem',
                    } as React.CSSProperties
                  }
                  data-index={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
