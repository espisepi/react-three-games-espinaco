import { Loader } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { Experience } from "./components/Experience"
import { UI } from "./components/UI"

export function BooksPrefab(): JSX.Element {
  return (
    <>
      <group position-y={0}>
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </group>
    </>
  )
}

// old code ========================================
// This method is not used in this app
// export function AppBooks(): JSX.Element {
//   return (
//     <>
//       <div
//         id="app-espinaco"
//         style={{
//           position: "relative",
//           cursor: "cell",
//           height: "100vh",
//           width: "100vw",
//           backgroundColor: "#4d124d",
//         }}
//       >
//         <UI />
//         <Loader />
//         <Canvas shadows camera={{ position: [-0.5, 1, 4], fov: 45 }}>
//           <group position-y={0}>
//             <Suspense fallback={null}>
//               <Experience />
//             </Suspense>
//           </group>
//         </Canvas>
//       </div>
//     </>
//   )
// }
