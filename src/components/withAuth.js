import React from "react";
import { getSessionCookie, redirect } from "../utils/utils";

const withAuth = (Page) => {
  return class extends React.Component {
    static async getInitialProps(ctx) {
      const { refresh } = getSessionCookie(ctx);
      const { pathname } = ctx;

      // if there is no refresh token, force to target location
      if (refresh != undefined && pathname == "/login") {
        redirect(ctx, "/dashboard");
      } else if (
        pathname != "/" &&
        pathname != "/login" &&
        refresh == undefined
      ) {
        redirect(ctx, "/login");
      }

      const pageProps =
        Page.getInitialProps && (await Page.getInitialProps(ctx));

      return { data: null, ...pageProps };
    }
    render() {
      return <Page {...this.props} />;
    }
  };
};

export { withAuth };
