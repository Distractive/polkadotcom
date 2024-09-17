import Image from "next/image"
import statsGradient from "@/public/gradients/stats-yellow.png"
import { type statsSelection } from "@/sanity/selections/home/stats"
import { type TypeFromSelection } from "groqd"

import { Card, CardDescription, CardHeader, cn, Heading } from "@shared/ui"
import { StatsGradient } from "@/features/gradients/stats-yellow"

interface Props {
  stats: TypeFromSelection<typeof statsSelection>["stats"]
}

export function Stats({ stats }: Props) {
  return (
    <div
      id="stats-pile"
      className="grid-pile relative flex items-center justify-center lg:pt-[10rem]"
    >
      <div id="" className="max-width absolute -z-50 h-full">
        <div className="absolute -right-96 top-0 translate-y-[-50%] transform">
          <Image
            src={statsGradient}
            alt="Stats Gradient"
            width={1000}
            height={1000}
          />
        </div>
      </div>

      <article
        id="stats.wrapper"
        className="grid-pile grid-system relative col-span-12 h-auto w-lvw items-center justify-center overflow-x-hidden lg:h-full"
      >
        <div
          id="stats.content"
          className={cn(
            "max-width grid-system col-span-full sm:w-dvw",
            "md:col-span-full md:col-start-1 md:w-full",
            "lg:col-span-full lg:col-start-1",
            "xl:col-span-10 xl:col-start-2",
            "mt-header-top"
          )}
        >
          <Heading
            variant="h2"
            className={cn(
              "px-gutter py-gutter text-5xl leading-[1.1] lg:pl-gutter lg:pr-gutter",
              "col-span-full md:col-span-3 md:text-7xl lg:col-start-2 xl:col-start-2",
              "!hyphens-none !break-normal"
            )}
            aria-label={stats.title}
            role="heading"
          >
            {stats.title}
          </Heading>
          <div
            className={cn(
              "grid-system relative col-span-full mt-10 gap-card px-gutter lg:mt-0",
              "lg:col-span-8 lg:col-start-7",
              "xl:col-span-8 xl:col-start-7"
            )}
          >
            {stats.items.map((item, index) => (
              <Card
                key={index}
                className={cn(
                  "stats-card background-blur bg-grey-100/50 p-card",
                  "col-span-full col-start-1 md:col-span-2 lg:col-span-6"
                )}
                data-index={index}
              >
                <CardHeader className="grid w-5/6 gap-copy lg:w-full">
                  <Heading variant="h3" className="!hyphens-none !break-normal">
                    {item.heading}
                  </Heading>
                  <CardDescription>{item.body}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}
