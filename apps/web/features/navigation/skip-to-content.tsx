import { cn } from '@shared/ui';

export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className={cn(
        'group fixed -left-[9999px] -top-[9999px] z-[999] border-b border-b-grey-400 bg-grey-100 p-4 opacity-100 outline-none',
        'focus:left-0 focus:right-0 focus:top-0 focus:opacity-100',
      )}
    >
      <span className="inline-block rounded-lg bg-blue px-10 py-4 font-display text-xs uppercase tracking-wide text-white group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-[#1351d8]">
        Skip to main content
      </span>
    </a>
  );
}
