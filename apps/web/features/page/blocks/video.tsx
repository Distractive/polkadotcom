"use client"

import { useEffect, useState } from "react"
// import ReactPlayer from "react-player"

import dynamic from "next/dynamic"
import { urlForImage } from "@/sanity/lib/image"
import { type videoSelection } from "@/sanity/selections/blocks/video"
import { type TypeFromSelection } from "groqd"

import { cn, Icon } from "@shared/ui"

interface WrapperProps {
  children: React.ReactNode
}

const Wrapper = ({ children }: WrapperProps) => <>{children}</>

interface Props {
  video: TypeFromSelection<typeof videoSelection>
  className?: string
}

// Use dynamic import to fix hydration error
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false })

export function VideoBlock({ video, className }: Props) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div
      className={cn(
        "max-width aspect-video overflow-hidden rounded-2xl",
        "[&>div>div]:!rounded-2xl [&>div>iframe]:!rounded-2xl [&_div]:!rounded-2xl",
        className
      )}
    >
      <div className="size-full">
        {isClient && (
          <ReactPlayer
            url={video.url}
            width="100%"
            height="100%"
            controls={false}
            playing
            light={urlForImage(video.placeholderImage.asset)}
            loop
            playIcon={
              <div
                className={cn(
                  "flex size-16 items-center justify-center rounded-2xl",
                  "border border-grey-300 bg-white ",
                  "group transition-colors duration-200 ease-in-out"
                )}
              >
                <Icon variant="videoPlay" className="group-hover:fill-pink" />
              </div>
            }
            wrapper={Wrapper}
            config={{
              youtube: {
                playerVars: {
                  showinfo: 0,
                  controls: 1,
                  disablekb: 1,
                  rel: 0,
                  autoplay: 1,
                  playsinline: 1,
                  modestbranding: 1,
                  loop: 1,
                },
              },
            }}
          />
        )}
      </div>
    </div>
  )
}
