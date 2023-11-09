import "./App.css";

import * as THREE from "three";
import React, { Suspense, useEffect, useState } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";

import { ExperienceDebugger } from "./utils/degugger";

import { CallToSubscribeFilmScript } from "./film-scripts/use-cases/CallToSubscribe";

import { geometry } from "maath";
import { Controls } from "./components/Controls/Controls";
import { Carla } from "./components/Carla/Carla";
import { Footer } from "./components/Footer/Footer";

import { DocIntel } from "./components/DocIntel/DocIntel";
import { Chatbot } from "./components/Chatbot/Chatbot";
import { Ground } from "./components/Ground/Ground";
import {
  Actions,
  toggleChatbotAnnotation,
  toggleDocIntelAnnotation,
} from "./components/Actions";
import { Splash } from "./components/Splash/Splash";
import { Panels } from "./components/Panels/Panels";
import { useRef } from "react";
import { PanelLine } from "./components/Panels/PanelLine";
import { IdCard } from "./components/IdCard/IdCard";

extend(geometry);

let baseStory = 0;
let storyConfig = CallToSubscribeFilmScript.stories[baseStory];

function App() {
  const panelRef = useRef();
  const [panelSide,setPanelSide] = useState('right')
  const [idCardState,setIdCardState] = useState('hidden')

  const [transitioning, setTransitioning] = useState(false);
  const [story, setStory] = useState(baseStory);
  const [carlaIntro, setCarlaIntro] = useState(false);
  const [docIntelAnnotationShowing, setDocIntelAnnotationShowing] =
    useState(false);
  const [chatbotAnnotationShowing, setChatbotAnnotationShowing] =
    useState(false);

  const onTogglePanel = function () {
    panelRef.current.togglePanel();
  };

  const onToggleChatbotAnnotation = function () {
    toggleChatbotAnnotation(
      chatbotAnnotationShowing,
      setChatbotAnnotationShowing
    );
  };
  const onToggleDocIntelAnnotation = function () {
    toggleDocIntelAnnotation(
      docIntelAnnotationShowing,
      setDocIntelAnnotationShowing
    );
  };
  const onToggleCarlaIntro = function () {
    setCarlaIntro(!carlaIntro);
  };

  const onToggleIdCard = function () {
    if(idCardState == "hidden"){
      setIdCardState('intro')
    }else if(idCardState == "intro"){
      setIdCardState('transition-rotation')
    }else if(idCardState == "transition-rotation"){
      setIdCardState('rotation')
    }else if(idCardState == "rotation"){
      setIdCardState('hidden')
    }
    // setCarlaIntro(!carlaIntro);
  };

  const onNavigateToChatbot = function () {
    navigateToScene(0);
    setCarlaIntro(false);
  };
  const onNavigateToDocIntel = function () {
    navigateToScene(1);
  };
  const closeAnnotations = function () {
    toggleChatbotAnnotation(true, setChatbotAnnotationShowing);
    toggleDocIntelAnnotation(true, setDocIntelAnnotationShowing);
    setCarlaIntro(false);
  };
  const navigateToScene = function (index) {
    if (transitioning) return;
    if (story == index) return;
    closeAnnotations();
    setStory(index);
    setTransitioning(true);

    storyConfig = CallToSubscribeFilmScript.stories[index];
  };
  const onCompleteTransition = function () {
    setTransitioning(false);

    if (story == 0) {
      setCarlaIntro(true);
      toggleChatbotAnnotation(false, setChatbotAnnotationShowing);
    } else if (story == 1) {
      setCarlaIntro(false);
      toggleDocIntelAnnotation(false, setDocIntelAnnotationShowing);
    }
  };

  return (
    <>
      <div id="app-container">
        <Splash />
        <Panels ref={panelRef} side={panelSide}>
          
            <h1>
              <PanelLine>
              Panel title
              </PanelLine>
            </h1>
            <p>
              <PanelLine>
              Lorem ipsum dolor sit amet, consectetur adip
              </PanelLine>
            </p>
          
        </Panels>
        <header id="app-header"></header>
        <main id="app-body">
          <Actions
          onToggleIdCard={onToggleIdCard}
            onToggleChatbotAnnotation={onToggleChatbotAnnotation}
            onTogglePanel={onTogglePanel}
            onToggleDocIntelAnnotation={onToggleDocIntelAnnotation}
            onToggleCarlaIntro={onToggleCarlaIntro}
            onNavigateToDocIntel={onNavigateToDocIntel}
            onNavigateToChatbot={onNavigateToChatbot}
          />

          <Canvas
            mode={"concurrent"}
            gl={{ alpha: false }}
            pixelratio={[1, 1.5]}
            camera={{
              position: Object.values(storyConfig.camera.position),
              fov: storyConfig.camera.fov,
            }}
          >
     

            <Controls
              transitioning={transitioning}
              story={story}
              onCompleteTransition={onCompleteTransition}
            />
            <color attach="background" args={["black"]} />
            <fog attach="fog" args={["black", 20, 40]} />~

            <Suspense fallback={null}>
              <group position={[0, -2, 0]}>
                <IdCard state={idCardState}/>
                <Carla
                  rotation={[0, Math.PI - 1, 0]}
                  position={[-3, 0, 1]}
                  scale={[0.26, 0.26, 0.26]}
                  showAnnotation={carlaIntro}
                />

                <Chatbot annotationShowing={chatbotAnnotationShowing} />

                <DocIntel annotationShowing={docIntelAnnotationShowing} />

                <Ground />
              </group>

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

      </div>
    </>
  );
}

export default App;
