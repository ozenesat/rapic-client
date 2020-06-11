import React, { Fragment, useState } from 'react';
import Text from 'common/src/components/Text';
import Input from 'common/src/components/Input';
import Image from 'common/src/components/Image';
import Button from 'common/src/components/Button';
import Heading from 'common/src/components/Heading';
import Container from 'common/src/components/UI/ContainerTwo';
import loading from 'common/src/assets/image/loading.gif';
import { EyeButton } from './login.style';
import Router, { useRouter } from 'next/router';
import Section, {
  ContentWrapper,
  BannerContent,
  Subscribe,
  ImageGroup,
} from './login.style';
import { validateEmail } from '../../utils/utils';
import { validatePassword } from '../../utils/utils';
import Api from '../../services/api';

const Login = () => {
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [disable, setDisable] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleEmailChange = event => {
    setEmail(event);
    setSubmitted(false);
    if (!validateEmail(event) && email.length !== 0) {
      setEmailError(true);
      setDisable(true);
    } else {
      setEmailError(false);
      if (passError || password.length < 8 || email.length === 0) {
        setDisable(true);
      } else {
        setDisable(false);
      }
    }
  };

  const handleUser = event => {
    setUsername(event);
  };

  const handlePass = event => {
    setPassword(event);
    setSubmitted(false);
    if (!validatePassword(event) && password.length !== 0) {
      setPassError(true);
      setDisable(true);
    } else {
      setPassError(false);
      if (emailError || email.length === 0 || password.length === 0) {
        setDisable(true);
      } else {
        setDisable(false);
      }
    }
  };
  const router = useRouter();
  const onSubmit = e => {
    e.preventDefault();
    if (email !== '' && password !== '') {
      Api.login(email, password);
      // Globalden user veya accesstoken cekilebilir
      if (document.cookie) {
        setLogin(true);
        // hazir olunca path'i update et!
        router.push('/#');
      } else {
        setLogin(false);
        setSubmitted(true);
      }
    }
  };

  var showLogin = () => {
    return (
      <Fragment>
        <h3> E-mail: </h3>
        <Input
          autoFocus
          required
          inputType="email"
          placeholder="Enter Email Address"
          aria-label="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
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
          passwordShowHide={true}
        />
        {disable ? (
          <Text
            style={{ color: 'red', marginTop: '0.25em' }}
            content="Designated password is required."
          />
        ) : (
          <Text
            style={{ color: 'transparent', marginTop: '0.25em' }}
            content="."
          />
        )}
        <EyeButton></EyeButton>
        <Button
          disabled={disable}
          title="Submit!"
          style={!disable ? { background: '#35BF2E' } : { background: 'gray' }}
          onClick={onSubmit}
          type="submit"
        />
        {submitted ? (
          <Text
            style={{ color: 'red', marginTop: '0.25em' }}
            content="Incorrect username or password."
          />
        ) : (
          <Text
            style={{ color: 'transparent', marginTop: '0.25em' }}
            content="."
          />
        )}
      </Fragment>
    );
  };

  /*<h3> User Name: </h3>
  <Input
    inputType="text"
    placeholder="Enter User Name"
    iconPosition="left"
    aria-label="username"
    name="username"
    value={username}
    onChange={handleUser}
  />*/

  return (
    <Section id="login">
      <Container>
        <ContentWrapper>
          <BannerContent>
            <h1> Login </h1>
            <Subscribe>
              {login ? (
                <Fragment>
                  <Text
                    className="banner-thanks"
                    content={`${email}, Welcome to the Rapic!`}
                  />
                  <img src={loading} alt="loading..." />
                </Fragment>
              ) : (
                showLogin()
              )}
            </Subscribe>
          </BannerContent>
        </ContentWrapper>
      </Container>
    </Section>
  );
};

export default Login;
