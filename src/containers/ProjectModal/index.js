import { useContext } from "react";
import Modal from "react-modal";
import Heading from "common/src/components/Heading";
import Input from "common/src/components/Input";
import Button from "common/src/components/Button";
import { useActionState } from "../../components/AppContext";
import API from "../../services/api";
import { Loading } from "../../components/Loading";
import {
  Title,
  Content,
  Section,
  ButtonWrapper,
  ModalStyles,
} from "./projectmodal.style";

function ProjectModal({ isModalOpen, closeModal }) {
  const [name, onChangeName] = React.useState("");
  const [description, onChangeDescription] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  const setGlobalState = useActionState();

  function checkInputs() {
    if (!name || !description) {
      alert("Please fill all field.");
    } else {
      createProject(name, description);
    }
  }

  function createProject(name, description) {
    setLoading(true);
    API.createProject({
      name,
      description,
      auth_method: "undefined",
      rapic_models: [],
    })
      .then((project) => {
        setLoading(false);
        setGlobalState({ type: "ADD_PROJECTS", payload: [project] });
        handleCloseModal();
      })
      .catch((err) => {
        setLoading(false);
        alert(err);
      });
  }

  function handleCloseModal() {
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
      <Heading as="h2" content="Add a new projects" />
      <Content>
        <Section>
          <Title>Project Name</Title>
          <Input
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
      </Content>
    </Modal>
  );
}

export default ProjectModal;