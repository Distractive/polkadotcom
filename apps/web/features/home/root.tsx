import { type homeSelection } from "@/sanity/selections/home/root"
import { type TypeFromSelection } from "groqd"

import { Connected } from "@/features/home/sections/connected"
import { Ecosystem } from "@/features/home/sections/ecosystem"
import { Hero } from "@/features/home/sections/hero"
import { Network } from "@/features/home/sections/network"
import { Build } from "@/features/home/sections/start-building"
import { Stats } from "@/features/home/sections/stats"
import { Video } from "@/features/home/sections/video"

import { Newsletter } from "../page/blocks/newsletter"

interface Props {
  home: TypeFromSelection<typeof homeSelection>["home"]
}

export function Root({ home }: Props) {
  return (
    <div>
      <Hero hero={home.hero} />
      <Video video={home.video} />
      <Network network={home.network} />
      <Stats stats={home.stats} />
      <Ecosystem ecosystem={home.ecosystem} />
      <Build build={home.build} />
      <Connected connected={home.connected} />
      <Newsletter />
    </div>
  )
}
