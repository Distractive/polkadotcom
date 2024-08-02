"use client"

import { useEffect, useLayoutEffect, useRef } from "react"
import { type homeSelection } from "@/sanity/selections/home/root"
import Lenis from "@studio-freight/lenis"
import { type TypeFromSelection } from "groqd"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

import { Connected } from "@/features/home/sections/connected"
import { Ecosystem } from "@/features/home/sections/ecosystem"
import { Hero } from "@/features/home/sections/hero"
import { Network } from "@/features/home/sections/network"
import { Build } from "@/features/home/sections/start-building"
import { Stats } from "@/features/home/sections/stats"
import { Video } from "@/features/home/sections/video"

import { polkadotNewsletter } from "../forms/newsletters"
import { FormModalBlock } from "../page/blocks/form-modal"
import { Newsletter } from "../page/blocks/newsletter"
import { Experience } from "./webgl/experience"

interface Props {
  home: TypeFromSelection<typeof homeSelection>["home"]
}

export function Root({ home }: Props) {
  const scrollRef = useRef<Lenis>()

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    window.scrollTo(0, 0)
  }, [])

  // useEffect(() => {
  //   scrollRef.current = new Lenis({
  //     duration: 1.2,
  //     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  //     touchMultiplier: 2,
  //     orientation: "vertical",
  //     smoothWheel: true,
  //     gestureOrientation: "vertical",
  //   })

  //   scrollRef.current.on("scroll", ScrollTrigger.update)

  //   const updateFunc: gsap.TickerCallback = (time) => {
  //     scrollRef.current?.raf(time * 1000)
  //   }

  //   gsap.ticker.add(updateFunc, false, true)

  //   return () => {
  //     gsap.ticker.remove(updateFunc)
  //     scrollRef.current?.destroy()
  //   }
  // }, [])

  return (
    // <div className="bg-gradient-to-b from-white to-[#D9E0FF]">
    <div>
      <Hero hero={home.hero} />
      <Video video={home.video} />
      <Network network={home.network} />
      <Stats stats={home.stats} />
      <Ecosystem ecosystem={home.ecosystem} />
      <Build build={home.build} />
      <Connected connected={home.connected} />
      <Newsletter />
      {/* <Experience /> */}
    </div>
  )
}
