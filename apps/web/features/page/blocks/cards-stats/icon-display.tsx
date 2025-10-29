import { cn } from '@shared/ui';

import { urlForImage } from '@/sanity/lib/image';
import type { cardStatSelection } from '@/sanity/selections/blocks/card-stat';
import type { TypeFromSelection } from 'groqd';

interface IconDisplayProps {
  icon: TypeFromSelection<typeof cardStatSelection>['icon'];
  darkModeIcon?: TypeFromSelection<typeof cardStatSelection>['darkModeIcon'];
  makeIconFullWidth?: boolean | null;
}

export function IconDisplay({
  icon,
  darkModeIcon,
  makeIconFullWidth,
}: IconDisplayProps) {
  if (!icon) return null;

  return (
    <div className="pb-4 w-full">
      <img
        src={urlForImage(icon.asset)}
        alt=""
        loading="lazy"
        className={cn(
          'w-full size-14 lg:size-auto rounded-2xl object-center object-contain',
          !makeIconFullWidth && '!size-14',
          darkModeIcon && 'dark:hidden',
        )}
      />
      {darkModeIcon && (
        <img
          src={urlForImage(darkModeIcon.asset)}
          alt=""
          loading="lazy"
          className={cn(
            'w-full size-14 lg:size-auto rounded-2xl object-center object-contain hidden dark:block',
            !makeIconFullWidth && '!size-14',
          )}
        />
      )}
    </div>
  );
}
