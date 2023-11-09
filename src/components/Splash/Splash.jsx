import { useEffect } from "react";
import "./styles.scss";
import { useState } from "react";
import { wait } from "../../utils/wait";

export const Splash = function (props) {
  const [opacity, setOpacity] = useState(true);
  const [display, setDisplay] = useState(true);
  useEffect(() => {

    wait(1000,()=>{
        setOpacity(false)
        wait(750, ()=>{
          props.onSplashClose()
        })
        wait(1500,()=>{
            setDisplay(false)
            
        })
    })
  }, []);
  
  return (
    <>
      <div
        id="splash-screen"
        className={`${opacity ? "" : "opacity-0"} ${
          display ? "" : "display-none"
        }`}
      >
        <div>
          <em>"Transformation should be easy"</em>
          <div>
            <h1>
              Automate <br />
              <span className="text-stroke">Everything</span>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};
