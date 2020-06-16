import React, { Fragment, useState } from "react";
import Text from "common/src/components/Text";
import Input from "common/src/components/Input";
import Image from "common/src/components/Image";
import Button from "common/src/components/Button";
import Heading from "common/src/components/Heading";
import Container from "common/src/components/UI/ContainerTwo";

import { Loading } from "../../components/Loading";
import { EyeButton } from "./login.style";
import Router, { useRouter } from "next/router";
import Section, {
  ContentWrapper,
  BannerContent,
  Subscribe,
  ImageGroup,
} from "./login.style";
import { validateEmail } from "../../utils/utils";
import { validatePassword } from "../../utils/utils";
import Api from "../../services/api";
import { useActionState, useAppState } from "../../components/AppContext";

const Login = () => {
  const [login, setLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [disable, setDisable] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const setGlobalState = useActionState();
  const router = useRouter();

  const handleEmailChange = (mail) => {
    setEmail(mail);
    setSubmitted(false);
    if (!validateEmail(mail) && mail !== "") {
      setEmailError(true);
      setDisable(true);
    } else {
      setEmailError(false);
      if (passError || password === "" || mail === "") {
        setDisable(true);
      } else {
        setDisable(false);
      }
    }
  };

  const handleUser = (user) => {
    setUsername(user);
  };

  const handlePass = (pass) => {
    setPassword(pass);
    setSubmitted(false);
    if (!validatePassword(pass) && pass !== "") {
      setPassError(true);
      setDisable(true);
    } else {
      setPassError(false);
      if (emailError || email === "" || pass === "") {
        setDisable(true);
      } else {
        setDisable(false);
      }
    }
  };

  const onSubmit = (e) => {
    setLogin(true);
    e.preventDefault();
    if (email !== "" && password !== "") {
      Api.login(email, password)
        .then((res) => {
          console.log(res, "res");
          setGlobalState({
            type: "SET_USER",
            payload: { token: res.access, user: email },
          });
          setLogin(false);
          router.push("/dashboard");
        })
        .catch((err) => {
          console.log(err, "err")
          setSubmitted(true)
    })
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
          placeholder="Enter your email address"
          aria-label="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        {emailError ? (
          <Text
            style={{ color: "red", marginTop: "0.25em" }}
            content="Please enter a valid email address."
          />
        ) : (
          <Text
            style={{ color: "transparent", marginTop: "0.25em" }}
            content="."
          />
        )}
        <h3> Password: </h3>
        <Input
          required
          inputType="password"
          placeholder="Enter your password"
          aria-label="password"
          name="password"
          value={password}
          onChange={handlePass}
          passwordShowHide={true}
        />
        {passError ? (
          <Text
            style={{ color: "red", marginTop: "0.25em" }}
            content="The password is required."
          />
        ) : (
          <Text
            style={{ color: "transparent", marginTop: "0.25em" }}
            content="."
          />
        )}
        <EyeButton></EyeButton>
        <Button
          disabled={disable}
          title="Submit!"
          style={!disable ? { background: "#35BF2E" } : { background: "gray" }}
          onClick={onSubmit}
          type="submit"
        />
        {submitted ? (
          <Text
            style={{ color: "red", marginTop: "0.25em" }}
            content="Incorrect username or password."
          />
        ) : (
          <Text
            style={{ color: "transparent", marginTop: "0.25em" }}
            content="."
          />
        )}
        {login ? (
          <Text
            style={{ color: "green", marginTop: "0.25em" }}
            as="h3"
            content="Welcome to the Rapic!"
          />
        ) : (
          <Text
            style={{ color: "transparent", marginTop: "0.25em" }}
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
                <>
                  {showLogin()}
                  <Loading />
                </>
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
