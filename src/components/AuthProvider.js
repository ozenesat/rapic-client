import { useState, useEffect } from "react";
import { getSessionCookie } from "../utils/utils";
import Router from "next/router";
import { Loading } from "./Loading";
import { useActionState } from "components/AppContext";

export const AuthProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const setGlobalState = useActionState();

  useEffect(() => {
    const isAuthedticated = getSessionCookie(null).refresh != undefined;
    console.log({ isAuthedticated });
    setGlobalState({ type: "SET_USER_AUTH", payload: isAuthedticated });

    async function checkAuthState() {
      if (!isAuthedticated && Router.pathname !== "/") {
        await Router.replace("/login");
      } else if (Router.pathname == "/login") {
        await Router.replace("/dashboard");
      }
      setLoading(false);
    }
    checkAuthState();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return children;
};
