import Image from "next/image"
import { urlForImage } from "@/sanity/lib/image"
import type { cardStickySelection } from "@/sanity/selections/blocks/card-sticky"
import type { TypeFromSelection } from "groqd"

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  cn,
  Heading,
} from "@shared/ui"
import { CustomUrl } from "@/components/custom-url"

interface Props {
  card: TypeFromSelection<typeof cardStickySelection>
  className?: string
}

export default function CardStickyBlock({ card, className }: Props) {
  const { image, icon, eyebrow, heading, body, link } = card

  return (
    <Card className={cn("h-full", className)}>
      <CustomUrl value={link} isWrapper className="inline-block size-full">
        <div className="flex flex-col lg:h-full lg:flex-row">
          {image && (
            <CardHeader className="relative aspect-[4/3] md:aspect-[5/3] lg:aspect-auto lg:h-full lg:min-h-[20rem] lg:basis-1/2">
              <Image
                src={urlForImage(image.asset)}
                alt=""
                loading="lazy"
                className="absolute inset-0 size-full object-cover object-center"
                width={image.asset.metadata.dimensions?.width}
                height={image.asset.metadata.dimensions?.height}
              />
            </CardHeader>
          )}
          {icon && (
            <CardHeader className="relative ml-card mt-card size-16 flex-shrink-0">
              <Image
                src={urlForImage(icon.asset)}
                alt=""
                loading="lazy"
                width={icon.asset.metadata.dimensions?.width}
                height={icon.asset.metadata.dimensions?.height}
                className="absolute inset-0 size-full rounded-2xl"
              />
            </CardHeader>
          )}
          <div
            className={cn(
              "flex flex-col gap-card p-card",
              !icon && "basis-1/2 justify-end"
            )}
          >
            <CardContent className="flex flex-col gap-copy">
              {eyebrow && (
                <span className="text-base uppercase">{eyebrow}</span>
              )}
              {heading && (
                <Heading
                  variant="h3"
                  className={cn(
                    "transition-colors duration-500 ease-in-out",
                    link &&
                      "md:group-focus-within:text-pink md:group-hover:text-pink"
                  )}
                >
                  {heading}
                </Heading>
              )}
              {body && <CardDescription>{body}</CardDescription>}
            </CardContent>
            {link && link.variant && (
              <CardFooter>
                <Button
                  asChild
                  size="md"
                  className="md:group-focus-within:after:translate-x-0 md:group-hover:after:translate-x-0"
                  variant={
                    !link.variant || link.variant === "primary"
                      ? "primary"
                      : "secondary"
                  }
                >
                  <CustomUrl
                    className="outline-none"
                    tabIndex={-1}
                    value={link}
                  >
                    {link.label}
                  </CustomUrl>
                </Button>
              </CardFooter>
            )}
          </div>
        </div>
      </CustomUrl>
    </Card>
  )
}
