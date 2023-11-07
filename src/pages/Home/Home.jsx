import { useEffect } from "react";
import { TextureHtml } from "../../experience/TextureHtml/TextureHtml";
import "./Home.css";
import { globalState, useGlobalState } from "../../services/state/state.service";

const HomePageConfig = {
  sections: [
    {
      title: "Home page section 1",
      direction: "rtl",
      banner: {
        url: "/banner-1.jpeg",
        dataSelector: "home-page-section-1-banner",
        lerpBend:0.1,
        lerpScroll:0.1
      },
    },
    
    {
      title: "Home page section 2",
      direction: "rtl",
      banner: {
        url: "/banner-2.jpeg",
        dataSelector: "home-page-section-2-banner",
        lerpBend:0.2,
        lerpScroll:0.2
      },
    },
    {
      title: "Home page section 3",
      direction: "ltr",
      banner: {
        url: "/banner-3.jpeg",
        dataSelector: "home-page-section-3-banner",
        lerpBend:0.3,
        lerpScroll:0.3
      },
    },
  ],
};

export const HomePageSectionText = function (props) {
  return <h1>{props.section.title}</h1>;
};
export const HomePageSectionBanner = function (props) {
  return (
    <img
      src={props.section.banner.url}
      className="page-section-aside--banner"
      data-three-html={props.section.banner.dataSelector}
    />
  );
};

export const HomePageExperience = function () {
  const [state,setState] = useGlobalState(globalState)
  if(state.currentState !== "active"){
    return ""
  }
  return (
    <>
      {HomePageConfig.sections.map((section, index) => {
        if (section.banner.dataSelector) {
          return (
            <TextureHtml
              key={index}
              url={section.banner.url}
              selector={`[data-three-html="${section.banner.dataSelector}"]`}
              lerpBend={section.banner.lerpBend}
              lerpScroll={section.banner.lerpScroll}
            />
          );
        }
        return "";
      })}
    </>
  );
};
export const HomePage = function () {
  const [state,setState] = useGlobalState(globalState)
  useEffect(()=>{
    
    const _state = state;
    _state.currentState = "active";
    setState(_state)
  },[])
  return (
    <>
      
        {HomePageConfig.sections.map((section, index) => {
          return (
            <section className="page-section" key={index}>
              <div className="page-section--wrapper">
                <div className="page-section-aside page-section-aside--left">
                  {section.direction == "ltr" ? (
                    <HomePageSectionText section={section} />
                  ) : (
                    <HomePageSectionBanner section={section} />
                  )}
                </div>
                <div className="page-section-aside page-section-aside--right">
                  {section.direction == "ltr" ? (
                    <HomePageSectionBanner section={section} />
                  ) : (
                    <HomePageSectionText section={section} />
                  )}
                </div>
              </div>
            </section>
          );
        })}
      
    </>
  );
};
