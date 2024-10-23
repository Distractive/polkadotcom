import Image from "next/image"
import videoGrid from "@/public/gradients/video-grid.png"
import { type videoSelection } from "@/sanity/selections/home/video"
import { type TypeFromSelection } from "groqd"

import { cn, Heading } from "@shared/ui"
import { VideoBlock } from "@/features/page/blocks/video"

interface Props {
  video: TypeFromSelection<typeof videoSelection>["video"]
}

export function Video({ video }: Props) {
  return (
    <div
      id="video-pile"
      className="grid-pile -mt-header-top pb-16 pt-64 lg:pt-24"
    >
      <article
        id="video.wrapper"
        className="grid-system col-span-full h-full w-dvw items-center justify-center overflow-hidden"
      >
        <div
          id="video.content"
          className={cn(
            "max-width relative z-10 col-span-12 !max-w-[80rem] px-gutter sm:w-dvw",
            "md:w-full lg:col-span-8 lg:col-start-3"
          )}
        >
          <Heading
            variant="h2"
            className="!hyphens-none !break-normal pb-5 text-5xl  leading-[1.1] md:text-7xl"
            aria-label={video.title}
            role="heading"
          >
            {video.title}
          </Heading>
          <div id="video-block">
            <VideoBlock video={video.video} />
          </div>
        </div>
      </article>
    </div>
  )
}
