import { CheckIcon } from "../Icons/CheckIcon";
import { VideoFrame } from "../VideoFrame/VideoFrame";

export const Automations = function (props) {
  const annotationShowing = props.annotationShowing;
  return (
    <VideoFrame
      position={[-25, 1.8, -40]}
      rotation={[0, Math.PI / 2 - 0.9, 0]}
       annotationPositionAdjustment={[1.2, 0, 0]}
      
      showAnnotation={annotationShowing}
      name={"Bluedarwin Automations"}
      idx={"3"}
      src={"/textures/videos/bg.mp4"}
   
    >
      <div id="automations-annotation">
        <div className="annotation-text-container thin">
          <div>Automations.</div>
        </div>
        <div className="annotation-text-container bold">
          <div>
            Bluedarwin Automations will extract <br />
            Information from documents using AI
          </div>
        </div>
        <div className="annotation-text-container bold">
          <div>
            <ul>
              <li>
                <CheckIcon />
                NIF
              </li>
              <li>
                <CheckIcon />
                Age
              </li>
              <li>
                <CheckIcon />
                ID
              </li>
            </ul>
          </div>
        </div>
      </div>
    </VideoFrame>
  );
};
