import { CheckIcon } from "../Icons/CheckIcon";
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
  

        <p className="annotation-text-container thin">
            <div>Cognus Chatbot.</div>
          </p>
          <p className="annotation-text-container bold">
            <div>
              Our chatbot is this and that. And <br />
              In the meanwhile, he already knows that:
            </div>
          </p>
          <div className="annotation-text-container bold">
          <div>
            <ul>
              <li>
                <CheckIcon />
                Name
              </li>
              <li>
                <CheckIcon />
                Intent
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
