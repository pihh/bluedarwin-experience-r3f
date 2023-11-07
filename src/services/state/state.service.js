import { useState, useEffect } from "react";
import { StateServiceConfig } from "./state.config";

// const _globalState = createGlobalState({
//   currentPage: "home",
//   config: CONFIG.home,
// })

// const getNewPageState = (currentPage,scrollAreaRef) => {
//   const newPageState = {
//     currentPage: currentPage,
//     config: CONFIG[currentPage],
    
//   }
//   newPageState.config.top.current = 0;

// //   scrollAreaRef.scrollTo({top:0})
//   return newPageState;
// }


// ! ||--------------------------------------------------------------------------------||
// ! ||                                     HELPERS                                    ||
// ! ||--------------------------------------------------------------------------------||

/**
 * 
 * @param {*} initState 
 * @returns 
 * @private
 */
function createGlobalState(initState = null) {
  const prototype = {
    data: { state: initState, reRenderFns: [] },

    get() {
      return this.data.state;
    },

    set(newState) {
      if (newState === this.data.state) return;
      this.data.state = newState;
      this.data.reRenderFns.forEach((reRender) => reRender());
      return this;
    },

    joinReRender(reRender) {
      if (this.data.reRenderFns.includes(reRender)) return;
      this.data.reRenderFns.push(reRender);
    },

    cancelReRender(reRender) {
      this.data.reRenderFns = this.data.reRenderFns.filter(
        (reRenderFn) => reRenderFn !== reRender
      );
    },
  };

  return Object.freeze(Object.create(prototype));
}

const useGlobalState = function(_globalState) {
  const [, set] = useState(_globalState.get());
  const state = _globalState.get();
  const reRender = () => set({});

  useEffect(() => {
    _globalState.joinReRender(reRender);
    return () => {
      _globalState.cancelReRender(reRender);
    };
  });

  function setState(newState) {
    _globalState.set(newState);
  }

  return [state, setState];
}

const globalState = createGlobalState(
  StateServiceConfig
)
const globalStateScene = createGlobalState(
  "home"
)

export {useGlobalState, globalState,globalStateScene}