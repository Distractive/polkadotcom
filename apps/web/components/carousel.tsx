"use client"

import { useEffect, useState } from "react"

import {
  CarouselContainer,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  Progress,
  type CarouselApi,
} from "@shared/ui"

interface Props {
  children: React.ReactNode
}

export function Carousel({ children }: Props) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    api.on("select", () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  return (
    <CarouselContainer
      setApi={setApi}
      opts={{ align: "start", loop: true }}
      className="col-span-12 flex flex-col gap-gutter"
    >
      <CarouselContent>{children}</CarouselContent>
      <div className="flex items-center justify-between">
        <Progress count={count} current={current} />
        <div className="flex gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>
    </CarouselContainer>
  )
}
