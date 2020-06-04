import Container from 'common/src/components/UI/ContainerTwo';
import Heading from 'common/src/components/Heading';
import Button from 'common/src/components/Button';
import { Modal, openModal, closeModal } from '@redq/reuse-modal';

import { Card, CardWrapper, HeadingWrapper } from './projects.style';

function Projects() {
  return (
    <Container>
      <HeadingWrapper>
        <Heading as="h1" content="My Projects" />
        <Button title="New Project" onClick={() => openModal({})} />
      </HeadingWrapper>
      <CardWrapper>
        <Card>
          <Heading as="h2" content="Project Example #1" />
          <Heading as="h3" content="Lorem impus description" />
        </Card>
        <Card>
          <Heading as="h2" content="Project Example #2" />
          <Heading as="h3" content="Lorem impus description" />
        </Card>
        <Card>
          <Heading as="h2" content="Project Example #3" />
          <Heading as="h3" content="Lorem impus description" />
        </Card>
        <Card>
          <Heading as="h2" content="Project Example #4" />
          <Heading as="h3" content="Lorem impus description" />
        </Card>
        <Card>
          <Heading as="h2" content="Project Example #4" />
          <Heading as="h3" content="Lorem impus description" />
        </Card>
      </CardWrapper>
    </Container>
  );
}

export default Projects;
