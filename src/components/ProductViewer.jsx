import { Canvas } from '@react-three/fiber'
import { OrbitControls, PresentationControls, Stage } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Model } from './Model'

export default function ProductViewer({ product }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[400px] w-full"
    >
      <Canvas>
        <Stage environment="city" intensity={0.6}>
          <PresentationControls
            speed={1.5}
            global
            zoom={0.7}
            polar={[-0.1, Math.PI / 4]}
          >
            <Model />
          </PresentationControls>
        </Stage>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </motion.div>
  )
}