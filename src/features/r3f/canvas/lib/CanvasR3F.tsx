import type { CSSProperties } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stats } from "@react-three/drei"
import SceneManager from "../../scenes/manager/SceneManager"

interface CanvasDefaultProps {
  style?: CSSProperties
}

export default function CanvasR3F({
  // style = { position: "absolute", top: "0", width: "100%", height: "100vh", backgroundColor: "black"  },
  // style,
  style = { position: "fixed", top: 0, left: 0, width: "100%", height: "100%" },
}: CanvasDefaultProps): JSX.Element {
  return (
    <Canvas
      style={{ ...style }}
      camera={{
        far: 9999999,
      }}
    >
      <Stats />

      <SceneManager />
      <OrbitControls />
    </Canvas>
  )
}
