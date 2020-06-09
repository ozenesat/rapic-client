import Container from 'common/src/components/UI/ContainerTwo';
import Heading from 'common/src/components/Heading';
import Button from 'common/src/components/Button';

import ProjectModal from '../ProjectModal';
import { Card, CardWrapper, HeadingWrapper } from './projects.style';

function Projects() {
  const [isModalOpen, setIsOpen] = React.useState(false);
  const [projects] = React.useState([]);

  function createProject(name, description) {
    const project = { name, description, objectCount: 0 };
    projects.push(project);
    closeModal();
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Container innerHeight="100%">
      <HeadingWrapper>
        <Heading as="h1" content="My Projects" />
        <Button title="New Project" onClick={() => openModal()} />
      </HeadingWrapper>
      <CardWrapper>
        {projects.map(({ name, description, objectsCount }) => (
          <Card>
            <Heading as="h2" content={name} />
            <Heading as="h3" content={description} />
            <Heading as="h3" content={`${objectsCount} objects`} />
          </Card>
        ))}
      </CardWrapper>
      <ProjectModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        createProject={createProject}
      />
    </Container>
  );
}

export default Projects;
