import { CheckIcon } from "../Icons/CheckIcon";
import { PanelLine } from "../Panels/PanelLine";
import { VideoFrame } from "../VideoFrame/VideoFrame";

export const Chatbot = function (props) {
  const chatbotAnnotationShowing = props.annotationShowing;
  return (
    <VideoFrame
      position={[1, 1.8, -1]}
      rotation={[0, 0, 0]}
      annotationAnchorX="right"
      showAnnotation={chatbotAnnotationShowing}
      name={"Cognus Chatbot"}
      idx={"1"}
      src={"/textures/videos/bg.mp4"}
    >
      <div id="chatbot-annotation">
        <div className="annotation-text-container thin ">Cognus Chatbot.</div>
        <div className="annotation-text-container bold ">
          Our chatbot is this and that. And In the meanwhile,
          <br /> he already knows that:
        </div>

        <div className="annotation-list-container bold ">
          <div>
            <ul>
              <li>
                <span className="annotation-text-container">
                  <CheckIcon />
                  Name
                </span>
              </li>
              <li>
                <span className="annotation-text-container">
                  <CheckIcon />
                  Intent
                </span>
              </li>
              <li>
                <span className="annotation-text-container">
                  <CheckIcon />
                  ID
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </VideoFrame>
  );
};
