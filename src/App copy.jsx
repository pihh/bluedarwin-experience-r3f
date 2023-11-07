import "./App.css";
import {
  globalState,
  useGlobalState,
  globalStateScene,
} from "./services/state/state.service";

import * as THREE from "three";
import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Reflector, Text, useTexture, useGLTF } from "@react-three/drei";
import { ExperienceDebugger } from "./utils/degugger";
import { useRef } from "react";

function App() {
  const cameraRef = useRef();
  const fogRef = useRef();
  return (
    <>
      <div id="app-container">
        <header id="app-header"></header>
        <main id="app-body">
          <Canvas
            mode={"concurrent"}
            gl={{ alpha: false }}
            pixelratio={[1, 1.5]}
            camera={{ position: [4, 3, 16], fov: 20  }} 
          >
            {/* <perspectiveCamera ref={cameraRef} />
            <perspectiveCamera ref={cameraRef} /> */}
            <color attach="background" args={["black"]} />
            <fog attach="fog"   ref={fogRef}/>
            <Suspense fallback={null}>
              <group position={[0, -2, 0]}>
                <Carla
                  rotation={[0, Math.PI - 0.4, 0]}
                  position={[-1.2, 0, 0.6]}
                  scale={[0.26, 0.26, 0.26]}
                />

                <VideoChatbot position={[0, 1.8, -2]} rotation={[0,0,0]} />
                <VideoChatbot position={[0, 1.8, -8]} rotation={[0,0,0]} />
                
                <Ground />
              </group>

              <Intro />

              {/* LIGHTS */}
              <ExperienceDebugger
                config={{
                  fog: {
                    ref:fogRef,
                    color:"black",
                    far: 20,
                    near: 15,
                    // color:"black", w:15, h:25
                  },
                  spotLight: {
                    hideControls:true,
                    position: { x: 0, y: 5, z: 0 },
                    intensity: 40,
                  },
                  directionalLight: {
                    position: { x: -50, y: 0, z: -40 },
                    intensity: 2,
                  },
                  ambientLight: {
                    intensity: 1,
                  },
                }}
              />
            </Suspense>
          </Canvas>
        </main>

        <footer id="app-footer"></footer>
      </div>
    </>
  );
}

function Carla(props) {
  const { scene } = useGLTF("/models/carla-draco.glb");
  return <primitive object={scene} {...props} />;
}

function VideoText(props) {
  const [video] = useState(() =>
    Object.assign(document.createElement("video"), {
      src: "/textures/videos/drei.mp4",
      crossOrigin: "Anonymous",
      loop: true,
      muted: true,
    })
  );
  useEffect(() => void video.play(), [video]);
  return (
    <Text
      font="/fonts/Inter/Inter-Bold.woff"
      fontSize={3}
      letterSpacing={-0.06}
      {...props}
    >
      drei
      <meshBasicMaterial toneMapped={false}>
        <videoTexture
          attach="map"
          args={[video]}
          encoding={THREE.sRGBEncoding}
        />
      </meshBasicMaterial>
    </Text>
  );
}
function VideoChatbot(props) {
  const [video] = useState(() =>
    Object.assign(document.createElement("video"), {
      src: "/textures/videos/drei.mp4",
      crossOrigin: "Anonymous",
      loop: true,
      muted: true,
    })
  );
  useEffect(() => void video.play(), [video]);
  return (
    <group {...props}>
      <mesh >
        <planeGeometry args={[5.4,3,32,32]} />
        <meshBasicMaterial color={"red"}  attach="material"/>
      </mesh>
    </group>
  );
}

function Ground() {
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

function Intro() {
  const [vec] = useState(() => new THREE.Vector3());
  return useFrame((state) => {
    // state.camera.position.lerp(vec.set(state.mouse.x * 5, 3 + state.mouse.y * 2, 14), 0.05)
    // console.log(state.camera.position)
    // state.camera.lookAt(0, 0, 0)
  });
}

export default App;
