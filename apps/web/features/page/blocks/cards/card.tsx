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
      <CustomUrl value={link} isWrapper className="flex h-full w-full flex-col">
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
        <div
          className={cn(
            "relative flex flex-grow flex-col",
            useAsBackgroundImage && "bg-gradient-to-t from-black/60 to-black/0"
          )}
        >
          <CardContent
            className={cn(
              "flex flex-grow flex-col gap-card p-card",
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
                  "mr-auto h-[4.5rem] w-auto rounded-2xl"
                )}
              />
            )}
            {selectedTags && selectedTags.length > 0 && (
              <ul className="flex gap-3">
                {selectedTags.map((tag) => (
                  <li
                    key={tag}
                    className="flex items-center justify-center rounded bg-grey-200 px-3 py-1 text-sm leading-relaxed text-black "
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
            <div className="flex flex-grow flex-col gap-card">
              <div
                className={cn(
                  "grid gap-copy",
                  useAsBackgroundImage && "text-white"
                )}
              >
                {eyebrow && (
                  <span className="text-base text-caps-sm uppercase">
                    {eyebrow}
                  </span>
                )}
                {heading && (
                  <Heading
                    variant="h3"
                    size={useSmallHeading ? "h5" : "h3"}
                    weight={useSmallHeading ? "bold" : "normal"}
                    className={cn(
                      "transition-colors duration-200 ease-in-out",
                      useAsBackgroundImage && "text-white"
                    )}
                  >
                    {heading}
                  </Heading>
                )}
                {body && <CardDescription>{body}</CardDescription>}
              </div>
              {link && link.variant && (
                <CardFooter className="mt-auto">
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
                    <CustomUrl className="outline-none" value={link} isNested>
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
