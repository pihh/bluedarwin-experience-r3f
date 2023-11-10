import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
export function Particles(props) {
  const position = props.position || [0,50,0]
  const size = props.size || 0.05
  const radius = props.radius || 5
  const direction = props.direction || -1
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: radius})
  );
  useFrame((state, delta) => {
    ref.current.rotation.x += direction*(delta / 10);
    ref.current.rotation.y += delta / 15;
  });
  return (
    <group rotation={[0, 0, Math.PI / 4]} position={position}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#5858f4"
          size={size}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}
