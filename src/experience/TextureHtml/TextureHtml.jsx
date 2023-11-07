import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import {TextureLoader} from "three"
import {
  computeElementGeometryCoordinates,
  createDiv,
  getSelectorCoordinates,
} from "../../services/coordinates/coordinates.service";
import {
  globalState,
  useGlobalState,
} from "../../services/state/state.service";
import lerp from "lerp";

import '../../custom/scroll-material'

export const useCoordinates = function () {
  const t = useThree();
  const widthPx = t.size.width;
  const heightPx = t.size.height;
  const widthRel = t.viewport.width;
  const heightRel = t.viewport.height;
  const viewportFactor = t.viewport.factor;
  const widthPxToRel = widthRel / widthPx;
  const heightPxToRel = heightRel / heightPx;

  return {
    widthPx,
    heightPx,
    widthRel,
    heightRel,
    viewportFactor,
    widthPxToRel,
    heightPxToRel,
  };
};

export const TextureHtml = function (props) {
  const selector = props.selector;
  const parentSelector = props.parentSelector || "#page-scroll-area";
  const position = props.position || [0, 0, 0];
  const rotation = props.rotation || [0, 0, 0];

  let image = props.url ? useLoader(TextureLoader, props.url) : null;
  let last = 0;
  let distortionFactor = props.distortionFactor || 5;
  let shift = props.shift || 50 ;
  let color = props.color || "#FF00FF";
  let lerpScroll = props.lerpScroll || 0.1;
  let lerpBend = props.lerpBend || 0.5;
  let lerpDistortion = props.lerpDistortion || 1;

  if (!selector) return <></>;
  const [state, setState] = useGlobalState(globalState);
  const experienceCoordinates = useCoordinates();

  const ref = useRef();
  const material = useRef();
  //   const [position,setPosition] = useState([props.position || [0,0,0]]);

  const [planeArgs, setPlaneArgs] = useState([1, 1]);
  const [initialPosition, setInitialPosition] = useState(false);
  const [initialPositionX, setInitialPositionX] = useState(false);
  const [initialPositionY, setInitialPositionY] = useState(false);

  useEffect(() => {

    let initialPositionInterval;
    clearInterval(initialPositionInterval);
    initialPositionInterval = setInterval(() => {
      if (state.currentState !== "active") return;
      if (initialPosition) {
        clearInterval(initialPositionInterval);
      }
      const selectorCoordinates = getSelectorCoordinates(
        selector,
        parentSelector
      );
      if (selectorCoordinates.success) {
        clearInterval(initialPositionInterval);
        if (initialPosition) return;
        setInitialPosition(true);
        const geometryCoordinates = computeElementGeometryCoordinates(
          selectorCoordinates.coordinates,
          experienceCoordinates
        );

        setPlaneArgs([
          geometryCoordinates.rel.w,
          geometryCoordinates.rel.h,
          32,
          32,
          0.1,
        ]);
        ref.current.position.x = geometryCoordinates.rel.x; //+ experienceCoordinates.widthRel / 2;
        ref.current.position.y = state.top.current / experienceCoordinates.viewportFactor-geometryCoordinates.rel.y; //- geometryCoordinates.rel.h / 2;
        
        setInitialPositionX(geometryCoordinates.rel.x);
        setInitialPositionY(geometryCoordinates.rel.y);
    
      }
    });
  }, []);

  useFrame(() => {
   
    if (initialPositionX !== false && initialPositionY !== false) {
        // Scroll animation
        const currY = ref.current.position.y;
       const currTop = state.top.current / experienceCoordinates.viewportFactor;

       ref.current.position.y = lerp(currY,  currTop -initialPositionY, lerpScroll);

       // Color animation 
       const top = state.top.current;
       
      
   
        material.current.scale = lerp(
          material.current.scale,
          Math.abs(1/distortionFactor - top / ((distortionFactor ) * experienceCoordinates.heightPx)),
          lerpDistortion
        );

        // Bend animation
       material.current.shift = lerp(
         material.current.shift,
         (top - last) / shift,
         lerpBend
       );
   
   
       last = top;
    }
  });

  return (
    <group position={position} ref={ref} rotation={rotation} visible={initialPosition}>
      <mesh>
        <planeGeometry args={planeArgs} />
        <scrollMaterial
          ref={material}
          color={color}
          uTexture={image}
          transparent
          opacity={1}
          toneMapped={true}
        />
 
      </mesh>
    </group>
  );
};
