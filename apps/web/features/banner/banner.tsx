import Image from "next/image"
import type { bannerSelection } from "@/sanity/selections/banner"
import type { TypeFromSelection } from "groqd"

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  cn,
  Heading,
  Icon,
} from "@shared/ui"
import { CustomUrl } from "@/components/custom-url"

interface Props {
  banner: TypeFromSelection<typeof bannerSelection>
}

export default function Banner({ banner }: Props) {
  return (
    <>
      {banner?.isBannerOn && (
        <div className="fixed bottom-4 left-4 z-50 hidden rounded-2xl bg-white md:block">
          <Card
            className={cn(
              banner.link &&
                "focus-within:shadow-card focus-within:backdrop-blur-0 md:cursor-pointer md:hover:shadow-card "
            )}
          >
            <CustomUrl value={banner.link} isWrapper>
              <div
                className={cn(
                  "flex h-full gap-6 p-6 lg:gap-card lg:p-card",
                  banner.icon ? "items-center" : "items-start"
                )}
              >
                {banner.icon && (
                  <Image
                    src={banner.icon.asset.url}
                    alt={banner.altText || ""}
                    loading="lazy"
                    width={100}
                    height={100}
                    className={cn(
                      "size-14 rounded-2xl object-cover object-center"
                    )}
                  />
                )}
                <CardContent className="grid gap-copy">
                  {banner.eyebrow && (
                    <span className="text-caps-small text-base font-bold uppercase">
                      {banner.eyebrow}
                    </span>
                  )}
                  {banner.header && (
                    <Heading
                      variant="h3"
                      size="h4"
                      className={cn(
                        "transition-colors duration-100 ease-in-out",
                        banner.link &&
                          "group-focus-within:text-pink md:group-hover:text-pink"
                      )}
                    >
                      {banner.header}
                    </Heading>
                  )}
                  {banner.link && banner.link.variant && (
                    <Button
                      tabIndex={-1}
                      asChild
                      variant={
                        banner.link.variant
                          ? banner.link.variant === "primary"
                            ? "primary"
                            : "secondary"
                          : "primary"
                      }
                      size="md"
                      className="mt-copy group-focus-within:after:translate-x-0 md:mr-auto md:group-hover:after:translate-x-0"
                    ></Button>
                  )}
                </CardContent>
                {banner.link && !banner.link.variant && (
                  <CardFooter className="ml-auto place-self-center">
                    <Icon
                      variant={
                        banner.link.internal ? "arrowRight" : "arrowRightUp"
                      }
                    />
                  </CardFooter>
                )}
              </div>
            </CustomUrl>
          </Card>
        </div>
      )}
    </>
  )
}
