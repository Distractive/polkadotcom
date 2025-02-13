import { CustomUrl } from "@/components/custom-url";
import { type networkSelection } from "@/sanity/selections/home/network";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  cn,
  Heading,
  Icon,
} from "@shared/ui";
import { type TypeFromSelection } from "groqd";

interface Props {
  network: TypeFromSelection<typeof networkSelection>["network"]
}

export function Network({ network }: Props) {
  return (
    <div
      id="network-pile"
      data-testid="network-pile"
      className="grid-pile relative py-[6rem] md:py-[10rem]"
    >
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(315deg,rgba(255,255,255,0%)_0%,#FFFFFF_100%),linear-gradient(to_top,rgba(255,255,255,0%)_0%,#FFFFFF_100%),linear-gradient(315deg,#E4FF07_0%,#07FFFF_100%)]"></div>

      <article
        id="network.wrapper"
        className="grid-system relative col-span-full h-full items-center justify-center overflow-x-hidden md:h-full"
      >
        <div
          id="network.content"
          className={cn(
            "max-width col-span-full flex flex-col items-center justify-center",
            "md:col-span-full md:col-start-1 md:w-full",
            "lg:col-span-full lg:col-start-1",
            "xl:col-span-10 xl:col-start-2",
            "mt-header-top md:mt-0"
          )}
        >
          <div
            className={cn(
              "col-span-full px-gutter pb-[4rem]",
              "md:col-span-8 md:col-start-3 lg:w-4/6 lg:pb-[5rem]"
            )}
          >
            <Heading
              variant="h2"
              className="!hyphens-none !break-normal pb-copy text-5xl  leading-[1.1] md:text-7xl"
              aria-label={network.title}
              role="heading"
            >
              {network.title}
            </Heading>

            <p id="network-body" className="mb-gutter text-lg">
              {network.body}
            </p>
          </div>
          <div className="grid-system relative col-span-full mt-[-3rem] gap-card px-card lg:px-gutter">
            {network.items.map((item, index) => (
              <Card
                key={index}
                className={cn(
                  "network-card  col-span-full flex items-start justify-between  md:col-span-4 md:col-start-2 lg:col-span-4",
                  "focus-within:shadow-card focus-within:backdrop-blur-0",
                  item.link && "md:cursor-pointer md:hover:shadow-card",
                  "relative z-30 !h-auto"
                )}
              >
                <CustomUrl value={item.link} isWrapper className="h-full">
                  <div className={cn("flex h-full p-card")}>
                    <CardHeader className="grid w-5/6 gap-copy">
                      {item.heading && (
                        <Heading
                          variant="h3"
                          className={cn(
                            "text-balance text-2xl leading-[1.1] transition-colors duration-200 ease-in-out",
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
                    {item.link && !item.link.variant && (
                      <CardFooter className="ml-auto place-self-center">
                        <Icon
                          variant={
                            item.link.internal ? "arrowRight" : "arrowRightUp"
                          }
                        />
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
