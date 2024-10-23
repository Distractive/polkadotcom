import { type buildSelection } from "@/sanity/selections/home/build"
import { type TypeFromSelection } from "groqd"

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  cn,
  Heading,
  Icon,
} from "@shared/ui"
import { CustomUrl } from "@/components/custom-url"

interface Props {
  build: TypeFromSelection<typeof buildSelection>["build"]
}

export function Build({ build }: Props) {
  return (
    <div
      id="building-pile"
      className="grid-pile relative bg-[image:linear-gradient(to_top_left,rgba(255,255,255,0%)_0%,#FFFFFF_100%),linear-gradient(to_top,rgba(255,255,255,0%)_0%,#FFFFFF_100%),linear-gradient(to_top_left,#AF04FF_0%,#07FFFF_100%)] bg-[length:101%_100%] bg-no-repeat py-[4rem] md:py-[10rem]"
    >
      <article
        id="build.wrapper"
        className="grid-system relative col-span-full h-full w-lvw items-center justify-center overflow-hidden lg:h-full"
      >
        <div
          id="build.content"
          className={cn(
            "max-width col-span-full flex flex-col items-center justify-center sm:w-dvw",
            "md:col-span-full md:col-start-1 md:w-full",
            "lg:col-span-full lg:col-start-1",
            "xl:col-span-10 xl:col-start-2",
            "mt-header-top md:mt-0"
          )}
        >
          <div className="col-span-full px-gutter pb-[5rem] lg:col-span-8 lg:col-start-3 lg:w-4/6 lg:pb-[2rem]">
            <Heading
              variant="h2"
              className="!hyphens-none !break-normal pb-copy text-5xl  leading-[1.1] md:text-7xl"
              aria-label={build.title}
              role="heading"
            >
              {build.title}
            </Heading>

            <p id="building-body" className="mb-gutter text-lg">
              {build.body}
            </p>
          </div>
          <div className="grid-system relative col-span-full gap-card px-card lg:px-gutter">
            {build.items.map((item, index) => (
              <Card
                key={index}
                className={cn(
                  "build-card background-blur col-span-6 flex items-start justify-between bg-white/80 md:col-span-4 md:col-start-2 lg:col-span-4",
                  item.link &&
                    "focus-within:shadow-card focus-within:backdrop-blur-0 md:cursor-pointer md:hover:shadow-card",
                  "!h-auto"
                )}
              >
                <CustomUrl value={item.link} isWrapper className="size-full">
                  <div
                    className={cn("flex h-full items-center gap-card p-card")}
                  >
                    <CardHeader className="grid h-full items-center">
                      {item.heading && (
                        <Heading
                          variant="h3"
                          className={cn(
                            "text-balance text-xl leading-normal transition-colors duration-500 ease-in-out md:text-2xl",
                            item.link &&
                              "group-focus-within:text-pink md:group-hover:text-pink",
                            "!hyphens-none !break-normal"
                          )}
                        >
                          {item.heading}
                        </Heading>
                      )}
                      {item.body && (
                        <CardDescription>{item.body}</CardDescription>
                      )}
                    </CardHeader>
                    {item.link && (
                      <CardFooter className="ml-auto flex h-full flex-col justify-center">
                        {item.link.external ? (
                          <Icon variant="arrowRightUp" />
                        ) : (
                          <Icon variant="arrowRight" />
                        )}
                      </CardFooter>
                    )}
                  </div>
                </CustomUrl>
              </Card>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}
