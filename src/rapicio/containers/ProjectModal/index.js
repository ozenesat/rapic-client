import Modal from 'react-modal';
import Heading from 'common/src/components/Heading';
import Input from 'common/src/components/Input';
import Button from 'common/src/components/Button';

import { Title, Content, Section, ButtonWrapper } from './projectmodal.style';

const customStyles = {
  content: {
    top: '25%',
    left: '35%',
    right: '35%',
    bottom: '25%',
  },
};

function ProjectModal({ isModalOpen, closeModal, createProject }) {
  const [name, onChangeName] = React.useState('');
  const [description, onChangeDescription] = React.useState('');

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
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
            onClick={() => createProject(name, description)}
          />
          <Button title="Cancel" id="cancel" onClick={closeModal} />
        </ButtonWrapper>
      </Content>
    </Modal>
  );
}

export default ProjectModal;
