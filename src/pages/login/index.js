import React, { Fragment, useContext } from "react";
import Head from "next/head";
import Sticky from "react-stickynode";
import { ThemeProvider } from "styled-components";
import { theme } from "common/src/theme/app";
import { ResetCSS } from "common/src/assets/css/style";
import { GlobalStyle, ContentWrapper } from "../../containers/rapic.style";
import { DrawerProvider } from "common/src/contexts/DrawerContext";
import Navbar from "../../containers/Navbar";
import Login from "../../containers/Login";
import Footer from "../../containers/Footer";
import { withAuth } from "../../components/withAuth";

function LoginPage() {
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
          {/*<!-- Font Awesome icons (free version)-->*/}
        <script src="https://use.fontawesome.com/releases/v5.13.0/js/all.js" crossorigin="anonymous"></script>
        </Head>
        <ResetCSS />
        <GlobalStyle />
        <ContentWrapper>
          <Sticky top={0} innerZ={9999} activeClass="sticky-nav-active">
            <DrawerProvider>
              <Navbar />
            </DrawerProvider>
          </Sticky>
          <Login />
          <Footer />
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
}

export default withAuth(LoginPage);
