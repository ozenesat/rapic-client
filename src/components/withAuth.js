import React from "react";
import { getSessionCookie } from "../utils/utils";
import { useAppState } from "./AppContext";

const withAuth = (Page) => {
  return class extends React.Component {
    static async getInitialProps(ctx) {
      const { refresh } = getSessionCookie(ctx);
      const { res, req } = ctx;

      // if there is no refresh token, force to target location
      if (req && res) {
        if (req.url == "/login" && refresh != undefined) {
          res.writeHead(301, {
            Location: "/dashboard",
          });
          res.end();
        }
        if (req.url != "/" && req.url != "/login" && refresh == undefined) {
          res.writeHead(301, {
            Location: "/login",
          });
          res.end();
        }
      }

      const pageProps =
        Page.getInitialProps && (await Page.getInitialProps(ctx));

      return { ...pageProps };
    }
    render() {
      return <Page {...this.props} />;
    }
  };
};

export { withAuth };
