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
    <div id="video-pile" className="grid-pile -mt-header-top  md:pt-[10rem]">
      <div id="" className="max-width relative -z-50 h-full ">
        <div className="absolute left-0 top-0 translate-x-[20%] translate-y-[-15%] scale-[0.8] md:translate-x-[40%] lg:translate-x-[-50%] xl:translate-x-[-70%] ">
          <Image src={videoGrid} alt="Video Grid" width={1000} height={1000} />
        </div>
      </div>
      <article
        id="video.wrapper"
        className="grid-system col-span-full h-full w-dvw items-center justify-center overflow-hidden"
      >
        <div
          id="video.content"
          className={cn(
            "max-width relative z-10 col-span-12 px-gutter sm:w-dvw",
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
