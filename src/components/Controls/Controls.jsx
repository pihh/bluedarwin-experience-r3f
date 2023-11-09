import { useFrame, useThree } from "@react-three/fiber";
import { useState } from "react";
import { useRef } from "react";
import { CallToSubscribeFilmScript } from "../../film-scripts/use-cases/CallToSubscribe";
import { Vector3 } from "three";
import { useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import lerp from "lerp";


export const Controls = function(props) {
    const { camera } = useThree();
    const cameraRef = useRef();
    const [lookAtX, setLookAtX] = useState(
      CallToSubscribeFilmScript.stories[props.story].camera.target.x
    );
    const [lookAtY, setLookAtY] = useState(
      CallToSubscribeFilmScript.stories[props.story].camera.target.y
    );
    const [lookAtZ, setLookAtZ] = useState(
      CallToSubscribeFilmScript.stories[props.story].camera.target.z
    );
  
    useEffect(() => {
    const storyConfig = CallToSubscribeFilmScript.stories[props.story]
      camera.position.set(...Object.values(storyConfig.camera.position));
      cameraRef.current = camera;
    }, [camera]);
  
    var lookAt = new Vector3(0, 0, -1);
    if (props.transitioning) {
      lookAt = new Vector3(lookAtX, lookAtY, lookAtZ);
    }
    camera.target = lookAt;
    useFrame(() => {
      if (props.transitioning) {
        const currPos = cameraRef.current.position;
        cameraRef.current.position.x = lerp(
          currPos.x,
          CallToSubscribeFilmScript.stories[props.story].camera.position.x,
          0.1
        );
        cameraRef.current.position.y = lerp(
          currPos.y,
          CallToSubscribeFilmScript.stories[props.story].camera.position.y,
          0.1
        );
        cameraRef.current.position.z = lerp(
          currPos.z,
          CallToSubscribeFilmScript.stories[props.story].camera.position.z,
          0.1
        );
  
        lookAt.x = lerp(
          lookAt.x,
          CallToSubscribeFilmScript.stories[props.story].camera.target.x,
          0.1
        );
        lookAt.y = lerp(
          lookAt.y,
          CallToSubscribeFilmScript.stories[props.story].camera.target.y,
          0.1
        );
        lookAt.z = lerp(
          lookAt.z,
          CallToSubscribeFilmScript.stories[props.story].camera.target.z,
          0.1
        );
  
        cameraRef.current.lookAt(lookAt.x, lookAt.y, lookAt.z);
        camera.target = lookAt
        let hasCompletedTransitioning = true;
        const currentLookAt = Object.values(lookAt);
      
        const targetLookAt = Object.values(
          CallToSubscribeFilmScript.stories[props.story].camera.target
        );
        for (let i = 0; i < 3; i++) {
          if (Math.abs(currentLookAt[i] - targetLookAt[i]) > 0.01) {
            hasCompletedTransitioning = false;
          }
        }
        if (hasCompletedTransitioning) {
     
          // camera.position.copy(cameraRef.current.position)
          // camera.lookAt(lookAt.x, lookAt.y, lookAt.z)
          setLookAtX(
            CallToSubscribeFilmScript.stories[props.story].camera.target.x
          );
          setLookAtY(
            CallToSubscribeFilmScript.stories[props.story].camera.target.y
          );
          setLookAtZ(
            CallToSubscribeFilmScript.stories[props.story].camera.target.z
          );
        //   console.log({ camera, cameraRef });
         camera.target = CallToSubscribeFilmScript.stories[props.story].camera.target
        //cameraRef.current.lookAt(lookAt.x, lookAt.y, lookAt.z);
          props.onCompleteTransition();
        }
      }
    });
    return (
      <>
        <OrbitControls
          enabled={!props.transitioning}
          ref={cameraRef}
          target={[lookAtX, lookAtY, lookAtZ]}
          camera={camera}
          onChange={() => {
            // console.log("onChange");
            // console.log(cameraRef.current.position);
          }}
        />
      </>
    );
  }
  