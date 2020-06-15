import React, { Fragment, useState } from 'react';
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
import { validateEmail } from '../../utils/utils';
import Api from '../../services/api';
import { useAppState } from "../../components/AppContext";

const Banner = () => {
  const [registered, setRegistered] = useState(false);
  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState({ email: false });
  const globalState = useAppState();
  console.log(globalState, 'GS')
  const handleEmailChange = event => {
    setEmail(String(event));
    if (!validateEmail(event) && event !== '') {
      setValidationError({ email: true });
    } else {
      setValidationError({ email: false });
    }
  };

  const onSubmit = () => {
    if (email !== '') {
      Api.register(email, email, Date.now(), true)
        .then(result => {
          setRegistered(true);
        })
        .catch(response => {
          console.log('failed to register');
        });
      setRegistered(true);
    }
  };

  var showRegister = () => {
    return (
      <Fragment>
        <Input
          inputType="email"
          placeholder="Enter Email Address"
          iconPosition="left"
          aria-label="email"
          value={String(email)}
          onChange={handleEmailChange}
        />
        <Button
          disabled={validationError.email}
          title="Get Early Access"
          style={!validationError.email ? { background: '#35BF2E' } : {}}
          onClick={onSubmit}
          type="submit"
        />
      </Fragment>
    );
  };

  return (
    <Section id="#">
      <br/>
      <Container>
        <ContentWrapper>
          <BannerContent>
            <Heading
              as="h1"
              content={
                'Ship and Scale your API 10x faster without touching any server or database'
              }
            />
            <Text
              className="banner-caption"
              content="Rapic gives you API endpoints that can store data and run codeletes all together by rest calls. With ready to use user authentication, lots of integration, and easy to plug client libraries..."
            />
            <Subscribe>
              {registered ? (
                <Text
                  className="banner-thanks"
                  content={`Thank you! We will notify you on ${email}.`}
                />
              ) : (
                showRegister()
              )}
            </Subscribe>
          </BannerContent>
        </ContentWrapper>
      </Container>
    </Section>
  );
};

export default Banner;
