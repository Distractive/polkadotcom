import { forwardRef } from "react"
import { useGLTF } from "@react-three/drei"
import type * as THREE from "three"
import { type GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    Twirly_sphere001: THREE.Mesh
  }
  materials: {
    ["default"]: THREE.MeshStandardMaterial
  }
}

interface Props {
  position: [number, number, number]
  scale?: number
  rotation: [number, number, number]
}

export const Twirly = forwardRef<THREE.Mesh, Props>(
  ({ position, scale, rotation }, ref) => {
    const { nodes } = useGLTF("models/twirly-transformed.glb") as GLTFResult
    return (
      <mesh
        geometry={nodes.Twirly_sphere001.geometry}
        position={position}
        rotation={rotation}
        scale={scale}
        ref={ref}
      >
        <meshStandardMaterial attach="material" color="#e2195e" transparent />
      </mesh>
    )
  }
)

Twirly.displayName = "Twirly"

useGLTF.preload("models/twirly-transformed.glb")
