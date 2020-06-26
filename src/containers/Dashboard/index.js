import React, { useState, useEffect } from "react";
import Link from "next/link";

import Container from "common/src/components/UI/ContainerTwo";
import Heading from "common/src/components/Heading";
import Button from "common/src/components/Button";
import ProjectModal from "containers/ProjectModal";

import { Card, CardWrapper, HeadingWrapper } from "./projects.style";
import { useAppState } from "components/AppContext";
import { splitText } from "utils/utils";

function Dashboard() {
  const [isModalOpen, setModalState] = useState(false);
  const globalState = useAppState();

  function renderProjects() {
    const { projects } = globalState;
    if (projects == null || globalState.projects.length < 1) {
      return <div>There are no projects....</div>;
    }
    return projects.map(({ name, description, id, rapic_models }) => (
      <Link href="/projects/[id]" as={`/projects/${id}`}>
        <Card key={`card-${id}`}>
          <Heading as="h2" content={splitText(name, 15)} />
          <Heading as="h3" content={splitText(description, 15)} />
          <Heading as="h3" content={`${rapic_models.length} endpoints`} />
        </Card>
      </Link>
    ));
  }

  return (
    <Container id="dashboard">
      <HeadingWrapper>
        <Heading as="h1" content="My Projects" />
        <Button title="New Project" onClick={() => setModalState(true)} />
      </HeadingWrapper>
      <CardWrapper>{renderProjects()}</CardWrapper>
      <ProjectModal
        isModalOpen={isModalOpen}
        closeModal={() => setModalState(false)}
      />
    </Container>
  );
}

export default Dashboard;
