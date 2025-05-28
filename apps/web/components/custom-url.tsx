import type { customUrlSelection } from '@/sanity/selections/custom-url';
import type { TypeFromSelection } from 'groqd';
import Link from 'next/link';

import {
  BLOG_POSTTYPE,
  CASE_STUDY_POSTTYPE,
  PRESS_RELEASE_POSTTYPE,
} from '@/constants/global';
import { Icon, cn } from '@shared/ui';

interface Props {
  value?: TypeFromSelection<typeof customUrlSelection> | null;
  children: React.ReactNode;
  className?: string;
  isWrapper?: boolean;
  tabIndex?: number;
  isNested?: boolean;
  disableArrow?: boolean;
  onClick?: () => void;
}

export function CustomUrl({
  value,
  children,
  className,
  tabIndex,
  disableArrow,
  isWrapper = false,
  isNested,
  onClick,
}: Props) {
  let slug = value?.external || value?.internal?.slug;
  if (value?.internal && value?.internal._type === 'post') {
    const parentSlug = (() => {
      switch (value?.internal?.post_type) {
        case BLOG_POSTTYPE:
          return '/blog';
        case PRESS_RELEASE_POSTTYPE:
          return '/newsroom/press-releases';
        case CASE_STUDY_POSTTYPE:
          return '/case-studies';
        default:
          return '';
      }
    })();

    slug = `${parentSlug}/${slug}`;
  }

  // isNested is for buttons inside of cards and prevents hydration errors due to nested <a> tags
  if (isNested) {
    return value ? (
      isWrapper ? (
        <div className={className}>{children}</div>
      ) : (
        <div className={className}>
          <span className="inline-flex items-center gap-2">
            <span className="flex-1">{children}</span>
            {value.external && !disableArrow && (
              <Icon
                variant="arrowRightUp"
                className={cn(
                  'size-4 shrink-0 fill-current',
                  value.variant === 'primary' && 'fill-white',
                )}
              />
            )}
          </span>
        </div>
      )
    ) : (
      children
    );
  }

  return value ? (
    <Link
      tabIndex={tabIndex}
      href={value?.external || `${slug}` || ''}
      target={value.external ? '_blank' : '_self'}
      className={className}
      prefetch={false}
      onClick={onClick}
    >
      {isWrapper ? (
        <div className="contents">{children}</div>
      ) : (
        <span className="inline-flex items-center gap-2">
          <span className="flex-1"> {children}</span>
          {value.external && !disableArrow && (
            <Icon
              variant="arrowRightUp"
              className={cn(
                'size-4 shrink-0 fill-current ',
                value.variant && value.variant === 'primary' && 'fill-white',
              )}
            />
          )}
        </span>
      )}
    </Link>
  ) : (
    children
  );
}
