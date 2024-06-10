import ReactPlayer from "react-player"

import { cn, Icon } from "@shared/ui"

interface Props {
  url: string
  placeholder: string
}

interface WrapperProps {
  children: React.ReactNode
}
const Wrapper = ({ children }: WrapperProps) => <>{children}</>

export function VideoPlayer({ url, placeholder }: Props) {
  return (
    <div
      className={cn(
        "aspect-video overflow-hidden rounded-2xl",
        "[&>div>iframe]:overflow-hidden [&>div>iframe]:rounded-2xl"
      )}
    >
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls={false}
        playing
        light={placeholder}
        loop
        muted
        playIcon={
          <div
            className={cn(
              "flex size-16 items-center justify-center rounded-2xl",
              "border border-grey-300 bg-white/80 backdrop-blur-md",
              "group"
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
  )
}
