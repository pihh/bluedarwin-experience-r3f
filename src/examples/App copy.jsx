import { useState } from "react";

import "./App.css";
import { globalState, useGlobalState ,globalStateScene} from "../services/state/state.service";
import { HomePage, HomePageExperience } from "../pages/Home/Home";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { useEffect } from "react";
import { ScrollArea } from "../components/ScrollArea/ScrollArea";

function App() {
  const [state, setState] = useGlobalState(globalState);
  const [scene, setScene] = useGlobalState(globalStateScene);
  const navigate = function (nextScene = "home") {
    if (scene !== nextScene) {
      // const stateLifecycle = JSON.parse(JSON.stringify(state.lifecycle));
      // state.lifecycle.currentScene = scene;
      // state.lifecycle.currentState = "transitioning";

      setScene(nextScene);
    }
  };
  const navigateHome = () => {
    navigate("home");
  };
  const navigateTeam = () => {
    navigate("team");
  };

  return (
    <>
      <div id="app-container">
        <header id="app-header">
          <button onClick={navigateHome}>Home</button>
          <button onClick={navigateTeam}>Team</button>
        </header>
        <main id="app-body">
          <Canvas className="canvas">
            <orthographicCamera
              pixelratio={1}
              mode="concurrent"
              position={[0, 0, 500]}
            />
            {scene == "home" ? (
              <HomePageExperience />
            ) : (
              <></>
            )}
          </Canvas>

          <ScrollArea>
            {scene == "home" ? (
              <HomePage />
            ) : (
              <>
                <h1>Team page</h1>
             
              </>
            )}
          </ScrollArea>
        </main>
        <h1>{scene}</h1>
        <footer id="app-footer">
          <button onClick={navigateHome}>Home</button>
          <button onClick={navigateTeam}>Team</button>
        </footer>
      </div>
    </>
  );
}

export default App;
