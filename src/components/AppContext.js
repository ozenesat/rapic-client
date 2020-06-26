import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import Router, { useRouter, withRouter } from "next/router";
import { getSessionCookie } from "utils/utils";
import { Loading } from "components/Loading";
import API from "services/api";

const AppStateContext = createContext();
const AppActionContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "ADD_PROJECTS":
      state.projects = action.payload;
      return state;
    case "ADD_NEW_PROJECT":
      state.projects.push(action.payload);
      return state;
    case "UPDATE_PROJECT":
      const index = state.projects
        ? state.projects.findIndex((item) => item.id == action.payload.id)
        : -1;
      if (index > -1) {
        state.projects[index] = action.payload;
      }
      return state;
    case "DELETE_PROJECT":
      const deleteIndex = state.projects
        ? state.projects.findIndex((item) => item.id == action.payload.id)
        : -1;
      if (deleteIndex > -1) {
        state.projects.splice(deleteIndex, 1);
      }
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
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const [globalState, setGlobalState] = useReducer(reducer, {
    projects: null,
    endpoints: {},
    user: null,
    token: null,
  });

  useEffect(() => {
    handleChange();
  }, [router.pathname]);

  function handleChange() {
    const { isAuthenticated } = getSessionCookie();
    if (isAuthenticated && globalState.projects == null) {
      getProjects();
    } else {
      setLoading(false);
    }
  }
  async function getProjects() {
    try {
      const projects = await API.getRapicProjects(null);
      setGlobalState({ type: "ADD_PROJECTS", payload: projects });

      setLoading(false);
    } catch (err) {
      console.log({ err });
      setLoading(false);
    }
  }

  return (
    <AppActionContext.Provider value={setGlobalState}>
      <AppStateContext.Provider value={globalState}>
        {isLoading ? <Loading /> : children}
      </AppStateContext.Provider>
    </AppActionContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);
export const useActionState = () => useContext(AppActionContext);
