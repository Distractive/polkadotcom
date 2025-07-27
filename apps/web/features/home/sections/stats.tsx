import type { statsSelection } from '@/sanity/selections/home/stats';
import type { TypeFromSelection } from 'groqd';

import { Heading, cn } from '@shared/ui';

import CardStatBlock from '@/features/page/blocks/cards-stats/card-stat';

interface Props {
  stats: TypeFromSelection<typeof statsSelection>['stats'];
}

export function Stats({ stats }: Props) {
  return (
    <div
      id="stats-pile"
      className="grid-pile relative px-gutter max-width"
      data-testid="stats-pile"
    >
      <div
        id="stats.wrapper"
        className=" relative col-span-12 h-auto items-center justify-center lg:h-full"
      >
        <div
          id="stats.content"
          className={cn(
            'max-width grid-system col-span-full sm:w-dvw',
            'md:col-span-full md:col-start-1 md:w-full',
            'lg:col-span-full lg:col-start-1',
            'xl:col-span-12 xl:col-start-1',
            'mt-header-top',
          )}
        >
          <Heading
            variant="h2"
            className={cn(
              'leading-[1.1]',
              'col-span-full md:col-span-3 md:col-start-1  md:text-[3rem] lg:col-start-1 xl:col-start-2 xl:text-[3.813rem]',
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
              'columns-1 md:columns-2 gap-8 relative col-span-full mt-10 lg:mt-0',
              'lg:col-span-7 lg:col-start-6',
              'xl:col-span-5 xl:col-start-7',
            )}
          >
            {stats.items.map((item, index) => {
              return (
                <CardStatBlock
                  key={item._key}
                  card={item}
                  className={cn(
                    'stats-card',
                    'break-inside-avoid mb-8 p-card lg:p-8 !h-fit',
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

// import type { statsSelection } from '@/sanity/selections/home/stats';
// import type { TypeFromSelection } from 'groqd';

// import { Heading, cn } from '@shared/ui';

// import CardStatBlock from '@/features/page/blocks/cards-stats/card-stat';

// interface Props {
//   stats: TypeFromSelection<typeof statsSelection>['stats'];
// }

// export function Stats({ stats }: Props) {
//   return (
//     <div
//       id="stats-pile"
//       className="grid-pile relative  "
//       data-testid="stats-pile"
//     >
//       <div
//         id="stats.wrapper"
//         className="grid-pile grid-system relative col-span-12 h-auto items-center justify-center lg:h-full"
//       >
//         <div
//           id="stats.content"
//           className={cn(
//             'max-width grid-system col-span-full sm:w-dvw',
//             'md:col-span-full md:col-start-1 md:w-full',
//             'lg:col-span-full lg:col-start-1',
//             'xl:col-span-12 xl:col-start-1',
//             'mt-header-top',
//           )}
//         >
//           <Heading
//             variant="h2"
//             className={cn(
//               'px-gutter  leading-[1.1] lg:pl-gutter lg:pr-gutter',
//               'col-span-full md:col-span-3 md:col-start-1  md:text-[3.25rem] lg:col-start-1 xl:col-start-2 xl:text-[3.813rem]',
//               '!hyphens-none !break-normal',
//             )}
//             size="display"
//             aria-label={stats.title}
//             role="heading"
//           >
//             {stats.title}
//           </Heading>
//           <div
//             className={cn(
//               'grid-system relative col-span-full mt-10 gap-card px-gutter lg:mt-0',
//               'lg:col-span-8 lg:col-start-6',
//               'xl:col-span-9 xl:col-start-7',
//             )}
//           >
//             {stats.items.map((item, index) => {
//               return (
//                 <CardStatBlock
//                   key={item._key}
//                   card={item}
//                   className={cn(
//                     'stats-card',
//                     'col-span-full col-start-1 md:col-span-3 lg:col-span-6 p-card lg:p-8',
//                     // nudge down second column
//                     index % 2 !== 0 && 'lg:translate-y-24',
//                   )}
//                   data-index={index}
//                 />
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
