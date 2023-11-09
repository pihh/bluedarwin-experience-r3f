import './styles.scss';
import { Html, Text } from "@react-three/drei";
import { useState } from "react";
import { useEffect } from "react";
import * as THREE from "three";
import { VideoFrameAnnotation } from './VideoFrameAnnotation';


export const VideoFrame = function (props) {
  const id = props.idx ? "0"+props.idx : "01"
  const name = props.name || "Cognus Chatbot";
  const src = props.src || "/textures/videos/drei.mp4";
  const annotationAnchorX = props.annotationAnchorX || "left";
  const annotationPositionAdjustment = props.annotationPositionAdjustment || [
    0, 0, 0,
  ];
  const planeArgs = [7.4, 3.2, 0.1];
  const planeBackArgs = [planeArgs[0] + 0.1, planeArgs[1] + 0.1, planeArgs[2]];
  const [video] = useState(() =>
    Object.assign(document.createElement("video"), {
      src: src,
      crossOrigin: "Anonymous",
      loop: true,
      muted: true,
    })
  );
  const visible = props.invisible? false: true
  // const annotationPosition = {
  //   x: annotationAnchorX == "left"? -6.8 + annotationPositionAdjustment[0]:5.8 + annotationPositionAdjustment[0],
  //   y: annotationAnchorX == "left"? 0 + annotationPositionAdjustment[1]: 0 + annotationPositionAdjustment[1],
  //   z: annotationAnchorX == "left"?  0 + annotationPositionAdjustment[2]: 0 + annotationPositionAdjustment[2],
  // }

  useEffect(() => void video.play(), [video]);

  const fontMedium = "/fonts/Inter/Inter-Medium.woff"
  const fontRegular = "/fonts/Inter/Inter-Regular.woff"
  return (
    <group {...props} visible={visible}>

     <Text font={fontMedium} color="white" fontSize={0.25} letterSpacing={-0.025} anchorY="top" anchorX="left" lineHeight={0.8} position={[-0.375, 0.715, 0.01]}>
        {/* {name} */}
      </Text>
      <Text font={fontRegular} color="white" fontSize={0.3} anchorX="right" position={[3.6, -1.4, 0.01]}>
        /{id}
      </Text>
      <Text font={fontRegular} color="white" fontSize={0.15} anchorX="right" anchorY="bottom" position={[3.1, -1.55, 0.01]}>
        {name}
      </Text>
      <mesh>
        <roundedPlaneGeometry args={planeArgs} />
        <meshBasicMaterial toneMapped={false}>
          <videoTexture
            attach="map"
            args={[video]}
    
          />
        </meshBasicMaterial>
      </mesh>
      <mesh position={[0, 0, -0.01]}>
        <roundedPlaneGeometry args={planeBackArgs} />
        <meshBasicMaterial color={"black"} attach="material" />
      </mesh>

      <VideoFrameAnnotation
        showAnnotation={props.showAnnotation}
        annotationAnchorX={annotationAnchorX}
        annotationPositionAdjustment={annotationPositionAdjustment}
      >
        {props.children}
      </VideoFrameAnnotation>

      {/* <Html
        transform
        geometry={<planeGeometry args={[5.4, 3, 32, 32]} />}
        position={[
          annotationPosition.x,
          annotationPosition.y,
          annotationPosition.z,
        ]}
        rotation={[0, annotationAnchorX =="left" ? 0.3:-0.3, 0]}
        scale={[0.5, 0.5, 0.5]}
      >
        <div
          className={`annotation ${
            props.showAnnotation ? "annotation-visible" : "annotation-hiden"
          }`}
        >
          <div  className={`annotation-inner ${annotationAnchorX !== "left" ? "content-right" : ""}`}>
            {annotationAnchorX !== "left" ? ( <img src="/textures/images/item-wrapper.png" className={`label label-right`} />) : ""}
            <div  className="content">{props.children}</div>
            {annotationAnchorX == "left" ? ( <img src="/textures/images/item-wrapper.png" className={`label`} />) : ""}
           
          </div>
        </div>
      </Html> */}
    
    </group>
  );
};
