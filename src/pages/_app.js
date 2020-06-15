import React, { Fragment } from "react";
import App from "next/app";
import { Modal } from "@redq/reuse-modal";

import "@redq/reuse-modal/es/index.css";
import { AppProvider } from "../components/AppContext";
import { AuthProvider } from "../components/AuthProvider";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Fragment>
        <Modal />
        <AppProvider>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </AppProvider>
      </Fragment>
    );
  }
}

export default MyApp;
