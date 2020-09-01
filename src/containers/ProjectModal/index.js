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
} from "./projectmodal.style";

import MessageBox from "../MessageBox";

function ProjectModal({ isModalOpen, closeModal }) {
  const [name, onChangeName] = useState("");
  const [description, onChangeDescription] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setGlobalState = useActionState();
  const globalState = useAppState();

  function checkInputs() {
    if (!description) {
      setError("Please type a description.")
    } else if (!name) {
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
      <Heading as="h2" content="Add a new project" />
      <Content>
        <Section>
          <Title>Project Name</Title>
          <Input
            disabled
            required
            inputType="text"
            placeholder="Enter your project name"
            iconPosition="left"
            aria-label="project-name"
            name="project-name"
            value={name}
            onChange={onChangeName}
            className="project-name"
          />
        </Section>
        <Section>
          <Title>Description</Title>
          <Input
            required
            inputType="textarea"
            placeholder="Describe your project"
            iconPosition="left"
            aria-label="project-description"
            name="project-description"
            value={description}
            onChange={onChangeDescription}
            className="project-description"
          />
        </Section>
        <ButtonWrapper>
          <Button
            title="Create Project"
            id="create-project"
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

export default ProjectModal;
