import "./styles.scss";
import gsap from "gsap";

export const toggleChatbotAnnotation = function (
  annotationShowing,
  setAnnotationShowing
) {
  toggleVideoPanelAnnotation(
    "#chatbot-annotation",
    annotationShowing,
    setAnnotationShowing
  );
};
export const toggleDocIntelAnnotation = function (
  annotationShowing,
  setAnnotationShowing
) {
  toggleVideoPanelAnnotation(
    "#doc-intel-annotation",
    annotationShowing,
    setAnnotationShowing
  );
};

export const toggleVideoPanelAnnotation = function (
  selector,
  annotationShowing,
  setAnnotationShowing
) {
  setAnnotationShowing(!annotationShowing);

  if (!annotationShowing) {
    try {
      gsap.to(selector + " .annotation-text-container", {
        y: 0,
        opacity: 1,
        ease: "power4.out",
        delay: 0.2,
        skewY: 0,
        stagger: 0.15,
      });
    } catch (ex) {
      console.warn(ex);
    }
  } else {

    gsap.to(selector + " .annotation-text-container", {
      y: -10,
      opacity: 0,
      ease: "power4.out",
      delay: 0,
      skewY: 0,
      stagger: -0.15,
    });

  }
};

export const Actions = function (props) {
  return (
    <>
      <div id="actions-container">
        <button onClick={props.onTogglePanel} prefix="">
          Toggle Panel
        </button>
        <button onClick={props.onToggleCarlaIntro} prefix="">
          Carla intro
        </button>
        <button onClick={props.onToggleIdCard}>Ask for ID</button>

        <br/>
        <button onClick={props.onToggleChatbotAnnotation}>Chatbot intro</button>
        <button onClick={props.onToggleDocIntelAnnotation}>
          DocIntel intro
        </button>
        <br/>
        <button onClick={props.onNavigateToDocIntel}>
          Navigate to DocIntel
        </button>
        <button onClick={props.onNavigateToChatbot}>
          Navigate to Chatbot
        </button>
      </div>
    </>
  );
};
