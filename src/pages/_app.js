import React, { Fragment } from "react";
import App from "next/app";
import { Modal } from "@redq/reuse-modal";

import "@redq/reuse-modal/es/index.css";
import { AppProvider } from "../components/AppContext";

class MyApp extends App {
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
