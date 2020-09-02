import { useState } from "react";
import Modal from "react-modal";
import { useRouter } from "next/router";
import Heading from "common/src/components/Heading";

import {
  Container,
  Content,
  ButtonWrapper,
} from "pagestyles/projects/endpoints/add/add.style";
import { Title, Section } from "containers/ProjectModal/projectmodal.style";
import Input from "common/src/components/Input";
import Button from "common/src/components/Button";
import { Loading } from "components/Loading";
import MessageBox from "containers/MessageBox";
import { ModalStyles } from "containers/ProjectModal/projectmodal.style";

import { getSessionCookie } from "utils/utils";
import API from "services/api";
import { useActionState } from "components/AppContext";
function EndpointAddModal({ isModalOpen, closeModal, project }) {
  const router = useRouter();
  const { id } = router.query;
  const [name, onChangeName] = useState("");
  const [description, onChangeDescription] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const { username } = getSessionCookie(null);
  const setGlobalState = useActionState();

  function resetModalState() {
    onChangeDescription("");
    onChangeName("");
    setLoading(false);
    setMessage({ text: "", type: "" })
    closeModal();
  }

  function createEndpoint() {
    if (/[~`!@#$%\^& *+=\-\[\]\\';,./{}()|\\":<>\?]/.test(name)){
      setLoading(false);
        setMessage({
          text: "Endpoint cannot contain any special character or space.",
          type: "error",
        });
    } else if (!description){
      setLoading(false);
        setMessage({
          text: "Description cannot be empty.",
          type: "error",
        });
    } else {
    setLoading(true);
    let enpoint = {
      app: id * 1,
      model_name: name.toLowerCase(),
      description,
    };
    API.createRapicEndpoint(null, enpoint)
      .then((response) => {
        project.rapic_models.push(response);
        setGlobalState({ type: "UPDATE_PROJECT", payload: project });
        router.push(
          "/projects/[id]/endpoints/[endpoint]",
          `/projects/${id}/endpoints/${response.model_name}`
        );
        resetModalState();
      })
      .catch((err) => {
        setLoading(false);
        setMessage({
          text: err,
          type: "error",
        });
      });
    }
  }

  function onCloseModal () {
    resetModalState()
    closeModal
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={ModalStyles}
      ariaHideApp={false}
    >
      <Container>
        <Heading as="h2" content="Add a new endpoint" />
        <Content>
          <Section>
            <Title>API Endpoint Name</Title>
            <Input
              required
              inputType="text"
              placeholder="Enter your endpoint name"
              name="endpoint-name"
              value={name}
              onChange={onChangeName}
              className="endpoint-name"
            />
          </Section>
          <Section>
            <Title>Description</Title>
            <Input
              required
              inputType="textarea"
              placeholder="Describe your endpoint"
              name="endpoint-description"
              value={description}
              onChange={onChangeDescription}
              className="endpoint-description"
            />
          </Section>
          <ButtonWrapper>
            <Button title="Create Endpoint" id="create" onClick={createEndpoint} />
            <Button title="Cancel" id="cancel" onClick={onCloseModal} />
          </ButtonWrapper>
          <MessageBox message={message.text} type={message.type} />
          {isLoading && <Loading />}
        </Content>
      </Container>
    </Modal>
  );
}

export default EndpointAddModal;
