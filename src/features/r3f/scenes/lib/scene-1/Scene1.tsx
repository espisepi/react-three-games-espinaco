import { useAppDispatch } from "../../../../../app/hooks"
import { setGodControls, setOrbitControls } from "../../../controls/store/controlsSlice"
import Box from "../../../prefabs/box/Box"

const Scene1 = () => {
  const dispatch = useAppDispatch()

  return (
    <>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Box position={[-1.2, 0, 0]} onClick={event => dispatch(setGodControls())} />
      <Box position={[1.2, 0, 0]} onClick={event => dispatch(setOrbitControls())}/>
    </>
  )
}

export default Scene1
