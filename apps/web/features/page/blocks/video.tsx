"use client"

import { useEffect, useState } from "react"
import { type videoSelection } from "@/sanity/selections/blocks/video"
import { type TypeFromSelection } from "groqd"
import ReactPlayer from "react-player"

import { cn, Icon } from "@shared/ui"

interface WrapperProps {
  children: React.ReactNode
}

const Wrapper = ({ children }: WrapperProps) => <>{children}</>

interface Props {
  video: TypeFromSelection<typeof videoSelection>
  className?: string
}

export function VideoBlock({ video, className }: Props) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    <div
      className={cn(
        "max-width aspect-video overflow-hidden rounded-2xl",
        "[&>div>iframe]:overflow-hidden [&>div>iframe]:rounded-2xl",
        className
      )}
    >
      <div className="size-full">
        <ReactPlayer
          url={video.url}
          width="100%"
          height="100%"
          controls={false}
          playing
          light={video.placeholderImage.asset.url}
          loop
          muted
          playIcon={
            <div
              className={cn(
                "flex size-16 items-center justify-center rounded-2xl",
                "border border-grey-300 bg-white/80 backdrop-blur-md",
                "group transition-colors duration-500 ease-in-out"
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
      </div>
    </div>
  )
}
