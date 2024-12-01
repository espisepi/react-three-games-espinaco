// import Scene0 from "../lib/scene-0/Scene0"
import { Suspense } from "react"
import Scene1 from "../lib/scene-1/Scene1"
import Scene2Books from "../lib/scene-2-books/Scene2Books"

const SceneManager = () => {
  return (
    <>
      <Suspense fallback={null}>
        {/* <Scene0 /> */}
        {/* <Scene1 /> */}
        <Scene2Books />
      </Suspense>
    </>
  )
}

export default SceneManager
