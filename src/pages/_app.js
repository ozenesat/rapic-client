import React, { Fragment } from "react";
import App from "next/app";
import { Modal } from "@redq/reuse-modal";
import "nprogress/nprogress.css";
import "@redq/reuse-modal/es/index.css";
import { AppProvider } from "../components/AppContext";
import NProgress from "nprogress";
import Router from "next/router";
import "../pagestyles/app/style.css";
class MyApp extends App {
  componentDidMount() {
    NProgress.configure({ color: "red" });
    Router.onRouteChangeStart = () => NProgress.start();
    Router.onRouteChangeComplete = () => NProgress.done();
    Router.onRouteChangeError = () => NProgress.done();
  }
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Fragment>
        <Modal />
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </Fragment>
    );
  }
}

export default MyApp;
