import React from 'react';
import Fade from 'react-reveal/Fade';

import Container from 'common/src/components/UI/ContainerTwo';
import Image from 'common/src/components/Image';
import Link from 'common/src/components/Link';
import {
  Section,
  FooterWidget,
  FooterBottom,
  Copyright,
} from './footer.style';
import { data } from 'common/src/data/app';
import Logo from 'common/src/assets/image/app/logo.png';

const Footer = () => {
  return (
    <Section>
      <Container>
        <FooterBottom>
          <Copyright>
            <Image src={Logo} alt="Rapic.io" />
            Copyright &copy; {new Date().getFullYear()}
          </Copyright>
        </FooterBottom>
      </Container>
    </Section>
  );
};

export default Footer;
