import type { cardSmallSelection } from "@/sanity/selections/blocks/card-small"
import type { TypeFromSelection } from "groqd"

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  cn,
  Heading,
  Icon,
} from "@shared/ui"
import { CustomUrl } from "@/components/custom-url"

interface Props {
  card: TypeFromSelection<typeof cardSmallSelection>
  className?: string
}

export default function CardSmallBlock({ card, className }: Props) {
  const { _key, heading, body, link, icon, eyebrow } = card

  return (
    <Card
      key={_key}
      className={cn(
        link &&
          "md:cursor-pointer md:focus-within:shadow-card md:focus-within:backdrop-blur-0 md:hover:shadow-card md:hover:backdrop-blur-0",
        className
      )}
    >
      <CustomUrl value={link} isWrapper>
        <div
          className={cn(
            "flex h-full gap-card p-card",
            icon ? "items-center" : "items-start"
          )}
        >
          {icon && (
            <img
              src={icon.asset.url}
              alt=""
              loading="lazy"
              className={cn("size-12 object-cover object-center")}
            />
          )}
          <CardContent className="grid gap-copy">
            {eyebrow && (
              <span className="text-base font-bold uppercase text-grey-500">
                {eyebrow}
              </span>
            )}
            {heading && (
              <Heading
                variant="h3"
                size="h4"
                className={cn(
                  "transition-colors duration-500 ease-in-out",
                  link &&
                    "md:group-focus-within:text-pink md:group-hover:text-pink"
                )}
              >
                {heading}
              </Heading>
            )}
            {body && (
              <CardDescription className="text-grey-500">
                {body}
              </CardDescription>
            )}
            {link && link.variant && (
              <Button
                asChild
                variant={
                  link.variant
                    ? link.variant === "primary"
                      ? "primary"
                      : "secondary"
                    : "primary"
                }
                size="md"
                className="md:mr-auto"
              >
                <CustomUrl className="outline-none" value={link}>
                  {link.label}
                </CustomUrl>
              </Button>
            )}
          </CardContent>
          {link && !link.variant && (
            <CardFooter className="ml-auto place-self-center">
              <Icon variant={link.internal ? "arrowRight" : "arrowRightUp"} />
            </CardFooter>
          )}
        </div>
      </CustomUrl>
    </Card>
  )
}
