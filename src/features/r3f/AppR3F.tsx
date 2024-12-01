import { ClickToStart } from "../clickToStart/ClickToStart"
import CanvasManager from "./canvas/manager/CanvasManager"

const AppR3F = () => {
  return (
    <ClickToStart>
      <div className="App">
        <header className="App-header">
          <h1>Sepinaco</h1>

          {/* <CanvasManager style={ {backgroundColor: "black"} } /> */}
          <CanvasManager />
        </header>
      </div>
    </ClickToStart>
  )
}

export default AppR3F
