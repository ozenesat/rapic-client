import React, { useState, useRef, useEffect } from "react";
import Fade from "react-reveal/Fade";
import ScrollSpyMenu from "common/src/components/ScrollSpyMenu";
import Scrollspy from "react-scrollspy";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { Icon } from "react-icons-kit";
import { androidMenu } from "react-icons-kit/ionicons/androidMenu";
import { androidClose } from "react-icons-kit/ionicons/androidClose";
import Link from "common/src/components/Link";
import Button from "common/src/components/Button";
import Logo from "common/src/components/UIElements/Logo";
import Container from "common/src/components/UI/ContainerTwo";
import Login from "../Login";
import SignUp from "../SignUp";
import NavbarWrapper, {
  MenuArea,
  MobileMenu,
  NavbarRight,
} from "./navbar.style";
import LogoImage from "common/src/assets/image/app/logo.png";
import { useAppState } from "../../components/AppContext";
import { data } from "common/src/data/app";
import Router from "next/router";
import { removeCookies } from "cookies-next";

const Navbar = ({ page }) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isLandingPage, setIsLandingPage] = useState(page === "landing");
  const [isAuthenticated, setAuthenticated] = useState(false);
  const globalState = useAppState();
  const scrollItems = [];

  useEffect(() => {
    setAuthenticated(globalState.isAuthenticated);
  }, []);

  data.navItems.forEach((item) => {
    scrollItems.push(item.path.slice(1));
  });

  const handleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const handleHandleMenuClose = () => {
    setMobileMenu(false);
  };

  function handleLogut() {
    removeCookies(null, "rapic_session");
    setAuthenticated(false);
    Router.replace("/");
  }

  return (
    <NavbarWrapper className="navbar">
      <Container>
        <Logo
          href="/#"
          logoSrc={LogoImage}
          title="Rapic.io"
          className="main-logo"
        />
        {/* end of logo */}

        <MenuArea>
          <ScrollSpyMenu
            className="menu-items menu-left"
            menuItems={isLandingPage ? data.navItems : data.navDashboardItems}
            offset={-84}
          />

          <NavbarRight>
            <li>
              {isAuthenticated ? (
                <Button title="LOGIN" onClick={handleLogut} />
              ) : (
                <Link
                  label="login"
                  path="#login"
                  href="/login"
                  component={Login}
                >
                  <Button title="LOGOUT" type="submit" />
                </Link>
              )}
            </li>
          </NavbarRight>

          {/* end of main menu */}
          <Button
            className="menubar"
            icon={
              mobileMenu ? (
                <Icon
                  style={{ color: "#02073E" }}
                  className="bar"
                  size={32}
                  icon={androidClose}
                />
              ) : (
                <Fade>
                  <Icon
                    style={{ color: "#02073E" }}
                    className="close"
                    icon={androidMenu}
                    size={32}
                  />
                </Fade>
              )
            }
            color="#0F2137"
            variant="textButton"
            onClick={handleMobileMenu}
          />
        </MenuArea>
      </Container>

      {/* start mobile menu */}
      <MobileMenu className={`mobile-menu ${mobileMenu ? "active" : ""}`}>
        <Container>
          <Scrollspy
            className="menu"
            items={scrollItems}
            offset={-84}
            currentClassName="active"
          >
            {data.navItems.map((menu, index) => (
              <li key={`menu_key${index}`}>
                <AnchorLink
                  href={menu.path}
                  offset={menu.offset}
                  onClick={handleHandleMenuClose}
                >
                  {menu.label}
                </AnchorLink>
              </li>
            ))}
            <li>
              <Link href="/login" component={Login}>
                Login
              </Link>
            </li>
          </Scrollspy>
        </Container>
      </MobileMenu>
      {/* end of mobile menu */}
    </NavbarWrapper>
  );
};

export default Navbar;
