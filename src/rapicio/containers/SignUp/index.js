import React, { Fragment, useState } from 'react';
import Text from 'common/src/components/Text';
import Input from 'common/src/components/Input';
import Image from 'common/src/components/Image';
import Button from 'common/src/components/Button';
import Heading from 'common/src/components/Heading';
import Container from 'common/src/components/UI/ContainerTwo';
import { EyeButton } from './signUp.style';
import Router from 'next/router';
import Section, {
  ContentWrapper,
  BannerContent,
  Subscribe,
  ImageGroup,
} from './signUp.style';
import { validateEmail } from '../../utils/utils';
import Api from '../../services/api';

const SignUp = () => {
  /* when related page is ready remove registered parts and push the page into the related one. */
  const [registered, setRegistered] = useState(false);
  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState({ email: false });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleEmailChange = event => {
    setEmail(event);
    if (!validateEmail(event) && event !== '') {
      setValidationError({ email: true });
    } else {
      setValidationError({ email: false });
    }
  };

  const handleUser = event => {
    setUsername(event);
  };

  const handlePass = event => {
    setPassword(event);
  };

  const handleConfirmation = event => {
    setPasswordConfirmation(event);
  };

  const onSubmit = () => {
    if (email !== '' && password !== '') {
      Api.register(username, password)
        .then(() => Router.replace('/#')) // bu calismiyor
        .catch(response => {
          console.log('failed to login');
        });
      setRegistered(true);
    }
  };

  var showRegister = () => {
    return (
      <Fragment>
        <h3> E-mail: </h3>
        <Input
          inputType="email"
          placeholder="Enter Email Address"
          aria-label="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <h3> User Name: </h3>
        <Input
          inputType="text"
          placeholder="Enter User Name"
          iconPosition="left"
          aria-label="username"
          name="username"
          value={username}
          onChange={handleUser}
        />
        <h3> Password: </h3>
        <Input
          required
          inputType="password"
          placeholder="Enter Password"
          aria-label="password"
          name="password"
          value={password}
          onChange={handlePass}
          passwordShowHide={password}
        />
        <EyeButton></EyeButton>
        <h3> Confirmation: </h3>
        <Input
          required
          inputType="password"
          placeholder="Re-enter Password"
          aria-label="password"
          name="password"
          value={passwordConfirmation}
          onChange={handleConfirmation}
          passwordShowHide={password}
        />
        <EyeButton></EyeButton>
        <Button
          disabled={validationError.email}
          title="Submit!"
          style={!validationError.email ? { background: '#35BF2E' } : {}}
          onClick={onSubmit}
          type="submit"
        />
      </Fragment>
    );
  };

  return (
    <Section id="signup">
      <Container>
        <ContentWrapper>
          <BannerContent>
            <h1> Sign-Up! </h1>
            <Subscribe>
              {registered ? (
                <Text
                  className="banner-thanks"
                  content={`${email}, Welcome to the Rapic!`}
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

export default SignUp;
