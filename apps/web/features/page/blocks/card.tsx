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
    tags,
    eyebrow,
    heading,
    body,
    link,
    useAsBackgroundImage,
  } = card

  return (
    <Card
      key={_key}
      className={cn(
        "group relative overflow-hidden bg-white backdrop-blur-lg",
        "rounded-2xl border-[1px] border-grey-400",
        "md:hover:shadow-card md:hover:backdrop-blur-0",
        "transition-shadow duration-500 ease-in-out",
        headerImage && showSideBySide && "lg:flex",
        link && "md:cursor-pointer",
        className
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
            showSideBySide && "lg:basis-[52%] "
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

      <div className={cn("relative", showSideBySide && "lg:basis-[48%]")}>
        <CardContent
          className={cn(headerImage && icon && !showSideBySide && "pt-0")}
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
                  "-mt-[2.25rem] h-[4.5rem] w-auto"
              )}
            />
          )}
          {tags && (
            <ul className="flex gap-3">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="flex items-center justify-center rounded bg-grey-200 px-3 py-1 text-sm leading-relaxed"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
          <div className="grid gap-copy">
            {eyebrow && <span className="text-base uppercase">{eyebrow}</span>}
            {heading && (
              <Heading
                variant="h3"
                className="text-balance transition-colors duration-500 ease-in-out md:group-hover:text-pink"
              >
                {heading}
              </Heading>
            )}
            {body && <CardDescription>{body}</CardDescription>}
          </div>
        </CardContent>
        {link && (
          <CardFooter>
            <Button size="md" className="md:group-hover:after:translate-x-0">
              {link.label}
            </Button>
          </CardFooter>
        )}
      </div>
    </Card>
  )
}
