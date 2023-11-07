import "./App.css";

import * as THREE from "three";
import React, { Suspense, useEffect, useState } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";

import {
  Reflector,
  Text,
  useTexture,
  useGLTF,
  Html,
  OrbitControls,
} from "@react-three/drei";
import { ExperienceDebugger } from "./utils/degugger";
import { useRef } from "react";
import { CallToSubscribeFilmScript } from "./film-scripts/use-cases/CallToSubscribe";
import lerp from "lerp";

import { geometry } from "maath";
import { VideoFrame } from "./components/VideoFrame/VideoFrame";
import { Controls } from "./components/Controls/Controls";
import { Carla } from "./components/Carla/Carla";
import { Footer } from "./components/Footer/Footer";
import gsap from "gsap";

extend(geometry);

let storyConfig = CallToSubscribeFilmScript.stories[0];

function CheckIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="svg-icon--check-squared"
    >
      <path
        d="M10.2426 16.3137L6 12.071L7.41421 10.6568L10.2426 13.4853L15.8995 7.8284L17.3137 9.24262L10.2426 16.3137Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 5C1 2.79086 2.79086 1 5 1H19C21.2091 1 23 2.79086 23 5V19C23 21.2091 21.2091 23 19 23H5C2.79086 23 1 21.2091 1 19V5ZM5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z"
        fill="currentColor"
      />
    </svg>
  );
}
function App() {
  const [transitioning, setTransitioning] = useState(false);
  const [story, setStory] = useState(0);
  const [carlaIntro, setCarlaIntro] = useState(false);
  const [docIntelAnnotationShowing, setDocIntelAnnotationShowing] =
    useState(false);
  const [chatbotAnnotationShowing, setChatbotAnnotationShowing] =
    useState(false);

  const toggleChatbotAnnotation = function () {
    setChatbotAnnotationShowing(!chatbotAnnotationShowing);
    
    if (!chatbotAnnotationShowing) {
      try {
        const tlContent = gsap.timeline();

        tlContent.from(
          "#chatbot-annotation .annotation-text-container div",
          1.8,
          {
            y: 100,
            ease: "power4.out",
            delay: 0.5,
            skewY: 7,
            stagger: {
              amount: 0.3,
            },
          }
        );
      } catch (ex) {
        console.warn(ex);
      }
    } else {
    }
  };
  const toggleDocIntelAnnotation = function () {
    setDocIntelAnnotationShowing(!docIntelAnnotationShowing);
    
    if (!docIntelAnnotationShowing) {
      try {
        const tlContent = gsap.timeline();

        tlContent.from(
          "#doc-intel-annotation .annotation-text-container div",
          1.8,
          {
            y: 100,
            ease: "power4.out",
            delay: 0.5,
            skewY: 7,
            stagger: {
              amount: 0.3,
            },
          }
        );
      } catch (ex) {
        console.warn(ex);
      }
    } else {
    }
  };

  const navigateToScene0 = function () {
    navigateToScene(0);
    setCarlaIntro(false);
  };
  const navigateToScene1 = function () {
    navigateToScene(1);
  };
  const navigateToScene = function (index) {
    if (transitioning) return;
    if (story == index) return;
    setStory(index);
    setTransitioning(true);
    storyConfig = CallToSubscribeFilmScript.stories[index];
  };
  const onCompleteTransition = function () {
    setTransitioning(false);
    if (story == 1) {
      setDocIntelAnnotationShowing(true);
    } else {
      setCarlaIntro(true);
    }
  };

  return (
    <>
      <div id="app-container">
        <header id="app-header"></header>
        <main id="app-body">
          {/* <div id="app-controls">
            <button> Carla Arives</button>
            <button> Carla Speach</button>
            <button> Present chatbot</button>
          </div> */}
          <Canvas
            mode={"concurrent"}
            gl={{ alpha: false }}
            pixelratio={[1, 1.5]}
            camera={{
              position: Object.values(storyConfig.camera.position),
              fov: storyConfig.camera.fov,
            }}
          >
            {/* <OrbitControls /> */}

            <Controls
              transitioning={transitioning}
              story={story}
              onCompleteTransition={onCompleteTransition}
            />
            <color attach="background" args={["black"]} />
            <fog attach="fog" args={["black", 20, 40]} />
            <Suspense fallback={null}>
              <group position={[0, -2, 0]}>
                <Carla
                  rotation={[0, Math.PI - 1, 0]}
                  position={[-3, 0, 1]}
                  scale={[0.26, 0.26, 0.26]}
                  showAnnotation={carlaIntro}
                />

                <VideoFrame
                  position={[1, 1.8, -1]}
                  rotation={[0, 0, 0]}
                  annotationAnchorX="right"
                  showAnnotation={chatbotAnnotationShowing}
                  name={"Cognus Chatbot"}
                  idx={"1"}
                  src={"/textures/videos/bg.mp4"}
                >
                  <div id="chatbot-annotation">
                    <p className="annotation-text-container thin">
                      <div className="annotation-text-container--content">
                        Hi there.
                      </div>
                    </p>
                    <p className="annotation-text-container bold">
                      <div className="annotation-text-container--content">
                        My name is Carla and I want to subscribe to your
                        service.
                      </div>
                    </p>
                  </div>
                </VideoFrame>

                <VideoFrame
                  position={[20, 1.8, -6]}
                  rotation={[0, -Math.PI / 2 + 0.4, 0]}
                  annotationPositionAdjustment={[0.3, 0, 0]}
                  showAnnotation={docIntelAnnotationShowing}
                  name={"Doc Intel"}
                  idx={"2"}
                  src={"/textures/videos/streams.mp4"}
                >
                  <div id="doc-intel-annotation">
                    <p className="annotation-text-container thin">
                      <div>Cognus Chatbot.</div>
                    </p>
                    <p className="annotation-text-container bold">
                      <div>
                        Our chatbot is this and that. And <br />
                        In the meanwhile, he already knows that:
                      </div>
                    </p>
                    <p className="annotation-text-container bold">
                    <div>
                      <ul>
                        <li>
                          <CheckIcon />
                          Name
                        </li>
                        <li>
                          <CheckIcon />
                          Intent
                        </li>
                        <li>
                          <CheckIcon />
                          ID
                        </li>
                      </ul>
                      </div>
                    </p>
                  </div>
                </VideoFrame>

                <Ground />
              </group>

              <Intro />
              <ambientLight intensity={0.5} />
              <spotLight position={[0, 10, 0]} intensity={40} />
              <directionalLight position={[-50, 0, 40]} intensity={2} />
              {/* <ExperienceDebugger
                config={{
                  camera: {
                    position: storyConfig.camera.position,
                    fov: storyConfig.camera.fov,
                  },
                }}
              /> */}
            </Suspense>
          </Canvas>
        </main>

        <Footer />
        <footer id="app-footer" style={{opacity:0}}>
          <button onClick={toggleChatbotAnnotation}>
            Show Chatbot Annotation
          </button>
          <button onClick={navigateToScene0}>Scene 0</button>
          <button onClick={navigateToScene1}>Scene 1</button>
        </footer>
      </div>
    </>
  );
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
