"use client"

import { type videoSelection } from "@/sanity/selections/home/video"
import * as Scrollytelling from "@bsmnt/scrollytelling"
import { type TypeFromSelection } from "groqd"

import { VideoBlock } from "@/features/page/blocks/video"

import { StaggerHeader } from "../components/stagger-heading"

interface Props {
  video: TypeFromSelection<typeof videoSelection>["video"]
}

export function Video({ video }: Props) {
  return (
    <div id="video-pile" className="grid-pile -mt-[75vh]">
      <Scrollytelling.Root defaults={{ ease: "linear" }}>
        <Scrollytelling.Pin
          childHeight={"100vh"}
          pinSpacerHeight={"250vh"}
          top={"0"}
          childClassName="-z-10 overflow-hidden"
        >
          <Scrollytelling.Animation
            tween={[
              {
                start: 40,
                end: 60,
                fromTo: [
                  {
                    y: 20,
                    scale: 0.2,
                    opacity: 0,
                  },
                  {
                    opacity: 1,
                    y: 0,
                    scale: 0.5,
                  },
                ],
              },
              {
                start: 80,
                end: 100,
                to: {
                  scale: 0.5,
                  opacity: 0,
                },
              },
            ]}
          >
            <img
              src="/gradients/3.webp"
              alt="gradient"
              className="absolute top-0 -z-20 h-full w-full rotate-90 scale-50"
            />
          </Scrollytelling.Animation>
          <Scrollytelling.Animation
            tween={[
              {
                start: 10,
                end: 30,
                fromTo: [
                  {
                    opacity: 0,
                  },
                  {
                    opacity: 1,
                  },
                ],
              },
              {
                start: 80,
                end: 100,
                to: {
                  opacity: 0,
                },
              },
            ]}
          >
            <div>
              <img
                src="/gradients/5.webp"
                alt="gradient"
                role="presentation"
                className="absolute -z-30 h-full w-full -translate-x-[-40%] translate-y-[0%] rotate-90 scale-[0.5]"
              />
            </div>
          </Scrollytelling.Animation>
        </Scrollytelling.Pin>
      </Scrollytelling.Root>
      <Scrollytelling.Root defaults={{ ease: "linear" }}>
        <Scrollytelling.Pin
          childHeight={"100vh"}
          pinSpacerHeight={"250vh"}
          top={"0"}
        >
          <article
            id="video.wrapper"
            className="grid-system col-span-full h-full w-dvw items-center justify-center overflow-hidden"
          >
            <div
              id="video.content"
              className="max-width relative z-10 col-span-12 px-gutter sm:w-dvw md:col-span-4 md:col-start-2 md:w-full lg:col-span-8 lg:col-start-3"
            >
              <StaggerHeader
                title={video.title}
                className="w-5/6 pb-gutter text-5xl leading-[1.1] md:w-full md:text-7xl"
              />
              <Scrollytelling.Animation
                tween={[
                  {
                    start: 20,
                    end: 60,
                    fromTo: [
                      {
                        y: 20,
                        scale: 0.6,
                        opacity: 0,
                      },
                      {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      },
                    ],
                  },
                ]}
              >
                <div>
                  <VideoBlock video={video.video} />
                </div>
              </Scrollytelling.Animation>
            </div>
          </article>
        </Scrollytelling.Pin>
      </Scrollytelling.Root>
    </div>
  )
}
