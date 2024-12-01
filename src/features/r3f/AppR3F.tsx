import { ClickToStart } from "../clickToStart/ClickToStart"
import ImageUploader from "../image-uploader/ImageUploader"
import CanvasManager from "./canvas/manager/CanvasManager"

const AppR3F = () => {
  return (
    <ClickToStart>
      <div className="App">
        <header className="App-header">
          <h1>Sepinaco</h1>

          {/* <CanvasManager style={ {backgroundColor: "black"} } /> */}
          <CanvasManager />
          <ImageUploader />
        </header>
      </div>
    </ClickToStart>
  )
}

export default AppR3F
