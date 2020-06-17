import { createContext, useContext, useReducer } from "react";

const AppStateContext = createContext();
const AppActionContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "ADD_PROJECTS":
      state.projects = action.payload;
      return state;
    case "ADD_NEW_PROJECTS":
      state.projects.push(action.payload);
      return state;
    case "SET_USER":
      return { ...state, ...action.payload };
    case "SET_USER_AUTH":
      state.isAuthenticated = action.payload;
      return state;
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
