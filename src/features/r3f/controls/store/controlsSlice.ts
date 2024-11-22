import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../../../app/createAppSlice"
import type { AppThunk } from "../../../../app/store"
import {
  GodControlsTypeValue,
  OrbitControlsTypeValue,
  type ControlsType,
} from "../types/controlsType"

export interface ControlsSliceState {
  currentControlsType: ControlsType
}

const initialState: ControlsSliceState = {
  currentControlsType: OrbitControlsTypeValue,
//   currentControlsType: GodControlsTypeValue,
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const controlsSlice = createAppSlice({
  name: "controls",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: create => ({
    setOrbitControls: create.reducer(state => {
      state.currentControlsType = OrbitControlsTypeValue
    }),

    setGodControls: create.reducer(state => {
      state.currentControlsType = GodControlsTypeValue
    }),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectControlsType: counter => counter.currentControlsType,
  },
})

// Action creators are generated for each case reducer function.
export const { setOrbitControls, setGodControls } = controlsSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectControlsType } = controlsSlice.selectors
