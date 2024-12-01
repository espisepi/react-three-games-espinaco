import type { CSSProperties } from "react"
import type { CanvasProps } from "../types/CanvasProps"
import { Canvas } from "@react-three/fiber"
import { Stats } from "@react-three/drei"
import SceneManager from "../../scenes/manager/SceneManager"
import ControlsManager from "../../controls/manager/ControlsManager"

const defaultCanvasStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
}

export default function CanvasR3F({ style }: CanvasProps): JSX.Element {
  return (
    <Canvas
      shadows
      style={{ ...defaultCanvasStyle, ...style }}
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
