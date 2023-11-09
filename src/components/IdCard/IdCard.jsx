import { Text } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import lerp from "lerp";
import { useControls } from "leva";
import { geometry } from "maath";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useRef } from "react";
import { Vector3 } from "three";
extend(geometry);

const currentState = "intro";
//const currentState = "transition-rotation";
// const currentState = "hidden"
const fontMedium = "/fonts/Inter/Inter-Medium.woff"
const fontRegular = "/fonts/Inter/Inter-Regular.woff"


function setOpacity( obj, opacity ) {
  obj.children.forEach((child)=>{
    setOpacity( child, opacity );
  });
  if ( obj.material ) {
    obj.material.opacity = opacity ;
  };
};

export const IdCard = function (props) {

    const setStateRotation = function(){
        setState('transition-rotation')
    }
  const state = props.state || "hidden"
  const ref = useRef();
  const meshRef = useRef();
  //const [state, setState] = useState(props.state || currentState); // intro / transition-rotation/ rotating / visible

// setState(props.state || "hidden");
  const initialPosition = [0, 0, -1];
  const initialRotation = [0, -0.65, 0];


  const visible = state == "hidden" ? false : true;
  
  const rotated = {
    x: -1.5,
  };
  const scaled = {
    x: 0.5,
    y: 0.5,
    z: 0.5,
  };

  const positionToCamera = function (t, ref, initial =false) {
    const lookAt = t.camera.target
    if(lookAt.x !== 0 || initial){

        var vec = new Vector3(lookAt.x-1, lookAt.y+2.5, lookAt.z +2);
        ref.current.position.copy(vec);
        
    }
  };

  const t = useThree();
  useEffect(() => {
    ref.current.alpha = 0
    positionToCamera(t, ref,true);

  }, []);

  if(state === "transition-rotation" || state === "rotation"){
    setOpacity(ref.current,1)
  }
  useFrame((_state) => {
    positionToCamera(_state,ref)
    if(state === "intro" && ref.current){
        ref.current.alpha = lerp(ref.current.alpha, 1, 0.1);
        setOpacity(ref.current,ref.current.alpha)
    }else 
    if (state == "transition-rotation" && meshRef.current) {
      meshRef.current.rotation.x = lerp(
        meshRef.current.rotation.x,
        rotated.x,
        0.1
      );
    meshRef.current.scale.x = lerp(meshRef.current.scale.x, scaled.x, 0.1);
       meshRef.current.scale.y = lerp(meshRef.current.scale.y, scaled.y, 0.1);
       meshRef.current.scale.z = lerp(meshRef.current.scale.z, scaled.z, 0.1);
    //   meshRef.current.rotation.z += 0.15;
    //   if (Math.abs(meshRef.current.rotation.x - rotated.x) < 0.01) {
    //     //setState("rotation");
    //   }
    }
    if (state == "rotation") {
      meshRef.current.rotation.z += 0.5;
    }
  });
  return (
    <group
      ref={ref}
      visible={visible}
      position={initialPosition}
      rotation={initialRotation}
      transparent
    >
        <group ref={meshRef}>

        <Text font={fontMedium} color="black" fontSize={0.25} letterSpacing={-0.025} anchorY="top" anchorX="left" lineHeight={0.8} position={[-1.2, 0.715, 0.01]}>
       ID
      </Text>
      <Text font={fontRegular} color="black" fontSize={0.3} anchorX="right" position={[1.2, -0.6, 0.01]}>
        /01
      </Text>
      <Text font={fontRegular} color="black" fontSize={0.1} anchorX="right" anchorY="bottom" position={[-0.5, -0.75, 0.01]}>
        Nome ou o crl
      </Text>
      <mesh  scale={[3,3,3]} >
        <roundedPlaneGeometry args={[0.85, 0.54, 0.025]} />
        <meshBasicMaterial color={"ref"} attach="material" transparent/>
      </mesh>
        </group>
    </group>
  );
};

