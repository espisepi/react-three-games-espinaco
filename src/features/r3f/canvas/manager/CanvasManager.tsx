import CanvasR3F from "../lib/CanvasR3F"
import type { CanvasProps } from "../types/CanvasProps"

const CanvasManager = ({ style }: CanvasProps) => {
  return (
    <>
      <CanvasR3F style={style} />
    </>
  )
}

export default CanvasManager
