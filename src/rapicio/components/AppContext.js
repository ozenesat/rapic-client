import { createContext, useContext, useReducer } from "react";

const AppStateContext = createContext();
const AppActionContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "ADD_PROJECTS":
      return { projects: action.payload };
    default:
      throw new Error();
  }
}

export const AppProvider = ({ children }) => {
  const [globalState, setGlobalState] = useReducer(reducer, { projects: [] });
  return (
    <AppActionContext.Provider value={setGlobalState}>
      <AppStateContext.Provider value={globalState}>
        {children}
      </AppStateContext.Provider>
    </AppActionContext.Provider>
  );
};
export const useAppState = () => useContext(AppStateContext);
export const useActionState = () => useContext(AppActionContext);
