import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/kulikuli.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Kulikuli.geometry}
        material={materials.KulikuliMaterial}
      />
    </group>
  )
}