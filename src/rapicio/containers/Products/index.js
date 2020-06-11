import React from 'react';
import Text from 'common/src/components/Text';
// import Button from 'common/src/components/Button';
import Heading from 'common/src/components/Heading';
import Container from 'common/src/components/UI/ContainerTwo';
import Section, { ContentWrapper, BannerContent } from './products.style';

const Products = () => {
  return (
    <Section id="products">
      <Container>
        <ContentWrapper>
          <BannerContent>
            <Heading as="h1" content={'Zero-management backend'} />
            <Text
              className="banner-caption"
              content="Now you can focus on building your app instead of managing servers or worrying about consistency."
            />
            <Heading as="h3" content={'Logic'} />
            <Text content="Transfrom data to fit any schema. You can also make a conditional flow using methods." />
            <Heading as="h3" content={'Data'} />
            <Text content="Insert any data to your database. Simply connect the dots by using the method including GET/POST/DELETE!" />
            <Heading as="h3" content={'Integrations'} />
            <Text content="Build entire workflows are super easy to have Zapier, Stripe, and launching more..." />
          </BannerContent>
        </ContentWrapper>
      </Container>
    </Section>
  );
};

export default Products;
