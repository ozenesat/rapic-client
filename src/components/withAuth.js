import React, { useEffect } from "react";
import { getSessionCookie, redirect } from "../utils/utils";

function withAuth(Page) {
  return class extends React.Component {
    static async getInitialProps(ctx) {
      const { refresh } = getSessionCookie(ctx);
      const { pathname } = ctx;

      // if there is no refresh token, force to target location
      if (
        refresh != undefined &&
        (pathname == "/login" || pathname == "/signup")
      ) {
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

      return { ...pageProps };
    }
    render() {
      return <Page {...this.props} />;
    }
  };
}

export { withAuth };
