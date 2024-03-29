import React, { useRef } from "react";
import { MACBOOK_Z_TRAVEL_RATE, MACBOOK_Z_MAX } from "~/constants/defaults";
import useMouseCoords from "~/hooks/useMouseCoords";
import MacbookKeyboard from "./Macbook.Keyboard";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import MacbookScreen from "./Macbook.Screen";
import _debounce from "lodash/debounce";
import { Group } from "three";

type MacbookProps = {
  videoSource: string;
};

const Macbook: React.FC<MacbookProps> = ({ videoSource }) => {
  const mouseCoords = useMouseCoords();
  const groupRef = useRef<Group>(null);
  const scroll = useScroll();

  useFrame(() => {
    if (groupRef.current) {
      // Animate Macbook rotation (look at cursor effect)
      const targetRotationX = -(mouseCoords.y * (Math.PI / 8));
      const targetRotationY = mouseCoords.x * (Math.PI / 8);

      groupRef.current.rotation.x += 0.04 * (targetRotationX - groupRef.current.rotation.x);
      groupRef.current.rotation.y += 0.04 * (targetRotationY - groupRef.current.rotation.y);

      // Animate Macbook zoom (bring to front at certain scroll point)
      const newZ = scroll.offset * MACBOOK_Z_TRAVEL_RATE;
      groupRef.current.position.z =
        newZ > MACBOOK_Z_MAX
          ? MACBOOK_Z_MAX
          : scroll.offset * MACBOOK_Z_TRAVEL_RATE;
    }
  });

  return (
    <group
      dispose={null}
      ref={groupRef}
      position={[0, -1, -50]}
      scale={[0.01, 0.01, 0.01]}
      rotation={[0, Math.PI / 2, 0]}
    >
      <MacbookScreen videoSource={videoSource} />
      <MacbookKeyboard />
    </group>
  );
};

export default Macbook;
