import React, { Fragment, useContext, useEffect } from "react";
import Head from "next/head";
import Sticky from "react-stickynode";
import { ThemeProvider } from "styled-components";
import { theme } from "common/src/theme/app";
import { ResetCSS } from "common/src/assets/css/style";
import { GlobalStyle, ContentWrapper } from "../../containers/rapic.style";
import { DrawerProvider } from "common/src/contexts/DrawerContext";
import Navbar from "../../containers/Navbar";
import Dashboard from "../../containers/Dashboard";
import API from "../../services/api";
import { useActionState, useAppState } from "../../components/AppContext";

function DashboardPage({ projects }) {
  const globalState = useAppState();
  const setGlobalState = useActionState();

  useEffect(() => {
    setGlobalState({ type: "ADD_PROJECTS", payload: projects });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          <title>Rapic - fast backend</title>
          <meta name="theme-color" content="#FF7B00" />
          <meta name="Description" content="Rapic io landing page" />

          {/* Load google fonts */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Imprima:400,400i,700,700i|DM+Sans:400,400i,500,500i,700,700i&display=swap"
          />
        </Head>
        <ResetCSS />
        <GlobalStyle />
        <ContentWrapper>
          <Sticky top={0} innerZ={9999} activeClass="sticky-nav-active">
            <DrawerProvider>
              <Navbar />
            </DrawerProvider>
          </Sticky>
          <Dashboard />
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
}

export default DashboardPage;
