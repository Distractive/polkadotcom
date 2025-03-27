import React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  cn,
} from '@shared/ui';

export type BreadcrumbItemType = {
  slug: string;
  title?: string | null;
};

export type BreadcrumbProps = {
  items: BreadcrumbItemType[];
};

export function BreadcrumbBlock({ items }: BreadcrumbProps) {
  return (
    <Breadcrumb data-testid="breadcrumb">
      <BreadcrumbList>
        {items.map((item, index) => {
          return (
            <React.Fragment key={item.title}>
              <BreadcrumbItem key={item.title}>
                <BreadcrumbLink
                  href={item.slug}
                  className={cn(
                    'transition-all duration-200 ease-out hover:text-black hover:underline hover:underline-offset-4',
                    index === items.length - 1 ? 'text-pink' : '',
                  )}
                >
                  {item.title}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index < items.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
