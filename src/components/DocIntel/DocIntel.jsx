import { CheckIcon } from "../Icons/CheckIcon";
import { VideoFrame } from "../VideoFrame/VideoFrame";

export const DocIntel = function (props) {
  const docIntelAnnotationShowing = props.annotationShowing;
  return (
    <VideoFrame
      position={[20, 1.8, -6]}
      rotation={[0, -Math.PI / 2 + 0.4, 0]}
      annotationPositionAdjustment={[0.8, 0, 0]}
      showAnnotation={docIntelAnnotationShowing}
      name={"Doc Intel"}
      idx={"2"}
      src={"/textures/videos/streams.mp4"}
    >
      <div id="doc-intel-annotation">
        <div className="annotation-text-container thin">
          <div>Doc Intel.</div>
        </div>
        <div className="annotation-text-container bold">
          <div>
            Bluedarwin Doc Intel will extract <br />
            Information from documents using AI
          </div>
        </div>
        
          <div className="annotation-text-container bold">
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
    </VideoFrame>
  );
};
