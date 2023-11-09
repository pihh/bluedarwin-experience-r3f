import { useFrame, useThree } from "@react-three/fiber";
import { useState } from "react";
import { useRef } from "react";
import { CallToSubscribeFilmScript } from "../../film-scripts/use-cases/CallToSubscribe";
import { Vector3 } from "three";
import { useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import lerp from "lerp";


const _lerp = (a,b,c) => {
  const l = lerp(
    a,
    b,
    c
  );
  return Math.abs(a-l) > 5 ? a : l
}
export const Controls = function(props) {
  const enabled = !props.transitioning ;
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
    const [_lookAt,_setLookAt] =  useState(Object.values(CallToSubscribeFilmScript.stories[props.story].camera.target))
  
    useEffect(() => {
    const storyConfig = CallToSubscribeFilmScript.stories[props.story]
      camera.position.set(...Object.values(storyConfig.camera.position));
      cameraRef.current = camera;
      console.log('use effect')
      
    }, [camera]);
  

    var lookAt = new Vector3(camera?.target?.x ||0,camera?.target?.y || 0,camera?.target?.z || -1);
    if (props.transitioning) {
      
      lookAt = new Vector3(lookAtX, lookAtY, lookAtZ);
      // lookAt = new Vector3(lookAtX, lookAtY, lookAtZ);
      // console.log(lookAt,camera.target);
      // debugger;
    }
    camera.target = lookAt;
 
    useFrame(() => {
      if (props.transitioning) {
        const currPos = cameraRef.current.position;
        cameraRef.current.position.x = _lerp(
          currPos.x,
          CallToSubscribeFilmScript.stories[props.story].camera.position.x,
          0.1
        );
        cameraRef.current.position.y = _lerp(
          currPos.y,
          CallToSubscribeFilmScript.stories[props.story].camera.position.y,
          0.1
        );
        cameraRef.current.position.z = _lerp(
          currPos.z,
          CallToSubscribeFilmScript.stories[props.story].camera.position.z,
          0.1
        );
  
        lookAt.x = _lerp(
          lookAt.x,
          CallToSubscribeFilmScript.stories[props.story].camera.target.x,
          0.1
        );
        lookAt.y = _lerp(
          lookAt.y,
          CallToSubscribeFilmScript.stories[props.story].camera.target.y,
          0.1
        );
        lookAt.z = _lerp(
          lookAt.z,
          CallToSubscribeFilmScript.stories[props.story].camera.target.z,
          0.1
        );
  
        cameraRef.current.lookAt(lookAt.x, lookAt.y, lookAt.z);
        camera.target = lookAt
        let hasCompletedTransitioning = true;
        const currentLookAt = Object.values(lookAt);
        const currentPos = Object.values(cameraRef.current.position)
        const targetPos = Object.values(CallToSubscribeFilmScript.stories[props.story].camera.position)
        const targetLookAt = Object.values(
          CallToSubscribeFilmScript.stories[props.story].camera.target
        );

        // console.log({lx:lookAt.x, tlx: CallToSubscribeFilmScript.stories[props.story].camera.target.x})
        for (let i = 0; i < 3; i++) {
          if (Math.abs(currentLookAt[i] - targetLookAt[i]) > 0.01) {
            hasCompletedTransitioning = false;
          }
        }
        for (let i = 0; i < 3; i++) {
          if (Math.abs(targetPos[i] - currentPos[i]) > 0.01) {
            hasCompletedTransitioning = false;
          }
        }
        if (hasCompletedTransitioning && props.transitioning) {
     
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
        //  camera.target = new Vector3(Object.values(CallToSubscribeFilmScript.stories[props.story].camera.target))
        //  cameraRef.target = new Vector3(Object.values(CallToSubscribeFilmScript.stories[props.story].camera.target))
         console.log('onComplete',props.story,camera.target)
        }
      }
    });
    return (
      <>
        <OrbitControls
          enabled={false}
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
  