import Modal from 'react-modal';
import Heading from 'common/src/components/Heading';
import Input from 'common/src/components/Input';
import Button from 'common/src/components/Button';

import {
  Title,
  Content,
  Section,
  ButtonWrapper,
  ModalStyles,
} from './projectmodal.style';

function ProjectModal({ isModalOpen, closeModal, createProject }) {
  const [name, onChangeName] = React.useState('');
  const [description, onChangeDescription] = React.useState('');

  function checkInputs() {
    if (!name || !description) {
      alert('Please fill all field.');
    } else {
      createProject(name, description);
    }
  }

  return (
    <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={ModalStyles}>
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
          <Button title="Cancel" id="cancel" onClick={closeModal} />
        </ButtonWrapper>
      </Content>
    </Modal>
  );
}

export default ProjectModal;
