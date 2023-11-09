import { Html, useGLTF } from "@react-three/drei";
import { useState } from "react";

export const Carla = function (props) {
  const { scene } = useGLTF("/models/carla-draco.glb");
  const [ref, object] = useState();

  const textPosition = [
    props.position[0] - 1.75,
    props.position[1] + 1.8,
    props.position[2] - 0.5,
  ];
  const carlaPosition = [
    props.position[0],
    props.position[1],
    props.position[2],
  ];
  const handleTransitionEnd = function (e) {
    e.persist();
    props.onTransitionEnd();
  };

  return (
    <group>
      <primitive object={scene} {...props} />
      <Html
        {...props}
        transform
        geometry={<planeGeometry args={[3.66, 3.47]} />}
        position-x={props.position[0] + 1.9}
        position-y={props.position[1] + 1.5}
        position-z={props.position[2] - 0.5}
        rotation={[0, -0.6, 0]}
      >
        <div
          className={`annotation ${
            props.showAnnotation ? "annotation-visible" : "annotation-hiden"
          }`}
          
          onTransitionEnd={(e) => {
            handleTransitionEnd(e);
          }}
        >
          <div className="annotation-inner speaking">
            <div className="carla-speaking">
              <div className="">Hi there.</div>
              <div className="">
                My name is Carla and I want to subscribe to your service.
              </div>
            </div>
          </div>
        </div>
      </Html>
      <Html
        {...props}
        transform
        geometry={<planeGeometry args={[3.66, 3.47]} />}
        position-x={props.position[0] + 3}
        position-y={props.position[1] + 2}
        position-z={props.position[2] - 0.5}
        rotation={[0, 2.2, 0]}
      >
        <div
          className={`annotation ${
            props.showEmailAnnotation
              ? "annotation-visible"
              : "annotation-hiden"
          }`}
          
          onTransitionEnd={(e) => {
            handleTransitionEnd(e);
          }}
        >
          <div className="annotation-inner speaking">
            <div className="carla-speaking">
              <div className="mb-1">
                <img src="/textures/images/email-icon.png" />
              </div>
              <div className="">
                Carla has just recieved the confirmation that her subscription
                has been confirmed
              </div>
            </div>
          </div>
        </div>
      </Html>
      <Html
        {...props}
        transform
        geometry={<planeGeometry args={[3.66, 3.47]} />}
        position-x={props.position[0] + 1.2}
        position-y={props.position[1] + 1.8}
        position-z={props.position[2] - 0.5}
        rotation={[0, -0.6, 0]}
      >
        <div
          className={`annotation ${
            props.showLoveAnnotation ? "annotation-visible" : "annotation-hiden"
          }`}
          
          onTransitionEnd={(e) => {
            handleTransitionEnd(e);
          }}
        >
          <div className="annotation-inner speaking">
            <div className="carla-speaking p-4" style={{ padding: "1em" }}>
              <img src="/textures/images/heart-icon.png" className="mb-0" />
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
};
