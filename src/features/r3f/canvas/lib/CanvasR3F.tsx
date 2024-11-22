import type { CSSProperties } from "react"
import { Canvas } from "@react-three/fiber"
import { Stats } from "@react-three/drei"
import SceneManager from "../../scenes/manager/SceneManager"
import ControlsManager from "../../controls/manager/ControlsManager"

interface CanvasDefaultProps {
  style?: CSSProperties
}

export default function CanvasR3F({
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

      <ControlsManager />
    </Canvas>
  )
}
