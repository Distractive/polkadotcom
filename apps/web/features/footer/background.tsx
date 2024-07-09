"use client"

import { Suspense } from "react"
import { Environment, Float, Lightformer } from "@react-three/drei"
import { Canvas, useThree } from "@react-three/fiber"

import { useMediaQuery } from "@/hooks/use-mediaquery"

import { Hemi } from "../home/webgl/meshes/hemi"
import { Rombus } from "../home/webgl/meshes/rombus"

export function Background() {
  return (
    <div className="grid-pile absolute bottom-[22rem] -z-30 size-full overflow-hidden md:bottom-0">
      <img
        src="/gradients/d-footer.webp"
        alt=""
        className="absolute top-[12rem] w-full object-center lg:top-0"
        loading="lazy"
        width={1440}
        height={942}
      />
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 30], fov: 20, near: 0.01, far: 200 }}
        className="not-sr-only"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.5} />
          <spotLight
            position={[10, 10, 15]}
            angle={0.15}
            penumbra={1}
            decay={0}
            intensity={2}
          />
          <Environment resolution={128}>
            <group rotation={[-Math.PI / 3, 0, 1]}>
              <Lightformer
                form="circle"
                intensity={4}
                rotation-x={Math.PI / 2}
                position={[0, 5, -9]}
                scale={2}
              />
              <Lightformer
                form="circle"
                intensity={2}
                rotation-y={Math.PI / 2}
                position={[-5, 1, -50]}
                scale={2}
              />
              <Lightformer
                form="circle"
                intensity={2}
                rotation-y={Math.PI / 2}
                position={[-5, -1, -1]}
                scale={2}
              />
              <Lightformer
                form="circle"
                intensity={2}
                rotation-y={-Math.PI / 2}
                position={[10, 1, 0]}
                scale={8}
              />
            </group>
          </Environment>
          <Objects />
        </Suspense>
      </Canvas>
    </div>
  )
}

function Objects() {
  const { viewport } = useThree()
  const isMobile = window.innerWidth < 1024 //this is the breakpoint for mobile (md in tailwindcss)
  const reducedMotion = useMediaQuery("(prefers-reduced-motion)")
  return (
    <Float enabled={!reducedMotion}>
      <Hemi
        position={[-viewport.width / 3, 0, 0]}
        rotation={[Math.PI / 1.7, -0.5, 0]}
        scale={isMobile ? 1.5 : 2}
      />
      <Rombus
        position={[viewport.width / 3.2, 1.2, 0]}
        rotation={[Math.PI / 1.7, 0, 2]}
        scale={isMobile ? 1 : 1.5}
      />
    </Float>
  )
}
