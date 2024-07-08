import { useGLTF } from "@react-three/drei"
import type * as THREE from "three"
import { type GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    Platonic_icosa: THREE.Mesh
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

export function Platonic({ ...props }: Props) {
  const { nodes } = useGLTF("models/platonic-transformed.glb") as GLTFResult
  return (
    <mesh
      geometry={nodes.Platonic_icosa.geometry}
      position={props.position}
      rotation={props.rotation}
      scale={props.scale}
    >
      <meshStandardMaterial attach="material" color="#e2195e" />
    </mesh>
  )
}

useGLTF.preload("models/platonic-transformed.glb")
