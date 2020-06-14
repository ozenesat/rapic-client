import React from 'react';
import Text from 'common/src/components/Text';
// import Button from 'common/src/components/Button';
import Heading from 'common/src/components/Heading';
import Container from 'common/src/components/UI/ContainerTwo';
import Section, { ContentWrapper, BannerContent } from './products.style';
import { data } from 'common/src/data/app';

const Products = () => {
  return (
    <Section id="product">
      <Container>
        <ContentWrapper>
          <BannerContent>
            <Heading as="h1" content={'Zero-management backend'} />
            <Text
              className="banner-caption"
              content="Now you can focus on building your app instead of managing servers or worrying about consistency."
            />
            <div className="banner-content">
              {data.products.map(product => (
                <>
                  <Heading as="h3" content={product.title} />
                  <Text content={product.desc} />
                </>
              ))}
            </div>
          </BannerContent>
        </ContentWrapper>
      </Container>
    </Section>
  );
};

export default Products;
