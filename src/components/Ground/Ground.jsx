import { Reflector, useTexture } from "@react-three/drei";


export function Ground() {
    const [floor, normal] = useTexture([
      "/textures/surfaces/SurfaceImperfections003_1K_var1.jpg",
      "/textures/surfaces/SurfaceImperfections003_1K_Normal.jpg",
    ]);
    return (
      <Reflector
        blur={[800, 100]}
        resolution={512}
        args={[100, 100]}
        mirror={0.5}
        mixBlur={6}
        mixStrength={1.5}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
      >
        {(Material, props) => (
          <Material
            color="#a0a0a0"
            metalness={0.4}
            roughnessMap={floor}
            normalMap={normal}
            normalScale={[2, 2]}
            {...props}
          />
        )}
      </Reflector>
    );
  }
  