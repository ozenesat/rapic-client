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
import API from "../../services/api";
import { useActionState, useAppState } from "../../components/AppContext";

const Login = () => {
  const [isLoading, setLoading] = useState(false);
  const [info, setInfo] = useState({
    message: "",
    color: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [disable, setDisable] = useState(false);

  const setGlobalState = useActionState();
  const router = useRouter();

  const handleEmailChange = (mail) => {
    setInfo({ message: "", color: "" });
    setEmail(mail);

    if (!validateEmail(mail) && mail !== "") {
      setEmailError(true);
      setDisable(true);
    } else {
      setEmailError(false);
      setDisable(passError || password === "" || mail === "");
    }
  };

  const handlePass = (pass) => {
    setInfo({ message: "", color: "" });
    setPassword(pass);

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
    e.preventDefault();
    setLoading(true);
    if (email !== "" && password !== "") {
      API.login(email, password)
        .then(async (res) => {
          setGlobalState({
            type: "SET_USER",
            payload: { token: res.access, user: email },
          });
          await router.push("/dashboard");
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message, "err");
          setInfo({
            message: "No active account found with the given credentials",
            color: "red",
          });
          setLoading(false);
        });
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
        <Text
          style={{ color: "red", marginTop: "0.25em" }}
          content={emailError ? "Please enter a valid email address." : ""}
        />
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
        <Text
          style={{ color: "red", marginTop: "0.25em" }}
          content={passError ? "The password is required." : ""}
        />
        <EyeButton></EyeButton>
        <Button
          disabled={disable}
          title="Submit!"
          style={!disable ? { background: "#35BF2E" } : { background: "gray" }}
          onClick={onSubmit}
          type="submit"
        />
        <Text
          style={{ color: info.color, marginTop: "0.25em" }}
          content={info.message}
        />
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
              {showLogin()}
              {isLoading && <Loading />}
            </Subscribe>
          </BannerContent>
        </ContentWrapper>
      </Container>
    </Section>
  );
};

export default Login;
