import React from "react";

const defaultGlobalState = {
    num: 0,
    text: "foo",
    bool: false
  };
  const globalStateContext = React.createContext(defaultGlobalState);
  const dispatchStateContext = React.createContext(undefined);

export const useGlobalState = () => [
    React.useContext(GlobalStateContext),
    React.useContext(DispatchStateContext)
  ];
export const GlobalStateProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(
      (state, newValue) => ({ ...state, ...newValue }),
      defaultGlobalState
    );
    return (
      <globalStateContext.Provider value={state}>
        <dispatchStateContext.Provider value={dispatch}>
          {children}
        </dispatchStateContext.Provider>
      </globalStateContext.Provider>
    );
  };