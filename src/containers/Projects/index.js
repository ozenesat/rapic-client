import React, { Fragment } from "react";
import Head from "next/head";
import Sticky from "react-stickynode";
import { ThemeProvider } from "styled-components";
import { theme } from "common/src/theme/app";
import { ResetCSS } from "common/src/assets/css/style";
import Container from "common/src/components/UI/ContainerTwo";
import { DrawerProvider } from "common/src/contexts/DrawerContext";

import { GlobalStyle, ContentWrapper } from "../../containers/rapic.style";
import Navbar from "../../containers/Navbar";
import Menu from "../../containers/Projects/Menu";
import { Content, ProjectContainer } from "./projects.style";

function Projects({ children, endpoints }) {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          <title>Rapic - fast backend</title>
          <meta name="theme-color" content="#FF7B00" />
          <meta name="Description" content="Rapic io landing page" />

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
          <Container>
            <ProjectContainer>
              <Menu endpoints={endpoints} />
              <Content>{children}</Content>
            </ProjectContainer>
          </Container>
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
}

export default Projects;
