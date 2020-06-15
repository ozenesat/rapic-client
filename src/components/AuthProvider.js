import { useState, useEffect } from "react";
import { getSessionCookie } from "../utils/utils";
import Router from "next/router";
import { Loading } from "./Loading";

export const AuthProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(async () => {
    if (!getSessionCookie(null).refresh && Router.pathname !== "/") {
      await Router.replace("/login");
    } else if (Router.pathname == "/login") {
      await Router.replace("/dashboard");
    }
    setLoading(false);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return children;
};
