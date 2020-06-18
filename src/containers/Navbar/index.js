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
import { Loading } from "../../components/Loading";
import { useActionState } from "../../components/AppContext";
import { data } from "common/src/data/app";
import { useRouter } from "next/router";
import Dashboard from "../Dashboard";
import { getSessionCookie, clearSessionCookie } from "../../utils/utils";

const Navbar = ({ page }) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const router = useRouter();
  const [isLandingPage, setIsLandingPage] = useState(router.pathname == "/");
  const [isAuthenticated, setAuthenticated] = useState(false);
  const setGlobalState = useActionState();
  const scrollItems = [];

  useEffect(() => {
    const isAuthenticated = getSessionCookie(null).refresh != undefined;
    setGlobalState({ type: "SET_USER_AUTH", payload: isAuthenticated });
    setAuthenticated(isAuthenticated);
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

  async function handleLogout() {
    clearSessionCookie(null);

    if (router.pathname == "/") {
      await router.reload();
    } else {
      await router.replace("/#");
    }

    setGlobalState({ type: "SET_USER_AUTH", payload: false });
    setAuthenticated(false);
  }

  const renderDefaultRightBar = () => {
    if (router.pathname == "/login") {
      return <Button title="Sign Up" onClick={() => router.push("/signup")} />;
    }
    if (!isAuthenticated) {
      return <Button title="Login" onClick={() => router.push("/login")} />;
    }

    if (router.pathname == "/dashboard") {
      return (
        <Button title="Logout" className="menu-button" onClick={handleLogout} />
      );
    }

    return (
      <>
        <Button title="Dashboard" onClick={() => router.push("/dashboard")} />
        <Button title="Logout" className="menu-button" onClick={handleLogout} />
      </>
    );
  };
  // it looks meaningless but with this function browser loads landing page
  // faster and smoother, we can discuss about it.
  // const esat = (e) => {
  //   if (!isLandingPage) {
  //     e.preventDefault();
  //     router.push("/#");
  //     return <Loading />;
  //   }
  // };
  const navbarJsx = (
    <NavbarWrapper className="navbar">
      <Container>
        <Logo
          logoSrc={LogoImage}
          title="Rapic.io"
          className="main-logo"
          href="/#"
          onClick={() => router.push("/#")}
        />

        {/* end of logo */}

        <MenuArea>
          <ScrollSpyMenu
            className="menu-items menu-left"
            menuItems={isLandingPage ? data.navItems : data.navLogItems}
            offset={-84}
          />
          <NavbarRight>
            <li>{renderDefaultRightBar()}</li>
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
            items={isLandingPage ? scrollItems : data.navLogItems}
            offset={-84}
            currentClassName="active"
          >
            {isLandingPage
              ? data.navItems.map((menu, index) => (
                  <li key={`menu_key${index}`}>
                    <AnchorLink
                      href={menu.path}
                      offset={menu.offset}
                      onClick={handleHandleMenuClose}
                    >
                      {menu.label}
                    </AnchorLink>
                  </li>
                ))
              : data.navLogItems.map((menu, index) => (
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
            <li>{renderDefaultRightBar()}</li>
          </Scrollspy>
        </Container>
      </MobileMenu>
      {/* end of mobile menu */}
    </NavbarWrapper>
  );

  return navbarJsx;
};

export default Navbar;
