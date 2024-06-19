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
  showSideBySide?: boolean
  className?: string
}

export default function CardBlock({ card, showSideBySide, className }: Props) {
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
  } = card

  const showSideBySideWithIcon =
    !useAsBackgroundImage && icon && !headerImage && showSideBySide

  return (
    <Card
      key={_key}
      className={cn(
        headerImage && showSideBySide && "lg:flex",
        link &&
          "md:cursor-pointer md:hover:shadow-card md:hover:backdrop-blur-0",
        className
      )}
      data-tags={selectedTags?.join(",")}
    >
      <CustomUrl
        value={link}
        isWrapper
        className={cn(
          showSideBySide && !showSideBySideWithIcon && "lg:flex lg:w-full"
        )}
      >
        {headerImage && useAsBackgroundImage && (
          <img
            src={headerImage.asset.url}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        )}
        {headerImage && (
          <CardHeader
            className={cn(
              "relative z-10 aspect-video",
              showSideBySide && "lg:h-[26rem] lg:basis-[60%]"
            )}
          >
            {!useAsBackgroundImage && (
              <img
                src={headerImage.asset.url}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            )}
          </CardHeader>
        )}
        <div
          className={cn(
            "relative",
            showSideBySide && "flex flex-col justify-end lg:basis-[40%]"
          )}
        >
          <CardContent
            className={cn(
              "grid p-card",
              headerImage && icon && !showSideBySide && "pt-0",
              showSideBySideWithIcon ? "gap-gutter lg:flex" : "gap-card"
            )}
          >
            {icon && (
              <img
                src={icon.asset.url}
                alt=""
                loading="lazy"
                className={cn(
                  headerImage &&
                    icon &&
                    !showSideBySide &&
                    "relative z-10 -mt-[2.25rem]",
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
            <div className={cn(showSideBySideWithIcon && "grid gap-copy")}>
              <div className="grid gap-copy">
                {eyebrow && (
                  <span className="text-base uppercase">{eyebrow}</span>
                )}
                {heading && (
                  <Heading
                    variant="h4"
                    className={cn(
                      "text-balance transition-colors duration-500 ease-in-out",
                      link && "md:group-hover:text-pink"
                    )}
                  >
                    {heading}
                  </Heading>
                )}
                {body && (
                  <CardDescription
                    className={cn(showSideBySideWithIcon && "text-grey-500")}
                  >
                    {body}
                  </CardDescription>
                )}
              </div>
              {link && (
                <CardFooter
                  className={cn(!showSideBySideWithIcon && "pt-card")}
                >
                  <Button
                    size="md"
                    className="md:group-hover:after:translate-x-0"
                    variant={
                      link.variant
                        ? link.variant === "primary"
                          ? "primary"
                          : "secondary"
                        : "primary"
                    }
                  >
                    <CustomUrl value={link}>{link.label}</CustomUrl>
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
