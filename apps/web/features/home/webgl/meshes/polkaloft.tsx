import { useGLTF } from "@react-three/drei"
import type * as THREE from "three"
import { type GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    Polkaloft: THREE.Mesh
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

export function Polkaloft({ ...props }: Props) {
  const { nodes } = useGLTF("/models/polkaloft-transformed.glb") as GLTFResult
  return (
    <mesh
      geometry={nodes.Polkaloft.geometry}
      position={props.position}
      rotation={props.rotation}
      scale={props.scale}
    >
      <meshStandardMaterial attach="material" color="#e2195e" />
    </mesh>
  )
}

useGLTF.preload("/models/polkaloft-transformed.glb")
