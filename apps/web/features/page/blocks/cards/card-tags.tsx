'use client';

import type { cardSelection } from '@/sanity/selections/blocks/card';
import { stegaClean } from '@sanity/client/stega';
import type { TypeFromSelection } from 'groqd';
import { useCallback, useEffect, useState } from 'react';

import { DecorativeLine } from '@/components/decorative-line';
import { Button, Icon, cn } from '@shared/ui';

import CardBlock from './card';

const useBreakpoint = () => {
  const [isXl, setIsXl] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsXl(window.innerWidth >= 1280);
    };

    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  return isXl;
};

interface Props {
  tags: string[] | null;
  cards: TypeFromSelection<typeof cardSelection>[];
  useFourColumns?: boolean;
}

export function CardTags({ tags, cards, useFourColumns }: Props) {
  const isXl = useBreakpoint();
  const VISIBLE_COUNT = isXl && useFourColumns ? 8 : 6;
  const [filteredItems, setFilteredItems] = useState(cards);
  const [currentTag, setCurrentTag] = useState('All');
  const [visibleCount, setVisibleCount] = useState(VISIBLE_COUNT);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <May be relevant>
  useEffect(() => {
    setVisibleCount(VISIBLE_COUNT);
  }, [isXl, VISIBLE_COUNT]);

  const handleTagClick = useCallback(
    (tag: string) => {
      if (tag === 'All') {
        setFilteredItems(cards);
        return;
      }
      const filtered = cards.filter((card) => {
        const cleanTag = stegaClean(tag);
        const cleanTags = card.selectedTags?.map((tag) => stegaClean(tag));
        return cleanTags?.includes(cleanTag);
      });
      setFilteredItems(filtered);
    },
    [cards],
  );

  const showMoreItems = useCallback(() => {
    const increment = isXl && useFourColumns ? 8 : 6;
    setVisibleCount((prevCount) => prevCount + increment);
  }, [isXl, useFourColumns]);

  const shouldShowLine =
    isXl && useFourColumns
      ? filteredItems.length > 8
      : filteredItems.length > 6;

  return (
    <>
      <ul className="col-span-full flex flex-wrap gap-3">
        <li
          key="all"
          className={cn(
            'flex cursor-pointer items-center justify-center rounded  text-sm leading-relaxed  transition-colors  ',
            'hover:bg-black hover:text-white',
            'relative',
            currentTag === 'All'
              ? 'bg-black text-white'
              : 'bg-grey-200 text-black',
          )}
        >
          <button
            type="button"
            aria-label={'Filter by All'}
            onClick={() => {
              handleTagClick('All');
              setCurrentTag('All');
              setVisibleCount(VISIBLE_COUNT);
            }}
            className="px-4 py-1 "
          >
            All
          </button>
        </li>

        {tags?.map((tag) => (
          <li
            key={tag}
            className={cn(
              'flex cursor-pointer flex-wrap items-center justify-center rounded bg-grey-200 text-sm  leading-relaxed text-black transition-colors',
              'hover:bg-black hover:text-white',
              'relative',
              currentTag === tag && 'bg-black text-white',
            )}
            aria-label={`Filter by ${tag}`}
          >
            <button
              type="button"
              onClick={() => {
                handleTagClick(tag);
                setCurrentTag(tag);
                setVisibleCount(VISIBLE_COUNT);
              }}
              className="px-4 py-1"
            >
              {tag}
            </button>
          </li>
        ))}
      </ul>
      <div
        className={cn('grid-system col-span-full gap-gutter md:auto-rows-1fr')}
      >
        {filteredItems.slice(0, visibleCount).map((card) => (
          <CardBlock
            key={card._key}
            card={card}
            className={cn(
              'col-span-full md:col-span-3 lg:col-span-4',
              useFourColumns ? 'xl:col-span-3' : 'xl:col-span-4',
            )}
          />
        ))}
      </div>
      {shouldShowLine && (
        <DecorativeLine>
          <Button
            variant={
              visibleCount >= filteredItems.length ? 'disabled' : 'secondary'
            }
            size={'sm'}
            onClick={showMoreItems}
          >
            Show More
            <Icon
              variant="chevronDown"
              className={cn(
                visibleCount >= filteredItems.length && 'fill-grey-300',
              )}
            />
          </Button>
        </DecorativeLine>
      )}
    </>
  );
}
