import React from 'react';
import Fade from 'react-reveal/Fade';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Container from 'common/src/components/UI/ContainerTwo';
import Image from 'common/src/components/Image';
import Link from 'common/src/components/Link';
import { Section, FooterWidget, FooterBottom, Copyright } from './footer.style';
import { data } from 'common/src/data/app';
import Logo from 'common/src/assets/image/app/logo.png';

const Footer = () => {
  // Find & Add `Help & Follow Us` items into data/app then call on lists below.
  return (
    <Section>
      <Container>
        <FooterBottom>
          <Copyright>
            <a href="/#">
              <Image src={Logo} alt="Rapic.io" />
            </a>
            Copyright &copy; {new Date().getFullYear()}
          </Copyright>
          <FooterWidget>
            <h3>About-1</h3>
            <a href="/#" offset="70" className="widgetListItem">
              Home
            </a>
            <a href="#features" offset="70" className="widgetListItem">
              Features
            </a>
            <a href="#products" offset="70" className="widgetListItem">
              Products
            </a>
          </FooterWidget>
          <FooterWidget>
            <h3>About-2</h3>
            <li>
              <AnchorLink href="/#" offset="70">
                Home
              </AnchorLink>
            </li>
            {data.navItems.map((menu, index) => (
              <li key={`menu_key${index}`}>
                <AnchorLink href={menu.path} offset={menu.offset}>
                  {menu.label}
                </AnchorLink>
              </li>
            ))}
          </FooterWidget>
          <FooterWidget>
            <h3>About-3</h3>
            <li>
              <AnchorLink href="/#" offset="70">
                Home
              </AnchorLink>
            </li>
            {data.navItems.map((menu, index) => (
              <li key={`menu_key${index}`}>
                <AnchorLink href={menu.path} offset={menu.offset}>
                  {menu.label}
                </AnchorLink>
              </li>
            ))}
          </FooterWidget>
        </FooterBottom>
      </Container>
    </Section>
  );
};

export default Footer;
