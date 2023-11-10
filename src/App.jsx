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
import { Meanwhile } from "./components/Meanwhile/Meanwhile";
import { Automations } from "./components/Automations/Automations";
import { wait } from "./utils/wait";
import { Streams } from "./components/Streams/Streams";
import { StreamsPunchline } from "./components/StreamsPunchline/StreamsPunchline";

extend(geometry);

let baseStory = 0;
let storyConfig = CallToSubscribeFilmScript.stories[baseStory];

// Transitions
// let onCarlaTransitionResolve;
// let onCarlaTransitionPromise = new Promise((resolve) => {
//   onCarlaTransitionResolve = resolve;
// });
// let onCarlaTransitionEnd = function () {
//   onCarlaTransitionResolve();
// };
// let onChatbotTransitionResolve;
// let onChatbotTransitionPromise = new Promise((resolve) => {
//   onChatbotTransitionResolve = resolve;
// });
// let onChatbotTransitionEnd = function () {
//   onChatbotTransitionResolve();
// };

function App() {
  // REFS
  const panelRef = useRef();

  // STATES
  const [panelSide, setPanelSide] = useState("left");
  const [idCardState, setIdCardState] = useState("hidden");
  const [transitioning, setTransitioning] = useState(false);
  const [sceneTransitioning, setSceneTransitioning] = useState(false);
  const [story, setStory] = useState(baseStory);

  const [carlaIntro, setCarlaIntro] = useState(false);
  const [carlaEmail, setCarlaEmail] = useState(false);
  const [carlaHeart, setCarlaHeart] = useState(false);

  const [streamsActive, setStreamsActive] = useState(false);
  const [streamsTransitioning, setStreamsTransitioning] = useState(false);

  const [chatbotAnnotationShowing, setChatbotAnnotationShowing] =
    useState(false);
  const [docIntelAnnotationShowing, setDocIntelAnnotationShowing] =
    useState(false);
  const [automationsAnnotationShowing, setAutomationsAnnotationShowing] =
    useState(false);
  const [streamsAnnotationShowing, setStreamAnnotationShowing] =
    useState(false);
  const [streamsParticlesShowing, setStreamParticlesShowing] =
    useState(false);

  // PANEL MANAGEMENT
  const onTogglePanel = function () {
    panelRef.current.togglePanel();
  };

  // ANNOTATION MANAGEMENT
  const closeAnnotations = function () {
    toggleChatbotAnnotation(true, setChatbotAnnotationShowing);
    toggleDocIntelAnnotation(true, setDocIntelAnnotationShowing);
    setCarlaIntro(false);
  };

  const onToggleChatbotAnnotation = function (action = 0) {
    let annotationState = chatbotAnnotationShowing;
    if (action == -1) {
      annotationState = true;
    }
    if (action == 1) {
      annotationState = false;
    }
    toggleChatbotAnnotation(annotationState, setChatbotAnnotationShowing);
  };
  const onToggleDocIntelAnnotation = function (action = 0) {
    let annotationState = docIntelAnnotationShowing;
    if (action == -1) {
      annotationState = true;
    }
    if (action == 1) {
      annotationState = false;
    }
    toggleDocIntelAnnotation(annotationState, setDocIntelAnnotationShowing);
  };

  const onCloseCarlaAnnotations = async function () {
    let timeout = 0;
    for (let annotation of [
      [carlaIntro, setCarlaIntro],
      [carlaEmail, setCarlaEmail],
      [carlaHeart, setCarlaHeart],
    ]) {
      if (annotation[0]) {
        timeout = 100;
        annotation[1](false);
      }
    }
    return await wait(timeout);
  };
  const onToggleCarlaIntro = async function () {
    let action = !carlaIntro;

    await onCloseCarlaAnnotations();

    setCarlaIntro(action);
  };
  const onToggleCarlaEmail = async function () {
    let action = !carlaEmail;

    await onCloseCarlaAnnotations();
    setCarlaEmail(action);
  };
  const onToggleCarlaHeart = async function () {
    let action = !carlaHeart;

    await onCloseCarlaAnnotations();
    setCarlaHeart(action);
  };

  const onToggleIdCard = function () {
    if (idCardState == "hidden") {
      setIdCardState("intro");
    } else if (idCardState == "intro") {
      setIdCardState("transition-rotation");
    } else if (idCardState == "transition-rotation") {
      setIdCardState("rotating");
    } else if (idCardState == "rotating") {
      setIdCardState("ending");
    } else if (idCardState == "ending") {
      setIdCardState("hidden");
    }
    // setCarlaIntro(!carlaIntro);
  };

  // TRANSITIONS

  // NAVIGATION
  const onNavigateToChatbot = function () {
    navigateToScene(0);
    setCarlaIntro(false);
  };
  const onNavigateToDocIntel = function () {
    navigateToScene(1);
  };
  const onNavigateToMeanWhile = function () {
    navigateToScene(2);
  };
  const onNavigateToAutomations = function () {
    navigateToScene(3);
    wait(1000, () => {
      setAutomationsAnnotationShowing(true);
    });
  };
  const onNavigateToCarla = function () {
    setAutomationsAnnotationShowing(false);
    navigateToScene(4);
  };
  const onNavigateToStreamsPunchline = function () {
    navigateToScene(5);
  };
  const onNavigateToStreams = function () {
    if (transitioning) return;
    if (story == 6) return;
    // treamsActive(true)
    setStreamsTransitioning(true);
    navigateToScene(6);
    // wait(2000 ,()=>{
    //   setStreamParticlesShowing(true)
    // })
  };

  const navigateToScene = function (index) {
    if (transitioning) return;
    if (story == index) return;

    closeAnnotations();
    setStory(index);
    setTransitioning(true);

    storyConfig = CallToSubscribeFilmScript.stories[index];
  };

  const onStartSceneTransitioning = function (callback) {
    if (sceneTransitioning) return;
    setSceneTransitioning(true);
    callback()
      .then(() => {
        setSceneTransitioning(false);
      })
      .catch(() => {
        setSceneTransitioning(false);
      });
  };

  const onCompleteTransition = function () {
    console.log("onCompleteTransition", transitioning);

    setTransitioning(false);
    // debugger;
  };

  // STORYLINE
  const onCarlaArrive = function () {
    // setCarlaIntro(true);
    console.log("@todo");
  };

  const [currentSceneTransitioning, setCurrentSceneTransitioning] =
    useState(false);
  const [carlaTransitioning, setCarlaTransitioning] = useState(false);
  useEffect(() => {
    //console.log('Listening: ', {carlaTransitioning,currentSceneTransitioning});
    onCarlaStateIntentionEnd()
    onIntroduceCognusChatbotEnd()
  }, [carlaTransitioning, currentSceneTransitioning]);

  const onCarlaTransitionEnd = function () {
    setCarlaTransitioning(false);
  };

  const onNavigateSceneEnd = function(){
    if(!currentSceneTransitioning) return;
    setCurrentSceneTransitioning(false);
    console.log('on end')
  }
  const onNavigateScene = function (callback) {
    if (currentSceneTransitioning) return;
    callback();
  };

  // Carla state intention
  const onCarlaStateIntention = function () {
    onNavigateScene(() => {
      setCarlaTransitioning(true);
      setCarlaIntro(true);
      setCurrentSceneTransitioning("onCarlaStateIntention");
    });
  };
  const onCarlaStateIntentionEnd = function () {
    if (currentSceneTransitioning == "onCarlaStateIntention") {
      if (!carlaTransitioning) {
        onNavigateSceneEnd()
      }
    }
  };
  const onIntroduceCognusChatbot = function () {
  
    onNavigateScene(() => {
      setCarlaTransitioning(true);
      setCarlaIntro(false);
      setChatbotAnnotationShowing(true);
      setCurrentSceneTransitioning("onIntroduceCognusChatbot");
    });
  };
  const onIntroduceCognusChatbotEnd = function () {
    if (currentSceneTransitioning == "onIntroduceCognusChatbot") {
      if (!carlaTransitioning) {
        onNavigateSceneEnd()
      }
    }
  };
  const onAskId = function () {
    // setCarlaIntro(false)
    setChatbotAnnotationShowing(false);
    console.log("@todo");
  };
  const onShowId = async function () {
    // setCarlaIntro(false)
    setChatbotAnnotationShowing(false);
    setIdCardState("intro");
    await wait(500);
    setIdCardState("transition-rotation");
    await wait(500);
    setIdCardState("rotating");
  };
  const onThrowId = async function () {
    // setCarlaIntro(false)
    onNavigateToDocIntel();
    await wait(2000);

    setIdCardState("ending");

    await wait(1000);

    setIdCardState("hidden");
  };

  const onPresentDocIntel = function () {
    onToggleDocIntelAnnotation(1);
  };
  const onProcessDocument = function () {
    // setDocIntelAnnotationShowing(false);
    onToggleDocIntelAnnotation(-1);
  };

  const onCarlaRecieveEmail = function () {
    setCarlaEmail(true);
    wait(250,()=>{
      onCarlaShowLove()
    })
  };
  const onCarlaShowLove = async function () {
    //setCarlaEmail(false);
    //await wait(1000);
    setCarlaHeart(true);
  };
  const onPresentStreams = async function () {
    setStreamsActive(true);
    setStreamAnnotationShowing(true);
    // setCarlaHeart(false);
    setStreamParticlesShowing(true)
  };

  const onNavigateToEnd = function () {
    console.log("@todo");
  };
  const onPresentProjectInfo = function () {
    console.log("@todo");
  };

  useEffect(() => {}, []);
  const onSplashClose = function () {
    panelRef.current.openPanel();
  };
  return (
    <>
      <div id="app-container">
        {/* <Splash onSplashClose={onSplashClose}/>  */}
        <Panels ref={panelRef} side={panelSide}>
          <div className="text-left">
            <h1 className="bold">
              <PanelLine>Use case #1</PanelLine>
            </h1>
            <br />
            <div>
              <PanelLine>
                Carla calls to subscribe to one of your services.
              </PanelLine>
            </div>
            <br />
            <div>
              <PanelLine>
                In order for her to be able to subscribe we will need:
              </PanelLine>
            </div>
            <br />
            <div>
              <small>
                <PanelLine>
                  * Understand what is the intent of the call
                </PanelLine>
              </small>
            </div>
            <div>
              <small>
                <PanelLine>* Extract the required information</PanelLine>
              </small>
            </div>
            <div>
              <small>
                <PanelLine>* Process her ID card</PanelLine>
              </small>
            </div>
            <div>
              <small>
                <PanelLine>
                  * Enter all the extracted information on the computer
                </PanelLine>
              </small>
            </div>
            <div>
              <small>
                <PanelLine>* Send a confirmation email to Carla.</PanelLine>
              </small>
            </div>
          </div>
        </Panels>
        <header id="app-header"></header>
        <main id="app-body">
          <Actions
            onCarlaArrive={onCarlaArrive}
            onCarlaStateIntention={onCarlaStateIntention}
            onIntroduceCognusChatbot={onIntroduceCognusChatbot}
            onAskId={onAskId}
            onShowId={onShowId}
            onThrowId={onThrowId}
            onPresentDocIntel={onPresentDocIntel}
            onProcessDocument={onProcessDocument}
            onCarlaRecieveEmail={onCarlaRecieveEmail}
            onCarlaShowLove={onCarlaShowLove}
            onPresentStreams={onPresentStreams}
            onNavigateToEnd={onNavigateToEnd}
            onPresentProjectInfo={onPresentProjectInfo}
            onToggleIdCard={onToggleIdCard}
            onToggleChatbotAnnotation={onToggleChatbotAnnotation}
            onTogglePanel={onTogglePanel}
            onToggleDocIntelAnnotation={onToggleDocIntelAnnotation}
            onToggleCarlaIntro={onToggleCarlaIntro}
            onToggleCarlaEmail={onToggleCarlaEmail}
            onToggleCarlaHeart={onToggleCarlaHeart}
            onNavigateToDocIntel={onNavigateToDocIntel}
            onNavigateToChatbot={onNavigateToChatbot}
            onNavigateToMeanWhile={onNavigateToMeanWhile}
            onNavigateToAutomations={onNavigateToAutomations}
            onNavigateToCarla={onNavigateToCarla}
            onNavigateToStreamsPunchline={onNavigateToStreamsPunchline}
            onNavigateToStreams={onNavigateToStreams}
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
            <fog attach="fog" args={["black", 20, 40]} /> 
            <Suspense fallback={null}>
              <group position={[0, -2, 0]}>
                <IdCard state={idCardState} />
                <Carla
                  onTransitionEnd={onCarlaTransitionEnd}
                  rotation={[0, Math.PI - 1, 0]}
                  position={[-3, 0, 1]}
                  scale={[0.26, 0.26, 0.26]}
                  showAnnotation={carlaIntro}
                  showEmailAnnotation={carlaEmail}
                  showLoveAnnotation={carlaHeart}
                />

                <Chatbot annotationShowing={chatbotAnnotationShowing} />

                <DocIntel annotationShowing={docIntelAnnotationShowing} />

                <Meanwhile />

                <Automations annotationShowing={automationsAnnotationShowing} />

                <StreamsPunchline />
                <Streams
                  transitioning={streamsTransitioning}
                  active={streamsActive}
                  annotationShowing={streamsAnnotationShowing}
                  particlesShowing={streamsParticlesShowing}
                />

                <Ground />
              </group>

              <ambientLight intensity={0.5} />
              <spotLight position={[0, 10, 0]} intensity={40} />
              <directionalLight position={[-50, 0, 40]} intensity={2} />
               <ExperienceDebugger
                config={{
                  camera: {
                    position: storyConfig.camera.position,
                    fov: storyConfig.camera.fov,
                  },
                }}
              /> 
            </Suspense>
          </Canvas>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
