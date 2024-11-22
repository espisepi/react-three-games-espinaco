import React, { useCallback, useEffect, useState } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import useKeyPress from "../../hooks/useKeyPress";

const SPEED_MIN_VALUE = 5;
const SPEED_MAX_VALUE = 10;

interface GodControlsProps {
  position?: [number, number, number];
}

export default function GodControls({ position }: GodControlsProps): JSX.Element {
  const { camera } = useThree();
  const [yaw, setYaw] = useState(0);
  const [pitch, setPitch] = useState(0);

  // useEffect(() => {
  //   if (position) {
  //     camera.position.set(position[0], position[1], position[2]);
  //   }
  // }, [position, camera]);

  // useEffect(() => {
  //   // @ts-ignore
  //   (window as any).camera = camera;
  // }, [camera]);

  const speedKeyPress = useKeyPress("ShiftLeft");
  const moveForwardKeyPress = useKeyPress("w");
  const moveBackKeyPress = useKeyPress("s");
  const moveLeftKeyPress = useKeyPress("a");
  const moveRightKeyPress = useKeyPress("d");
  const moveHeight = useKeyPress("e");
  const moveDown = useKeyPress("q");
  const rotateLeftKeyPress = useKeyPress("l");
  const rotateUpKeyPress = useKeyPress("k");
  const rotateDownKeyPress = useKeyPress("i");
  const rotateRightKeyPress = useKeyPress("j");

  const moveForward = useCallback(
    (distance: number) => {
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      direction.y = 0;
      direction.normalize();
      camera.position.addScaledVector(direction, distance);
    },
    [camera]
  );

  const moveRight = useCallback(
    (distance: number) => {
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      direction.y = 0;
      direction.normalize();
      direction.cross(camera.up);
      camera.position.addScaledVector(direction, distance);
    },
    [camera]
  );

  const moveY = useCallback(
    (distance: number) => {
      camera.position.y += distance;
    },
    [camera]
  );

  const updateRotation = useCallback((deltaYaw: number, deltaPitch: number) => {
    setYaw((prev) => prev + deltaYaw);
    setPitch((prev) => Math.max(-Math.PI / 2, Math.min(Math.PI / 2, prev + deltaPitch)));
  }, []);

  useFrame((_, delta) => {
    const speed = speedKeyPress ? SPEED_MAX_VALUE : SPEED_MIN_VALUE;
    const rotationSpeed = delta * 1;

    if (moveForwardKeyPress) moveForward(delta * speed);
    if (moveBackKeyPress) moveForward(-delta * speed);
    if (moveRightKeyPress) moveRight(delta * speed);
    if (moveLeftKeyPress) moveRight(-delta * speed);
    if (moveHeight) moveY(delta * speed);
    if (moveDown) moveY(-delta * speed);

    if (rotateLeftKeyPress) updateRotation(-rotationSpeed, 0);
    if (rotateRightKeyPress) updateRotation(rotationSpeed, 0);
    if (rotateUpKeyPress) updateRotation(0, -rotationSpeed);
    if (rotateDownKeyPress) updateRotation(0, rotationSpeed);

    camera.rotation.set(pitch, yaw, 0, "YXZ");
  });

  return <></>;
}
