import { CheckIcon } from "../Icons/CheckIcon";
import { Particles } from "../Particles/Particles";
import { VideoFrame } from "../VideoFrame/VideoFrame";

export const Automations = function (props) {
  const annotationShowing = props.annotationShowing;
  return (
    <group>
    <VideoFrame
      position={[-25, 1.8, -40]}
      rotation={[0, Math.PI / 2 - 0.9, 0]}
       annotationPositionAdjustment={[0.5, 0, 0]}
      
      showAnnotation={annotationShowing}
      name={"Bluedarwin Automations"}
      idx={"3"}
      src={"/textures/videos/bg.mp4"}
   
    >
      <div id="automations-annotation">
        <div className="annotation-text-container bold">
          <div>Bluedarwin Automations.</div>
        </div>
        <div className="annotation-text-container thin">
          <div>
            A powerfull AI automation system that behind the scenes launched
            a bot powered by computer vision that has 
            already:
          </div>
        </div>
        <div className="annotation-text-container bold">
          <div>
            <ul>
              <li className="bold">
              Logged in the system.
              </li>
              <li className="bold">
              Initialized the process of creating a new subscription for Carla
              </li >
              <li className="bold">
              Inserted in the system the required data extracted from the conversation with Cognus Chatbot™ 
              </li >
              <li className="bold">
              Inserted in the system the required data extracted from the ID with Doc Intel™
              </li>
            </ul>
          </div>
        </div>
      </div>
    </VideoFrame>
    <Particles position={[-10, 6, -20  ]} size={0.1} radius={12} direction={1}/>
    </group>
  );
};
