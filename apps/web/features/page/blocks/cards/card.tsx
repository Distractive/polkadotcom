import Image from "next/image"
import { urlForImage } from "@/sanity/lib/image"
import type { cardSelection } from "@/sanity/selections/blocks/card"
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
  card: TypeFromSelection<typeof cardSelection>
  className?: string
}

export default function CardBlock({ card, className }: Props) {
  const {
    _key,
    headerImage,
    icon,
    selectedTags,
    eyebrow,
    heading,
    body,
    link,
    useAsBackgroundImage,
    useSmallHeading,
  } = card

  return (
    <Card
      key={_key}
      className={cn(
        link &&
          "focus-within:shadow-card focus-within:backdrop-blur-0 md:cursor-pointer md:hover:shadow-card md:hover:backdrop-blur-0",
        className
      )}
      data-tags={selectedTags?.join(",")}
    >
      <CustomUrl value={link} isWrapper>
        {headerImage && useAsBackgroundImage && (
          <Image
            src={urlForImage(headerImage.asset)}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-center"
            width={headerImage.asset.metadata.dimensions?.width}
            height={headerImage.asset.metadata.dimensions?.height}
          />
        )}
        {headerImage && (
          <CardHeader className="relative z-10 aspect-[4/3]">
            {!useAsBackgroundImage && (
              <Image
                src={urlForImage(headerImage.asset)}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-center"
                width={headerImage.asset.metadata.dimensions?.width}
                height={headerImage.asset.metadata.dimensions?.height}
              />
            )}
          </CardHeader>
        )}
        <div className="relative">
          <CardContent
            className={cn(
              "grid gap-card p-card",
              headerImage && icon && "pt-0"
            )}
          >
            {icon && (
              <Image
                src={urlForImage(icon.asset)}
                alt=""
                loading="lazy"
                width={icon.asset.metadata.dimensions?.width}
                height={icon.asset.metadata.dimensions?.height}
                className={cn(
                  headerImage && icon && "relative z-10 -mt-[2.25rem]",
                  "h-[4.5rem] w-auto rounded-2xl"
                )}
              />
            )}
            {selectedTags && selectedTags.length > 0 && (
              <ul className="flex gap-3">
                {selectedTags.map((tag) => (
                  <li
                    key={tag}
                    className="flex items-center justify-center rounded bg-grey-200 px-3 py-1 text-sm leading-relaxed"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
            <div className="grid gap-card">
              <div className="grid gap-copy">
                {eyebrow && (
                  <span className="text-base uppercase">{eyebrow}</span>
                )}
                {heading && (
                  <Heading
                    variant="h3"
                    size={useSmallHeading ? "h5" : "h3"}
                    weight={useSmallHeading ? "bold" : "normal"}
                    className={cn(
                      "transition-colors duration-500 ease-in-out",
                      link &&
                        "group-focus-within:text-pink md:group-hover:text-pink"
                    )}
                  >
                    {heading}
                  </Heading>
                )}
                {body && <CardDescription>{body}</CardDescription>}
              </div>
              {link && link.variant && (
                <CardFooter>
                  <Button
                    tabIndex={-1}
                    asChild
                    size="md"
                    className="group-focus-within:after:translate-x-0 md:group-hover:after:translate-x-0"
                    variant={
                      link.variant
                        ? link.variant === "primary"
                          ? "primary"
                          : "secondary"
                        : "primary"
                    }
                  >
                    <CustomUrl className="outline-none" value={link}>
                      {link.label}
                    </CustomUrl>
                  </Button>
                </CardFooter>
              )}
            </div>
          </CardContent>
        </div>
      </CustomUrl>
    </Card>
  )
}
