import { useState } from "react";
import { PanelSeparator } from "./PanelSeparator";
import { wait } from "../../utils/wait";
import { forwardRef } from "react";
import { useImperativeHandle } from "react";
import { TextRevealAnimation } from "../../utils/animation";



export const PanelRight = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    getPanelState(){
      return open
    },
    togglePanel() {
      if (open) {
        return onClosePanel();
      } else {
        return onOpenPanel();
      }
    },
    openPanel() {
      return onOpenPanel();
    },
    closePanel() {
      return onClosePanel();
    },
  }));

  const [open, setOpen] = useState(false);
  const [opening, setOpening] = useState(false);
  const [opened, setOpened] = useState(false);
  const onOpenPanel = function () {
    
    return new Promise((res,rej)=>{

      if (opening) {
        rej(open)
        return;
      }
      setOpening(true);
      setOpen(true);
      
      wait(300, () => {
        TextRevealAnimation({selector: '.bde-panel-right'}).then(()=>{
          setOpened(true);
          wait(10, () => {
            
            setOpening(false);
           
          });
        })
        
      });
    })
    };
    const onClosePanel = function () {
      return new Promise((res,rej)=>{

        if (opening) {
          rej(open)
          return;
        }
    if (opening) return;
    setOpening(true);

    wait(10, () => {
      TextRevealAnimation({selector: '.bde-panel-right', direction:"leave"}).then(()=>{
       
        setOpen(false)
        setOpened(false);
        wait(800, () => {
          setOpening(false);
          res(open)
        });
      })
    });
  })
  };
  return (
    <div
      className={`bde-panel bde-panel-right ${open ? "open" : ""}  ${
        opened ? "opened" : ""
      }`}
    >
      <PanelSeparator />
      <div className="bde-panel-container">
        <div>
          {props.children}
        </div>
      </div>
    </div>
  );
});
