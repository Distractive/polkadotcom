import { Suspense } from "react"
import { Environment, Lightformer } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"

import { Objects } from "./objects"

export function Experience() {
  return (
    <div className="not-sr-only fixed top-0 -z-10 size-full">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 30], fov: 20, near: 0.01, far: 200 }}
      >
        <Suspense fallback={null}>
          <fog attach="fog" args={["#fff", 0, 200]} />

          <ambientLight intensity={1.5} />

          <Environment resolution={256}>
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
                intensity={20}
                rotation-y={Math.PI / 2}
                position={[-5, 1, -50]}
                scale={1}
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
