import gsap from "gsap";


export const toggleChatbotAnnotation = function (annotationShowing,
    setAnnotationShowing) {
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
      const tlContent = gsap.timeline();

      tlContent.from(selector + " .annotation-text-container div", 1.8, {
        y: 100,
        ease: "power4.out",
        delay: 0.5,
        skewY: 7,
        stagger: {
          amount: 0.75,
        },
      });
    } catch (ex) {
      console.warn(ex);
    }
  } else {
  }
};
