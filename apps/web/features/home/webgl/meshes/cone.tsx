import { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import type * as THREE from "three"
import { type Mesh } from "three"
import { type GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    Conesphere: THREE.Mesh
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

export function Cone({ ...props }: Props) {
  const { nodes } = useGLTF("models/cone-transformed.glb") as GLTFResult
  const ref = useRef<Mesh>(null)

  return (
    <mesh
      geometry={nodes.Conesphere.geometry}
      position={props.position}
      rotation={props.rotation}
      scale={props.scale}
      ref={ref}
    >
      <meshStandardMaterial attach="material" color="#e2195e" />
    </mesh>
  )
}

useGLTF.preload("models/cone-transformed.glb")
