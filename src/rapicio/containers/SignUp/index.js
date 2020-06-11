import React, { Fragment, useState } from 'react';
import Text from 'common/src/components/Text';
import Input from 'common/src/components/Input';
import Image from 'common/src/components/Image';
import Button from 'common/src/components/Button';
import Heading from 'common/src/components/Heading';
import Container from 'common/src/components/UI/ContainerTwo';
import loading from 'common/src/assets/image/loading.gif';
import { EyeButton } from './signUp.style';
import Router, { useRouter } from 'next/router';
import Section, {
  ContentWrapper,
  BannerContent,
  Subscribe,
  ImageGroup,
} from './signUp.style';
import { validateEmail } from '../../utils/utils';
import { validatePassword } from '../../utils/utils';
import Api from '../../services/api';

const SignUp = () => {
  /* when related page is ready remove registered parts and push the page into the related one. */
  const [registered, setRegistered] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [disable, setDisable] = useState(false);

  const handleEmailChange = mail => {
    setEmail(mail);
    setSubmitted(false);
    if (!validateEmail(mail) && mail !== '') {
      setEmailError(true);
      setDisable(true);
    } else {
      setEmailError(false);
      if (passError || password === '' || mail === '') {
        setDisable(true);
      } else {
        setDisable(false);
      }
    }
  };

  const handleUser = user => {
    setUsername(user);
  };

  const handlePass = pass => {
    setPassword(pass);
    setSubmitted(false);
    if (!validatePassword(pass) && pass !== '') {
      setPassError(true);
      setDisable(true);
    } else {
      setPassError(false);
      if (emailError || email === '' || pass === '') {
        setDisable(true);
      } else {
        setDisable(false);
      }
    }
  };

  const handleConfirmation = confirmation => {
    setPasswordConfirmation(confirmation);
  };
  const router = useRouter();
  const onSubmit = e => {
    e.preventDefault();
    if (email !== '' && password !== '') {
      // notice that passwordConfirmation is not required by back-end yet!
      Api.register(username, email, password, passwordConfirmation);
      if (document.cookie) {
        setRegistered(true);
        // hazir olunca path'i update et!
        router.push('/#');
      } else {
        setRegistered(false);
        setSubmitted(true);
      }
    }
  };
  // const onController = () => {
  //   if (password !== '') {
  //     if (validationError.password) {
  //       setController(true);
  //     } else {
  //       setController(false);
  //     }
  //   } else {
  //     if (email === '') {
  //       setController(false);
  //     } else if (validationError.email) {
  //       setController(true);
  //     }
  //   }
  // };
  // console.log(controller, 'cnt', validationError.password, 'pass');
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
          passwordShowHide={true}
        />
        {password.length > 0 && password.length < 8 ? (
          <Text
            style={{ color: 'red', marginTop: '0.25em' }}
            content="Use at least 8 or more characters."
          />
        ) : (
          ''
        )}
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
          passwordShowHide={true}
        />
        <EyeButton></EyeButton>
        {password === passwordConfirmation ||
        passwordConfirmation.length === 0 ? (
          <Text
            style={{ color: 'transparent', marginTop: '0.25em' }}
            content="."
          />
        ) : (
          <Text
            style={{ color: 'red', marginTop: '0.25em' }}
            content="Passwords did not match."
          />
        )}
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
            content="A user with these credentials already exists."
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

  return (
    <Section id="signup">
      <Container>
        <ContentWrapper>
          <BannerContent>
            <h1> Sign-Up! </h1>
            <Subscribe>
              {registered ? (
                <Fragment>
                  <Text
                    className="banner-thanks"
                    content={`${email}, Welcome to the Rapic!`}
                  />
                  <img src={loading} alt="loading..." />
                </Fragment>
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
