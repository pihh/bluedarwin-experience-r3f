import "./styles.scss";
import { PanelLeft } from "./PanelLeft";
import { PanelRight } from "./PanelRight";
import { useRef } from "react";
import { forwardRef } from "react";
import { useImperativeHandle } from "react";
import { Suspense } from "react";
import { useState } from "react";

export const Panels = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const side = props.side || "right";
  const rightPanelRef = useRef();
  const leftPanelRef = useRef();

  const getPanelRef = function () {
    return side == "left" ? leftPanelRef : rightPanelRef;
  };
  useImperativeHandle(ref, () => ({
    getPanelState(){
      return getPanelRef().current.getPanelState();
    },
    togglePanel() {
      const isOpen = getPanelRef().current.getPanelState();
      if (!isOpen) {
        setOpen(true);
      }
      getPanelRef().current.togglePanel();
    },
    openPanel() {
      const isOpen = getPanelRef().current.getPanelState();
      if (!isOpen) {
        setOpen(true);
      }
      getPanelRef().current.openPanel();
    },
    closePanel() {
      getPanelRef()
        .current.closePanel()
        .then(() => {
          setOpen(false);
          console.log("done closing");
        })
        .catch(() => {});
    },
  }));

  const onClickPanel = function (panelSide) {
    getPanelRef()
      .current.closePanel()
      .then(() => {
        setOpen(false);
      })
      .catch(() => {});
  };

  const children = props.children;
  //   const onOpenPanel = props.onOpenPanel
  return (
    <Suspense>
      <div
        id="bde-panels"
        className={`bde-panels--${side}  ${open ? "bde-panels--showing" : ""}`}
        onClick={() => {
          onClickPanel("parent");
        }}
      >
        <PanelLeft
          ref={leftPanelRef}
          onClick={() => {
            onClickPanel("left");
          }}
        >
          {children}
        </PanelLeft>

        <PanelRight
          ref={rightPanelRef}
          onClick={() => {
            onClickPanel("right");
          }}
        >
          {children}
        </PanelRight>
      </div>
    </Suspense>
  );
});
