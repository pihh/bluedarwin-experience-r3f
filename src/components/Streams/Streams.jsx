import { useFrame } from "@react-three/fiber";
import { VideoFrame } from "../VideoFrame/VideoFrame";
import { useState } from "react";

import lerp from "lerp";

{/* <group position={[0.1,25, 1]} rotation={[Math.PI/2,0,-2.14]} scale={[0.5,0.5,0.5]}> */}
export const Streams = function(props){
    const annotationShowing = props.annotationShowing;
    const isTransitioning = props.transitioning;
    const isActive = props.active;
    const [scaleX,setScaleX] = useState(1)
    const [scaleY,setScaleY] = useState(1)
    const [scaleZ,setScaleZ] = useState(1)
    if(!isTransitioning && !isActive && scaleX !== 1 ){
        setScaleX(1)
        setScaleY(1)
        setScaleZ(1)
    }
    useFrame(()=>{
        if(isTransitioning){
            setScaleX(lerp(scaleX,0.1,0.1))
            setScaleY(lerp(scaleY,0.1,0.1))
            setScaleZ(lerp(scaleZ,0.1,0.1))
        }
    })
    return (
      <VideoFrame
        position={[-0, 40, 0]}
        rotation={[Math.PI/2-0.6, 0.2, -2.14]}
        annotationPositionAdjustment={[0.5, -0.1, 0]}
        showAnnotation={annotationShowing}
        name={"Cognus Streams"}
        idx={"4"}
        src={"/textures/videos/streams.mp4"}
        scale={[scaleX,scaleY,scaleZ]}
      >
        <div id="streams-annotation">
          <p className="annotation-text-container thin">
            <div>Streams.</div>
          </p>
          <p className="annotation-text-container bold">
            <div>
              Cognus streams is a simple drag and drop <br />
              editor where you can define the processes you want to automate
            </div>
          </p>
          
            <div className="annotation-text-container bold">
              <ul>
                <li>
                  
                  Drag and drop builder for your processes
                </li>
           
              </ul>
            </div>
          
        </div>
      </VideoFrame>
    );
  };
  