import React, { useState, useEffect } from "react";
import Projects from "../../../containers/Projects";
import {
  Title,
  Content,
  Section,
  ButtonWrapper,
} from "./../../../containers/ProjectModal/projectmodal.style";
import { Container, DangerZoneWrapper, Line } from "../../../pagestyles/projects/project.style";
import API from "../../../services/api";
import Heading from "common/src/components/Heading";
import Input from "common/src/components/Input";
import Button from "common/src/components/Button";
import { useAppState } from "../../../components/AppContext";
import { useRouter } from "next/router";
import { route } from "next/dist/next-server/server/router";

const ProjectPage = ({ project }) => {
  console.log({ project });
  const router = useRouter();
  const { id } = router.query;
  const [name, onChangeName] = useState("");
  const [description, onChangeDescription] = useState("");
  const globalState = useAppState();

  useEffect(() => {
    if (project) {
      onChangeDescription(project.description);
      onChangeName(project.name);
    }
  }, []);

  return (
    <Projects endpoints={project.endpoints}>
      <Container>
        <Heading as="h2" content="Projects Settings" />
        <Content>
          <Section>
            <Title>Project Name</Title>
            <Input
              required
              inputType="text"
              placeholder="Enter your project name"
              name="project-name"
              value={String(name)}
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
              name="project-description"
              value={String(description)}
              onChange={onChangeDescription}
              className="project-description"
            />
          </Section>
          <ButtonWrapper>
            <Button
              title="Save Changes"
              id="save"
              onClick={() => checkInputs()}
            />
          </ButtonWrapper>
          <DangerZoneWrapper>
            <Line />
            <Heading as="h2" content="Danger Zone" />
            <Title>
              Deleting a project will make its API unavaiable immediately. This
              action cannot be undone.
            </Title>
            <Button
              title="Delete Project"
              id="delete"
              onClick={() => checkInputs()}
            />
          </DangerZoneWrapper>
        </Content>
      </Container>
    </Projects>
  );
};

export async function getStaticPaths() {
  const projects = await API.getRapicProjects();
  const paths = projects.map((project) => ({
    params: { id: `${project.id}` },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const project = {
    id: 104,
    name: "Deneme",
    description: "deneme project",
    auth_method: "undefined",
    endpoints: [
      {
        id: 1,
        name: "getproject",
        description: "return all projects",
        fields: [{ id: 1, name: "id", fieldtype: 1 }],
      },
    ],
  };
  return { props: { project } };
}

export default ProjectPage;
