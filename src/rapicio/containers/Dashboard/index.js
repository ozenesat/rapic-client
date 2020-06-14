import React, { useState, useEffect, useContext } from "react";
import Container from "common/src/components/UI/ContainerTwo";
import Heading from "common/src/components/Heading";
import Button from "common/src/components/Button";
import API from "../../services/api";
import Router from "next/router";
import ProjectModal from "../ProjectModal";
import { Card, CardWrapper, HeadingWrapper } from "./projects.style";
import { useAppState } from "../../components/AppContext";
import Link from "next/link";

function Dashboard() {
  const [isModalOpen, setModalState] = useState(false);

  const globalState = useAppState();

  function renderProjects() {
    return globalState.projects && globalState.projects.map(({ name, description, id }) => (
      <Link href="/projects/[id]" as={`/projects/${id}`}>
        <Card>
          <Heading as="h2" content={name} />
          <Heading as="h3" content={description} />
          <Heading as="h3" content={`${0} objects`} />
        </Card>
      </Link>
    ));
  }

  return (
    <Container>
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
