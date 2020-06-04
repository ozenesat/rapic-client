import React, { Fragment, useState } from 'react';
import Text from 'common/src/components/Text';
import Input from 'common/src/components/Input';
import Image from 'common/src/components/Image';
import Button from 'common/src/components/Button';
import Heading from 'common/src/components/Heading';
import Container from 'common/src/components/UI/ContainerTwo';
import Router from 'next/router';
import Section, {
  ContentWrapper,
  BannerContent,
  Subscribe,
  ImageGroup,
} from './login.style';
import { validateEmail } from '../../utils/utils';
import Api from '../../services/api';

const Login = () => {
  const [registered, setRegistered] = useState(false);
  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState({ email: false });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

  const onSubmit = () => {
    if (email !== '' && password !== '') {
      Api.login(username, password)
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
          iconPosition="left"
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
          type="password" // password'u gizlemiyor
          placeholder="Enter Password"
          iconPosition="left"
          aria-label="password"
          name="password"
          value={password}
          onChange={handlePass}
        />
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
    <Section id="login">
      <Container>
        <ContentWrapper>
          <BannerContent>
            <h1> Login </h1>
            <Subscribe>
              {registered ? (
                <Text
                  className="banner-thanks"
                  content={`Welcome ${email}, to the Rapic!`}
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

export default Login;
