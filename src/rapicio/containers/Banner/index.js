import React from 'react';
import Text from 'common/src/components/Text';
import Input from 'common/src/components/Input';
import Image from 'common/src/components/Image';
import Button from 'common/src/components/Button';
import Heading from 'common/src/components/Heading';
import Container from 'common/src/components/UI/ContainerTwo';
import Section, {
  ContentWrapper,
  BannerContent,
  Subscribe,
  ImageGroup,
} from './banner.style';

const Banner = () => {
  return (
    <Section id="features">
      <Container>
        <ContentWrapper>
          <BannerContent>
            <Heading
              as="h1"
              content="Develop and run serverless backends"
            />

            <Text
              className="banner-caption"
              content="Now you can focus on building the product 
              with minimum coding than hustling backend structure, data storage, user auth, payment and more..."
            />

            <Subscribe>
              <Input
                inputType="email"
                placeholder="Enter Email Address"
                iconPosition="left"
                aria-label="email"
              />
              <Button title="Get Early Access" style={{background: '#35BF2E'}} type="submit" />
            </Subscribe>
          </BannerContent>
        </ContentWrapper>
      </Container>
    </Section>
  );
};

export default Banner;
