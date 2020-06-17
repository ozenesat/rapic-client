import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";

import { getSessionCookie } from "../utils/utils";
import Router from "next/router";
import { Loading } from "./Loading";

const AppStateContext = createContext();
const AppActionContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "ADD_PROJECTS":
      state.projects = state.projects.concat(action.payload);
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
