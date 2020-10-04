import { useContext, useState } from "react";
import Modal from "react-modal";
import Heading from "common/src/components/Heading";
import Input from "common/src/components/Input";
import Button from "common/src/components/Button";

import { useActionState, useAppState } from "components/AppContext";
import API from "services/api";
import { Loading } from "components/Loading";
import {
  Title,
  Content,
  Section,
  ButtonWrapper,
  ModalStyles,
} from "./adduser.style";

import MessageBox from "../MessageBox";

function AddUserModal({ isModalOpen, closeModal }) {
  const [name, onChangeName] = useState("");
  const [description, onChangeDescription] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setGlobalState = useActionState();
  const globalState = useAppState();

  function checkInputs() {
    if (!name) {
      setError("Please type a project name.");
    } else {
      const index = globalState.projects.findIndex((item) => item.name == name);
      if (index > -1) {
        setError("Project name must be a unique set.");
      } else {
        createProject(name, description);
      }
    }
  }

  function createProject(name, description) {
    setLoading(true);
    API.createProject({
      name,
      description,
    })
      .then((project) => {
        setLoading(false);
        setGlobalState({ type: "ADD_NEW_PROJECT", payload: project });
        handleCloseModal();
      })
      .catch((err) => {
        setLoading(false);
        alert(err);
      });
  }

  function handleCloseModal() {
    setError("");
    onChangeName("");
    onChangeDescription("");
    closeModal();
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={ModalStyles}
      ariaHideApp={false}
    >
      <Heading as="h2" content="Add a new user" />
      <Content>
        <Section>
          <Title>Email</Title>
          <Input
            required
            inputType="text"
            placeholder="Type an email adress"
            value={name}
            onChange={onChangeName}
            className="email"
          />
        </Section>
        <Section>
          <Title>Password</Title>
          <Input
            required
            inputType="password"
            placeholder="Type a password"
            value={description}
            onChange={onChangeDescription}
            className="password"
          />
        </Section>
        <ButtonWrapper>
          <Button
            title="Create User"
            id="create-user"
            onClick={() => checkInputs()}
          />
          <Button title="Cancel" id="cancel" onClick={handleCloseModal} />
        </ButtonWrapper>
        {isLoading && <Loading />}
        <MessageBox message={error} type="error" />
      </Content>
    </Modal>
  );
}

export default AddUserModal;
