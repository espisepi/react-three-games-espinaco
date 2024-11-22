import type React from "react";
import { useEffect, useRef } from "react";
import { OrbitControls as OrbitControlsDrei } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import type { OrbitControls as ThreeOrbitControls } from 'three-stdlib';

export interface OrbitControlsProps {
  position?: [number, number, number];
  targetPosition?: [number, number, number];
}

type OrbitControlsRef = React.MutableRefObject<ThreeOrbitControls | null>;

const OrbitControls: React.FC<OrbitControlsProps> = ({ position, targetPosition }) => {
  const { camera } = useThree();
  const orbitControlsRef: OrbitControlsRef = useRef<ThreeOrbitControls | null>(null);

  useEffect(() => {
    if (position) {
      camera.position.set(position[0], position[1], position[2]);
      if (targetPosition) {
        orbitControlsRef.current?.target.set(
          targetPosition[0],
          targetPosition[1],
          targetPosition[2]
        );
      } else {
        orbitControlsRef.current?.target.set(0, 0, 0);
      }
    }
  }, [position, targetPosition, camera]);

  return <OrbitControlsDrei ref={orbitControlsRef} />;
};

export default OrbitControls;
