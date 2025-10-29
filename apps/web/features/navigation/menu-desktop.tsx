import type { navigationMenuSelection } from '@/sanity/selections/navigation/navigation-menu';
import { stegaClean } from '@sanity/client/stega';
import type { TypeFromSelection } from 'groqd';

import { CustomUrl } from '@/components/custom-url';
import { useToggleAnimation } from '@/hooks/use-toggle-animation';
import { urlForImage } from '@/sanity/lib/image';
import { cn } from '@shared/ui';

interface Props {
  menu: ReadonlyArray<TypeFromSelection<typeof navigationMenuSelection>>;
  hovered: string;
  setHovered: React.Dispatch<React.SetStateAction<string>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function MenuDesktop({
  menu,
  hovered,
  isOpen,
  setIsOpen,
  setHovered,
}: Props) {
  const { ref } = useToggleAnimation({ isVisible: isOpen });

  const handleCloseMenu = () => {
    setHovered('');
    setIsOpen(false);
  };

  if (!isOpen) {
    return;
  }

  return (
    <div
      ref={ref}
      id="page-menu"
      className="max-width grid-pile overflow-hidden px-gutter "
    >
      {menu.map((section, _index) => (
        <div
          key={section.heading}
          onMouseLeave={handleCloseMenu}
          id={`${stegaClean(section.heading)}`}
          className={cn(
            'mb-auto mr-auto flex items-start overflow-hidden backdrop-blur-md border border-grey-200 dark:border-grey-900',
            'rounded-2xl bg-white dark:bg-black transition-colors',
            section.heading === hovered
              ? 'pointer-events-auto visible'
              : 'pointer-events-none invisible',
          )}
        >
          <ul className="grid grid-cols-2">
            {section.items.map((item, index) => {
              const totalItems = section.items.length;
              const isInLastRow =
                totalItems % 2 === 0
                  ? index >= totalItems - 2
                  : index === totalItems - 1;
              const isLeftColumn = index % 2 === 0;
              const isLastItemOdd =
                totalItems % 2 !== 0 && index === totalItems - 1;

              return (
                <li
                  key={item.link.label}
                  className={cn(
                    'flex min-w-[21rem]',
                    !isInLastRow &&
                      'border-b border-grey-200 dark:border-grey-900',
                    isLeftColumn &&
                      'border-r border-grey-200 dark:border-grey-900',
                  )}
                >
                  <CustomUrl
                    value={item.link}
                    onClick={handleCloseMenu}
                    className="leading-none flex h-full w-full p-nav transition-colors hover:text-pink focus:text-pink text-black dark:text-white"
                    tabIndex={0}
                  >
                    {' '}
                    {item.link.label}{' '}
                  </CustomUrl>
                </li>
              );
            })}
            {section.items.length % 2 !== 0 && <li className="min-w-[21rem]" />}
          </ul>
          {section.aside && (
            <CustomUrl
              value={section.aside.link}
              onClick={handleCloseMenu}
              disableArrow={true}
            >
              <aside
                className={cn(
                  'group grid h-full max-w-[21rem] gap-copy p-nav',
                  'cursor-pointer border-l border-grey-200 dark:border-grey-900',
                )}
              >
                <img
                  src={urlForImage(section.aside.image.asset)}
                  alt=""
                  className="w-full"
                />
                <p className="text-lg font-bold text-white dark:text-black transition-colors group-hover:text-pink">
                  {section.aside.heading}
                </p>
              </aside>
            </CustomUrl>
          )}
        </div>
      ))}
    </div>
  );
}
