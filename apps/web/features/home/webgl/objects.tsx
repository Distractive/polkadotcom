import { useRef } from "react"
import { Float } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import type { Group, Mesh } from "three"

import { useMediaQuery } from "@/hooks/use-mediaquery"

import { Cone } from "./meshes/cone"
import { Connect } from "./meshes/connect"
import { Donut } from "./meshes/donut"
import { Hemi } from "./meshes/hemi"
import { Interlock } from "./meshes/interlock"
import { Matrix } from "./meshes/matrix"
import { Platonic } from "./meshes/platonic"
import { Rombus } from "./meshes/rombus"
import { Sphere } from "./meshes/sphere"
import { Tenta } from "./meshes/tenta"
import { Tetra } from "./meshes/tetra"
import { Twirly } from "./meshes/twirly"
import { Urchin } from "./meshes/urchin"
import { Wavy } from "./meshes/wavy"

export function Objects() {
  const twirly = useRef<Mesh>(null)
  const { viewport } = useThree()
  const scalingFactor = Math.min(Math.max(window.innerWidth / 1440, 0.6), 1)
  const isMobile = window.innerWidth < 1024
  const one = useRef<Group>(null)
  const two = useRef<Group>(null)
  const large = useRef<Group>(null)
  const offset = useRef(Math.random() * 10000)
  const SPEED = 2
  const INTENSITY = 0.5
  const reducedMotion = useMediaQuery("(prefers-reduced-motion)")

  useFrame((state) => {
    if (reducedMotion) return
    const t = offset.current + state.clock.getElapsedTime()
    if (one.current) {
      one.current.rotation.x = (Math.cos((t / 4) * SPEED) / 8) * INTENSITY
      one.current.rotation.y += (Math.sin((t / 4) * 0.001) / 4) * 0.002
    }
    if (two.current) {
      two.current.rotation.x = (Math.cos((t / 4) * SPEED) / 8) * INTENSITY
      two.current.rotation.y -= (Math.sin((t / 4) * 0.001) / 4) * 0.006
    }

    if (large.current) {
      large.current.rotation.x = (Math.cos((t / 4) * SPEED) / 4) * INTENSITY
      large.current.rotation.y -= (Math.sin((t / 4) * 0.001) / 4) * 0.009
    }
  })
  return (
    <>
      <group visible={true} ref={two} position={[0, 1, 0]}>
        <Twirly
          scale={scalingFactor}
          position={[0, viewport.height / 3, -2]}
          rotation={[Math.PI / 2, 0, 0]}
          ref={twirly}
        />
        <Wavy
          scale={scalingFactor / 2.5}
          position={[viewport.width / 3, viewport.height / 3, -2]}
          rotation={[2, 1, 0]}
        />
        <Cone
          scale={scalingFactor / 2.5}
          position={[-viewport.width / 2, viewport.height / 3, -2]}
          rotation={[0, 0, 0]}
        />
      </group>
      <group
        visible={true}
        ref={one}
        position={[0, isMobile ? -viewport.height / 2.2 : -2.5, 0]}
      >
        <Donut
          scale={scalingFactor}
          position={[viewport.width / 3.5, 0, -15]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <Connect
          scale={scalingFactor}
          position={[viewport.width / 2.2, 1, 0]}
          rotation={[0, -4.5, 0]}
        />
        <Platonic
          position={[
            -viewport.width / 2,
            isMobile ? viewport.height - 8.5 : 0,
            -7,
          ]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={scalingFactor}
        />
        <Sphere
          position={[
            viewport.width / 2.3,
            isMobile ? -viewport.height / 4 : -viewport.height / 4,
            -10,
          ]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={scalingFactor}
        />
        <Hemi
          position={[
            -viewport.width / 2.5,
            isMobile ? viewport.height / 4 : -viewport.height / 6,
            -15,
          ]}
          rotation={[Math.PI / 2, -0.5, 0]}
          scale={scalingFactor}
        />
        <Urchin
          scale={scalingFactor}
          position={[-viewport.width / 3, -0.3, -20]}
          rotation={[0, 0, 0]}
        />
      </group>
      <group
        name="large"
        ref={large}
        position={[0, -3, 0]}
        rotation={[0, 0, -4]}
      >
        <Urchin
          scale={scalingFactor}
          position={[-viewport.width / 3, -0.3, -20]}
          rotation={[0, 0, 0]}
        />
        <Donut
          scale={scalingFactor}
          position={[viewport.width / 3.5, 0, -15]}
          rotation={[0, Math.PI / 2, 0]}
        />
      </group>
    </>
  )
}
