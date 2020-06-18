import React, { Fragment, useState } from "react";
import Text from "common/src/components/Text";
import Input from "common/src/components/Input";
import Image from "common/src/components/Image";
import Button from "common/src/components/Button";
import Heading from "common/src/components/Heading";
import Container from "common/src/components/UI/ContainerTwo";
import { Loading } from "components/Loading";
import Router, { useRouter } from "next/router";
import Section, {
  ContentWrapper,
  BannerContent,
  EyeButton,
  Subscribe,
  ImageGroup,
} from "./signUp.style";
import { validateEmail, validatePassword } from "utils/utils";
import API from "services/api";
import { useActionState, useAppState } from "components/AppContext";

const SignUp = () => {
  const [isLoading, setLoading] = useState(false);
  const [info, setInfo] = useState({
    message: "",
    color: "",
  });
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
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
      setDisable(passError || password === "" || mail === "" || username === "" || password !== passwordConfirmation);
    }
  };

  const handleUser = user => {
    setUsername(user);
    setDisable(emailError || email === "" || passError || password === "" || user === "" || password !== passwordConfirmation);
  };  

  const handlePass = (pass) => {
    setInfo({ message: "", color: "" });
    setPassword(pass);

    if (!validatePassword(pass) && pass !== "") {
      setPassError(true);
      setDisable(true);
    } else {
      setPassError(false);
      if (emailError || email === "" || pass === "" || username === "" || pass !== passwordConfirmation) {
        setDisable(true);
      } else {
        setDisable(false);
      }
    }
  };

  const handleConfirmation = confirmation => {
    setPasswordConfirmation(confirmation);
    setDisable(emailError || email === "" || passError || password === "" || username === "" || password !== confirmation);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      setLoading(true);
      API.register(username, email, password)
        .then(async (res) => {
          setInfo({
            message: "Welcome to Rapic!",
            color: "#35BF2E",
          });
          setGlobalState({
            type: "SET_USER",
            payload: { token: res.access, user: email },
          });

          setLoading(false);
          router.push("/dashboard");
        })
        .catch((err) => {
          console.log(err.message, "err");
          setInfo({
            message: "A user with these credentials already exists.",
            color: "red",
          });
          setLoading(false);
        });
    }
  };

  var showForm = () => {
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
        <h3> Username: </h3>
        <Input
          autoFocus
          required
          inputType="text"
          placeholder="Enter your username"
          aria-label="username"
          name="username"
          value={username}
          onChange={handleUser}
        />
        <Text
          style={{ color: "red", marginTop: "0.25em" }}
          content={(!emailError && !passError && password !== "" && passwordConfirmation === password && username === "") ? (
            "An unique username is required.") : ""}
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
          content={passError ? "An 8 digit password is required." : ""}
        />
        <EyeButton></EyeButton>
        <h3> Password Confirmation: </h3>
        <Input
          required
          inputType="password"
          placeholder="Confirm your password"
          aria-label="passwordConfirmation"
          name="passwordConfirmation"
          value={passwordConfirmation}
          onChange={handleConfirmation}
          passwordShowHide={true}
        />
        <Text
          style={{ color: "red", marginTop: "0.25em" }}
          content={(password !== passwordConfirmation && passwordConfirmation.length > 0) ? "Passwords are not same." : ""}
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
          as="h3"
          style={{ color: info.color, marginTop: "0.5em" }}
          content={info.message}
        />
      </Fragment>
    );
  };

  return (
    <Section id="signup">
      <Container>
        <ContentWrapper>
          <BannerContent>
            <h1> Sign Up </h1>
            <Subscribe>
              {showForm()}
              {isLoading && <Loading />}
            </Subscribe>
          </BannerContent>
        </ContentWrapper>
      </Container>
    </Section>
  );
};

export default SignUp;
