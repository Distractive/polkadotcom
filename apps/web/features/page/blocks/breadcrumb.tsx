import React from "react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  cn,
} from "@shared/ui"

export type BreadcrumbItem = {
  slug: string
  title?: string
}

export type BreadcrumbProps = {
  items: BreadcrumbItem[]
}

export function BreadcrumbBlock({ items }: BreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem key={index}>
                <BreadcrumbLink
                  href={item.slug}
                  className={cn(
                    "transition-all duration-200 ease-out hover:text-black hover:underline hover:underline-offset-4",
                    index == items.length - 1 ? "text-pink" : ""
                  )}
                >
                  {item.title}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index < items.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
