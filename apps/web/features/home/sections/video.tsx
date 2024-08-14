// "use client"

// import { useEffect, useRef } from "react"
import { type videoSelection } from "@/sanity/selections/home/video"
import { type TypeFromSelection } from "groqd"

// import { gsap } from "gsap"

import { cn, Heading } from "@shared/ui"
import { VideoGrid } from "@/features/gradients/video-grid"
import { VideoBlock } from "@/features/page/blocks/video"

import { StaggerHeader } from "../components/stagger-heading"

// import { STANDARD_DELAY } from "../lib/constants"

interface Props {
  video: TypeFromSelection<typeof videoSelection>["video"]
}

export function Video({ video }: Props) {
  // const container = useRef<HTMLDivElement>(null)
  // const TIMELINE = {
  //   defaults: {
  //     ease: "power1.inOut",
  //   },
  // }
  // const timeline = useRef<gsap.core.Timeline | null>(null)

  // useEffect(() => {
  //   if (!container.current) return

  //   timeline.current = gsap.timeline({
  //     ...TIMELINE,
  //   })

  //   return () => {
  //     timeline.current?.kill()
  //   }
  // }, [])

  // useEffect(() => {
  //   if (!timeline.current) return

  //   timeline.current.fromTo(
  //     "#video-block",
  //     {
  //       y: 20,
  //       scale: 0.6,
  //       opacity: 0,
  //     },
  //     {
  //       opacity: 1,
  //       y: 0,
  //       scale: 1,
  //       // delay: STANDARD_DELAY,
  //       scrollTrigger: {
  //         trigger: "#video-pile",
  //         start: "top 50%",
  //         end: "top 80%",
  //         scrub: 1.5,
  //         markers: false,
  //         once: true,
  //       },
  //     }
  //   )

  //   // timeline.current.fromTo(
  //   //   "#video-backgrounds",
  //   //   {
  //   //     opacity: 0,
  //   //   },
  //   //   {
  //   //     opacity: 1,
  //   //     delay: STANDARD_DELAY,
  //   //     scrollTrigger: {
  //   //       trigger: "#video-pile",
  //   //       start: "top 15%",
  //   //       end: "top 90%",
  //   //       scrub: 1,
  //   //       markers: false,
  //   //       once: true,
  //   //     },
  //   //     duration: 0.4,
  //   //   }
  //   // )
  // }, [])

  return (
    <div id="video-pile" className="grid-pile -mt-header-top  md:pt-[10rem]">
      {/* <div
        id="video-backgrounds"
        className="relative w-[100vw] overflow-x-hidden"
      >
        <img
          src="/gradients/3.webp"
          alt=""
          className="absolute top-0 -z-20 h-full w-full rotate-90 object-contain"
          loading="lazy"
        />
        <img
          src="/gradients/grid.png"
          alt=""
          className="absolute -z-30 h-full w-full -translate-x-[-40%] translate-y-[0%] rotate-90 scale-[0.5] object-contain"
          loading="lazy"
        />
      </div> */}

      <div id="" className="max-width relative -z-50 h-full ">
        <div className="absolute left-0 top-0 translate-x-[20%] translate-y-[-15%] md:translate-x-[40%] lg:translate-x-[-50%] xl:translate-x-[-70%]  ">
          <VideoGrid />
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
          {/* <StaggerHeader
            timeline={timeline}
            title={video.title}
            className="w-5/6 pb-gutter text-5xl leading-[1.1] md:w-full md:text-7xl"
            section="#video-pile"
          /> */}
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
