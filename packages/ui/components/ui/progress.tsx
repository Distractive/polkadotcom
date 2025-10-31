import { cn } from '../../lib/utils';

interface Props {
  current: number;
  count: number;
  className?: string;
}

export function Progress({ current, count, className }: Props) {
  return (
    <div
      className={cn(
        'inline-flex gap-1 rounded-[3.25rem] border border-grey-300 dark:border-grey-700 bg-grey-200 dark:bg-black p-3',
        className,
      )}
    >
      {Array.from(Array(count).keys()).map((index) => (
        // biome-ignore lint/style/useSelfClosingElements: <Not possible>
        <div
          key={index}
          className={cn(
            'size-2 rounded-full bg-black dark:bg-white transition-[width] duration-200 ease-in-out',
            current === index && 'w-gutter',
          )}
        ></div>
      ))}
    </div>
  );
}
