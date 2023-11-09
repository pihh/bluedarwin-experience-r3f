import { CallToSubscribeFilmScript } from "../../film-scripts/use-cases/CallToSubscribe";
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

const FilmScriptContainer = function(props){
  return (
    <>
      <div id="film-script-actions-container">
        {CallToSubscribeFilmScript.acts.map((el,i)=> {
          return (
            <button key={`film-script-action--${i}`} onClick={props[el.action]}>#{i} {el.name}</button>
          )
        })}

      </div>
    </>
  )
}

const ActionsContainer = function(props){
  return (
    <>
      <div id="actions-container">
        <button onClick={props.onTogglePanel} prefix="">
          Toggle Panel
        </button>
        <br />
        <button onClick={props.onToggleIdCard}>Ask for ID</button>

        <br />

        <button onClick={props.onToggleCarlaIntro} prefix="">
          Carla intro
        </button>
        <button onClick={props.onToggleCarlaEmail} prefix="">
          Carla Email
        </button>
        <button onClick={props.onToggleCarlaHeart} prefix="">
          Carla Love
        </button>
        <br />

        <button onClick={props.onToggleChatbotAnnotation}>Chatbot intro</button>
        <button onClick={props.onToggleDocIntelAnnotation}>
          DocIntel intro
        </button>
        <br />
        <button onClick={props.onNavigateToChatbot}>Navigate to Chatbot</button>
        <button onClick={props.onNavigateToDocIntel}>
          Navigate to DocIntel
        </button>
        <button onClick={props.onNavigateToMeanWhile}>
          Navigate to Meanwhile
        </button>
        <button onClick={props.onNavigateToAutomations}>
          Navigate to Automations
        </button>
        <button onClick={props.onNavigateToCarla}>Navigate to Carla</button>
        <button onClick={props.onNavigateToStreamsPunchline}>Navigate to streams punchline</button>
        <button onClick={props.onNavigateToStreams}>Navigate to streams</button>
      </div>
    </>
  );
}

export const Actions = function (props) {
  return (
    <>
      <ActionsContainer {...props} />
      <FilmScriptContainer {...props} />
    </>
  );
};
