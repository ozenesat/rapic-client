import { createContext, useContext, useReducer } from "react";
import API from "../services/api";

const AppStateContext = createContext();
const AppActionContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "ADD_PROJECTS":
      return { projects: state.projects.concat(action.payload) };
    case "SET_USER":
      return { ...state, ...action.payload };
    case "SET_USER_AUTH":
      return { ...state, isAuthenticated: action.payload };
    default:
      throw new Error();
  }
}

export const AppProvider = ({ children }) => {
  const [globalState, setGlobalState] = useReducer(reducer, {
    projects: [],
    endpoints: {},
    user: null,
    token: null,
    isAuthenticated: false,
  });

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
