import { forwardRef } from "react"
import { useGLTF } from "@react-three/drei"
import type * as THREE from "three"
import { type GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    Sphere_cluster: THREE.Mesh
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

export const Sphere = forwardRef<THREE.Mesh, Props>(
  ({ position, scale, rotation }, ref) => {
    const { nodes } = useGLTF("models/sphere-transformed.glb") as GLTFResult
    return (
      <mesh
        geometry={nodes.Sphere_cluster.geometry}
        position={position}
        rotation={rotation}
        scale={scale}
        ref={ref}
      >
        <meshStandardMaterial attach="material" color="#e2195e" />
      </mesh>
    )
  }
)

Sphere.displayName = "Sphere"

useGLTF.preload("models/sphere-transformed.glb")
