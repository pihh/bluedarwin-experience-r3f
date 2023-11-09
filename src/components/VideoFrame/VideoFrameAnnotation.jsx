import './styles.scss';
import { Html } from "@react-three/drei";

const LABEL_IMAGE_SRC = "/textures/images/item-wrapper.png";

export const VideoFrameAnnotation = function (props) {
    const showAnnotation = props.showAnnotation;
    const annotationAnchorX = props.annotationAnchorX || "left";
    const annotationPositionAdjustment = props.annotationPositionAdjustment || [
      0, 0, 0,
    ];
    const annotationPosition = {
        x: annotationAnchorX == "left"? -6.8 + annotationPositionAdjustment[0]:5.8 + annotationPositionAdjustment[0],
        y: annotationAnchorX == "left"? 0 + annotationPositionAdjustment[1]: 0 + annotationPositionAdjustment[1],
        z: annotationAnchorX == "left"?  0 + annotationPositionAdjustment[2]: 0 + annotationPositionAdjustment[2],
      }
      const handleTransitionEnd = function(e){
        e.persist();      
        // props?.onTransitionEnd()
      }
  return (
    <>
      <Html
        transform
        geometry={<planeGeometry args={[5.4, 3, 32, 32]} />}
        position={[
          annotationPosition.x,
          annotationPosition.y,
          annotationPosition.z,
        ]}
        rotation={[0, annotationAnchorX == "left" ? 0.3 : -0.3, 0]}
        scale={[0.5, 0.5, 0.5]}
      >
        <div
          onTransitionEnd={(e) => {
                     
            handleTransitionEnd(e)
          }}
          className={`annotation ${
            showAnnotation ? "annotation-visible" : "annotation-hiden"
          }`}
        >
          <div
            className={`annotation-inner ${
              annotationAnchorX !== "left" ? "content-right" : ""
            }`}
          >
            {annotationAnchorX !== "left" ? (
              <img src={LABEL_IMAGE_SRC} className={`label label-right`} />
            ) : (
              ""
            )}

            <div className="content">
                {props.children}
            </div>
            
            {annotationAnchorX == "left" ? (
              <img src={LABEL_IMAGE_SRC} className={`label`} />
            ) : (
              ""
            )}
          </div>
        </div>
      </Html>
    </>
  );
};
