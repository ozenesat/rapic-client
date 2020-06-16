import React from 'react';
import Fade from 'react-reveal/Fade';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Container from 'common/src/components/UI/ContainerTwo';
import Image from 'common/src/components/Image';
import Link from 'common/src/components/Link';
import { Section, FooterWidget, FooterBottom, Copyright, FooterNav } from './footer.style';
import { data } from 'common/src/data/app';
import Logo from 'common/src/assets/image/app/footer_logo.png';

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
          {/*<FooterWidget>
            <h3>About</h3>
            {data.footerItems.first.map((menu, index) => (
              <li key={`menu_key${index}`}>
                <AnchorLink href={menu.path} offset={menu.offset}>
                  {menu.label}
                </AnchorLink>
              </li>
            ))}
          </FooterWidget>
          <FooterWidget>
            <h3>Help-2</h3>
            {data.footerItems.second.map((menu, index) => (
              <li key={`menu_key${index}`}>
                <AnchorLink href={menu.path} offset={menu.offset}>
                  {menu.label}
                </AnchorLink>
              </li>
            ))}
          </FooterWidget>*/}
          <FooterNav>
            {data.footerItems.third.map((menu) => (
              <li key={`menu_key${menu.id}`}>
                <Link  href={menu.path} style={{ color: '#475B5B', padding: '.25em'}} target="_blank" offset={menu.offset}>
                  <i className={menu.icon}/>
                </Link>
              </li>
            ))}
          </FooterNav>
        </FooterBottom>
      </Container>
    </Section>
  );
};

export default Footer;
