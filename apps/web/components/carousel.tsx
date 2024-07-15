"use client"

import { useEffect, useState } from "react"

import {
  CarouselContainer,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  cn,
  Progress,
  type CarouselApi,
} from "@shared/ui"

interface Props {
  children: React.ReactNode
  loop?: boolean
  contentClassName?: string
  navClassName?: string
  disableCarouselControls?: boolean
  className?: string
}

export function Carousel({
  loop = true,
  contentClassName,
  navClassName,
  children,
  disableCarouselControls,
  className,
}: Props) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [isDraggable, setIsDraggable] = useState(false)

  useEffect(() => {
    if (disableCarouselControls) {
      setIsDraggable(disableCarouselControls)
    } else {
      setIsDraggable(false)
    }
  }, [disableCarouselControls])

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    api.on("select", () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  return (
    <CarouselContainer
      setApi={setApi}
      opts={{
        align: "start",
        loop,
        active: !isDraggable,
        watchDrag: !isDraggable,
        duration: 40,
      }}
      className={cn(
        "col-span-full flex flex-col gap-gutter overflow-hidden",
        className
      )}
    >
      <CarouselContent className={contentClassName}>{children}</CarouselContent>

      {!disableCarouselControls && (
        <div className={cn("flex items-center justify-between", navClassName)}>
          <Progress count={count} current={current} />
          <div className="flex gap-2">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </div>
      )}
    </CarouselContainer>
  )
}
