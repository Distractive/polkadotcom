import type { navigationMenuSelection } from '@/sanity/selections/navigation/navigation-menu';
import { stegaClean } from '@sanity/client/stega';
import type { TypeFromSelection } from 'groqd';
import Link from 'next/link';

import { CustomUrl } from '@/components/custom-url';
import { Logo } from '@/components/logo';
import { cn } from '@shared/ui';

import { Search } from '@/components/search/search';
import { Burger } from './burger';
import { getFocusableElements } from './utils';

interface Props {
  menu: ReadonlyArray<TypeFromSelection<typeof navigationMenuSelection>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setHovered: React.Dispatch<React.SetStateAction<string>>;
}

export function Header({ menu, isOpen, setIsOpen, setHovered }: Props) {
  const handleItemSelect = () => {
    setHovered('');
    setIsOpen(false);
  };

  const handleCurrentHeading = (heading: string) => {
    setHovered(heading);
    setIsOpen(true);
  };

  function onSubmenuToggleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const element = event.target;
    if (!(element instanceof HTMLButtonElement)) {
      return;
    }
    const targetId = element.getAttribute('aria-controls') ?? '';
    const modal = document.getElementById(targetId);
    if (!(modal instanceof HTMLElement)) {
      return;
    }
    const firstFocusableElement = getFocusableElements(modal)[0];
    if (firstFocusableElement) {
      firstFocusableElement.focus();
    }
  }

  return (
    <div className="max-width z-40 mt-4">
      <div className="relative flex h-nav-height flex-shrink-0 items-center justify-between px-gutter w-full">
        <div
          data-testid="navbar"
          className={cn(
            'flex h-full items-center justify-center pl-4 gap-4',
            'rounded-[3rem] border border-grey-300 bg-white',
          )}
        >
          <Link
            href="/"
            onClick={handleItemSelect}
            className="pr-nav"
            aria-label="Navigate to the home page"
          >
            <Logo ariaLabel="Polkadot homepage" width={140} />
          </Link>
          <ul
            className={cn(
              'hidden h-full items-center justify-center gap-nav px-nav lg:flex',
              'border-l border-grey-300 font-bold',
            )}
          >
            {menu.map((item) => (
              <li
                key={item.heading}
                onMouseEnter={() => handleCurrentHeading(item.heading)}
                className="relative flex h-full cursor-pointer items-center justify-center transition-colors duration-100 ease-in-out lg:hover:text-pink"
              >
                <CustomUrl
                  value={item.link}
                  onClick={handleItemSelect}
                  className="duration-100 ease-in-out hover:text-pink focus:text-pink peer-focus:text-pink"
                >
                  {item.heading}
                </CustomUrl>
                <button
                  type="button"
                  className="peer sr-only"
                  aria-expanded={'' === item.heading}
                  aria-controls={stegaClean(item.heading)}
                  onFocus={() => handleCurrentHeading(item.heading)}
                  onClick={onSubmenuToggleClick}
                >
                  Show submenu
                </button>
              </li>
            ))}
          </ul>
          <div className="mr-5 border-l border-l-grey-200 pr-[5px] pl-2.5 h-[100%] flex items-center">
            <Search />
          </div>
        </div>
        <Burger isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
}
