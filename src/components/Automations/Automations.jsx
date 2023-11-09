import { CheckIcon } from "../Icons/CheckIcon";
import { VideoFrame } from "../VideoFrame/VideoFrame";

export const Automations = function (props) {
  const annotationShowing = props.annotationShowing;
  return (
    <VideoFrame
      position={[20, 1.8, -6]}
      rotation={[0, -Math.PI / 2 + 0.4, 0]}
      annotationPositionAdjustment={[0.8, 0, 0]}
      showAnnotation={annotationShowing}
      name={"Doc Intel"}
      idx={"2"}
      src={"/textures/videos/streams.mp4"}
    >
      <div id="automations-annotation">
        <p className="annotation-text-container thin">
          <div>Automations.</div>
        </p>
        <p className="annotation-text-container bold">
          <div>
            Bluedarwin Automations will extract <br />
            Information from documents using AI
          </div>
        </p>
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
