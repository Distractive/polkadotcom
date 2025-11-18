import { cn } from '@shared/ui';

interface Props {
  className?: string;
  children?: React.ReactNode;
  forButtonBlock?: boolean;
}

export function DecorativeLine({
  className,
  children,
  forButtonBlock = false,
}: Props) {
  if (forButtonBlock) {
    return (
      <div
        className={cn(
          'col-span-full inline-flex items-center justify-center gap-14 pt-gutter',
          className,
        )}
      >
        <hr
          aria-hidden={true}
          tabIndex={-1}
          className={cn(
            'hidden h-px flex-1 border-0 bg-grey-200 md:block',
            'max-w-[32rem]',
          )}
        />
        <div className={cn('px-gutter md:px-0')}>{children}</div>
        <hr
          aria-hidden={true}
          tabIndex={-1}
          className={cn(
            'hidden h-px flex-1 border-0 bg-grey-200 md:block',
            'max-w-[32rem]',
          )}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative col-span-full inline-flex items-center justify-center pt-gutter',
        className,
      )}
    >
      <hr
        aria-hidden={true}
        tabIndex={-1}
        className={cn('w-full border-grey-300')}
      />
      <div className={cn('absolute px-8')}>{children}</div>
    </div>
  );
}
