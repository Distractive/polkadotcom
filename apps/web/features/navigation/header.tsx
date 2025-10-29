'use client';

import type { navigationMenuSelection } from '@/sanity/selections/navigation/navigation-menu';
import { stegaClean } from '@sanity/client/stega';
import type { TypeFromSelection } from 'groqd';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import { CustomUrl } from '@/components/custom-url';
import { Logo } from '@/components/logo';
import { useSearchState } from '@/hooks/use-search-state';
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
  const { isSearchOpen } = useSearchState();
  const { theme, setTheme, resolvedTheme } = useTheme();

  const handleItemSelect = () => {
    setHovered('');
    setIsOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const currentTheme = resolvedTheme || theme;

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
        <div className="rounded-[3rem] gradient-border-wrapper bg-black/30 backdrop-blur-md h-full">
          <div
            data-testid="navbar"
            className={cn(
              'flex h-full items-center justify-center pl-4 gap-1 sm:gap-4',
              'rounded-[3rem]',
            )}
          >
            <Link
              href="/"
              onClick={handleItemSelect}
              className={cn(
                'pr-3 cursor-pointer',
                isSearchOpen && 'hidden lg:hidden xl:block',
              )}
              aria-label="Navigate to the home page"
            >
              <Logo ariaLabel="Polkadot homepage" width={140} />
            </Link>
            <ul
              className={cn(
                'hidden  items-center justify-center gap-nav px-nav lg:flex -mr-4',
                'font-bold nav-divider-gradient',
                isSearchOpen && 'lg:hidden xl:flex',
              )}
            >
              {menu.map((item) => {
                return (
                  <li
                    key={item.heading}
                    onMouseEnter={() => handleCurrentHeading(item.heading)}
                    className="relative flex h-full cursor-pointer items-center justify-center transition-colors duration-100 ease-in-out "
                  >
                    <CustomUrl
                      value={item.link}
                      onClick={handleItemSelect}
                      className={cn(
                        'whitespace-nowrap',
                        item.link &&
                          'duration-100 ease-in-out hover:text-pink focus:text-pink peer-focus:text-pink',
                      )}
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
                );
              })}
            </ul>
            <div
              className={cn(
                'hidden lg:flex items-center justify-center pl-2',
                isSearchOpen && 'lg:hidden xl:flex',
              )}
            >
              <button
                type="button"
                onClick={toggleTheme}
                className="rounded-full p-2 hover:bg-white/10 transition-colors"
                aria-label="Toggle dark mode"
              >
                <Image
                  src={
                    currentTheme === 'dark'
                      ? '/icons/moon-filled.svg'
                      : '/icons/moon.svg'
                  }
                  alt={currentTheme === 'dark' ? 'Dark mode' : 'Light mode'}
                  width={18}
                  height={18}
                  className="w-4 h-auto"
                />
              </button>
            </div>
            <div className="mr-5  pr-[5px] h-[100%] flex items-center">
              <Search />
            </div>
          </div>
        </div>{' '}
        <Burger isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
}
