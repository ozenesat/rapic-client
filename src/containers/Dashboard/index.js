import React, { useState, useEffect, useContext } from "react";
import Container from "common/src/components/UI/ContainerTwo";
import Heading from "common/src/components/Heading";
import Button from "common/src/components/Button";
import ProjectModal from "../ProjectModal";
import { Card, CardWrapper, HeadingWrapper } from "./projects.style";
import { useAppState } from "../../components/AppContext";
import Link from "next/link";

function Dashboard() {
  const [isModalOpen, setModalState] = useState(false);
  const globalState = useAppState();

  function renderProjects() {
    if (globalState.projects.length < 1) {
      return <div>There is no projects...</div>;
    }
    return globalState.projects.map(
      ({ name, description, id, rapic_models }) => (
        <Link href="/projects/[id]" as={`/projects/${id}`}>
          <Card>
            <Heading as="h2" content={name} />
            <Heading as="h3" content={description} />
            <Heading as="h3" content={`${rapic_models.length} endpoints`} />
          </Card>
        </Link>
      )
    );
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
