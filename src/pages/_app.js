import React, { Fragment } from "react";
import App from "next/app";
import { Modal } from "@redq/reuse-modal";

import "@redq/reuse-modal/es/index.css";
import { AppProvider } from "../components/AppContext";

import Router from "next/router";
import { Loading } from "../components/Loading";

class MyApp extends App {
  state = {
    isLoading: false,
  };
  componentDidMount() {
    Router.onRouteChangeStart = () => {
      // console.log('onRouteChnageStart triggered');
      this.setState({ isLoading: true });
    };

    Router.onRouteChangeComplete = () => {
      // console.log('onRouteChnageComplete triggered');
      this.setState({ isLoading: false });
    };

    Router.onRouteChangeError = () => {
      // console.log('onRouteChnageError triggered');
      this.setState({ isLoading: false });
    };
  }
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Fragment>
        <Modal />
        <AppProvider>
          <Component {...pageProps} />
          {this.state.isLoading && <Loading />}
        </AppProvider>
      </Fragment>
    );
  }
}

export default MyApp;
