import type { navigationMenuSelection } from '@/sanity/selections/navigation/navigation-menu';
import { stegaClean } from '@sanity/client/stega';
import type { TypeFromSelection } from 'groqd';

import { CustomUrl } from '@/components/custom-url';
import { useToggleAnimation } from '@/hooks/use-toggle-animation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  cn,
} from '@shared/ui';

interface Props {
  menu: ReadonlyArray<TypeFromSelection<typeof navigationMenuSelection>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function MenuMobile({ menu, isOpen, setIsOpen }: Props) {
  const { ref } = useToggleAnimation({ isVisible: isOpen });

  return (
    <div className="z-30 mt-4 flex w-full items-end justify-end">
      <div
        id="page-menu"
        ref={ref}
        className={cn(
          'mx-gutter w-full md:w-[20rem] rounded-2xl border border-grey-200 bg-white',
          'max-h-[80vh] overflow-y-auto overscroll-contain',
          'transition-opacity duration-300 ease-in-out',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
      >
        <Accordion type="single" collapsible className="flex flex-col w-full">
          {menu.map((section, sectionIndex) => (
            <AccordionItem key={section.heading} value={section.heading}>
              <div className="relative flex items-center justify-center shadow-internal-border">
                <CustomUrl
                  value={section.link}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex-1 p-nav border-r border-grey-200 text-left font-bold',
                  )}
                >
                  {section.heading}
                </CustomUrl>
                <AccordionTrigger
                  aria-label={`Open '${stegaClean(section.heading)}' page links`}
                  className="[&>svg]:mx-nav"
                />
              </div>

              <AccordionContent className={cn('bg-grey-50', 'flex flex-col')}>
                {section.items.map((item, linkIndex) => {
                  const lastLink = linkIndex === section.items.length - 1;
                  const lastSection = sectionIndex === menu.length - 1;
                  return (
                    <span
                      key={item.link.label}
                      className={cn(
                        'flex h-full w-full text-left shadow-internal-border',
                        lastLink && 'border-b border-grey-200',
                        lastSection && lastLink && 'border-none',
                      )}
                    >
                      <CustomUrl
                        onClick={() => setIsOpen(false)}
                        value={item.link}
                        className="h-full w-full p-nav"
                      >
                        {item.link.label}
                      </CustomUrl>
                    </span>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
