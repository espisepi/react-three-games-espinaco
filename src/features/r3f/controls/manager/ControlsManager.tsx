import { useAppSelector } from "../../../../app/hooks"
import GodControls from "../lib/godcontrols/GodControls"
import OrbitControls from "../lib/orbitcontrols/OrbitControls"
import { selectControlsType } from "../store/controlsSlice"
import {
  GodControlsTypeValue,
  OrbitControlsTypeValue,
  UndefinedControlsTypeValue,
} from "../types/controlsType"

const ControlsManager = () => {
  const controlsType = useAppSelector(selectControlsType)

  if (controlsType === OrbitControlsTypeValue) {
    return (
      <>
        <OrbitControls />
      </>
    )
  }

  if (controlsType === GodControlsTypeValue) {
    return (
      <>
        <GodControls />
      </>
    )
  }

  if (controlsType === UndefinedControlsTypeValue) {
    return <></>
  }

  return <></>
}

export default ControlsManager
