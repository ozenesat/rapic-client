import React, { useState, useEffect } from "react";
import Projects from "containers/Projects";
import {
  Title,
  Content,
  Section,
  ButtonWrapper,
} from "containers/ProjectModal/projectmodal.style";
import {
  Container,
  DangerZoneWrapper,
  Line,
  HeaderWrapping,
} from "pagestyles/projects/project.style";
import API from "services/api";
import Heading from "common/src/components/Heading";
import Input from "common/src/components/Input";
import Button from "common/src/components/Button";
import { useAppState } from "components/AppContext";
import Router, { useRouter } from "next/router";
import { Loading } from "components/Loading";
import Error from "pages/_error";
import MessageBox from "containers/MessageBox";
import AccessLevel from "containers/AccessLevel";
import { withAuth } from "../../../components/withAuth";

const ProjectPage = ({ project }) => {
  const router = useRouter();
  const { id } = router.query;
  const [name, onChangeName] = useState("");
  const [description, onChangeDescription] = useState("");
  const [authMethod, onChangeAuthMethod] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const globalState = useAppState();

  useEffect(() => {
    if (project) {
      onChangeDescription(project.description);
      onChangeName(project.name);
      onChangeAuthMethod(project.auth_method);
    }
  }, []);

  function handleDelete() {
    setLoading(true);
    API.deleteRapicProject(null, id).then(async () => {
      setLoading(false);
      Router.push("/dashboard");
    });
  }

  async function handleUpdate() {
    setLoading(true);
    try {
      await API.updateRapicProject(null, id, {
        name,
        description,
        auth_method: authMethod,
      });
      setLoading(false);
      setMessage({ type: "success", text: "Updated successfully." });
    } catch (err) {
      setLoading(false);
      setMessage({ type: "error", text: err.message });
    }
  }

  function checkInputs() {
    if (!name || !description) {
      setMessage({ type: "error", text: "Please fill all fields." });
      return;
    }
    handleUpdate();
  }

  if (!project) return <Error status={404} />;
  return (
    <Projects project={project}>
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
              name="project-description"
              value={description}
              onChange={onChangeDescription}
              className="project-description"
            />
          </Section>
          <Section>
            <AccessLevel
              onChange={onChangeAuthMethod}
              authMethod={authMethod}
            />
          </Section>
          <ButtonWrapper>
            <Button
              title="Save Changes"
              id="save"
              onClick={() => checkInputs()}
            />
          </ButtonWrapper>
          <MessageBox message={message.text} type={message.type} />
          <Line />
          <DangerZoneWrapper>
            <Heading as="h2" content="Danger Zone" />
            <Title>
              Deleting a project will make its API unavaiable immediately. This
              action cannot be undone.
            </Title>
            <Button
              title="Delete Project"
              id="delete"
              onClick={() => handleDelete()}
            />
          </DangerZoneWrapper>

          {isLoading && <Loading />}
        </Content>
      </Container>
    </Projects>
  );
};

// export async function getStaticPaths() {
//   let paths = [];
//   try {
//     const projects = await API.getRapicProjects();
//     paths = projects
//       ? projects.map((project) => ({
//           params: { id: `${project.id}` },
//         }))
//       : [];
//   } catch (error) {
//     console.log(error);
//   }

//   return {
//     paths,
//     fallback: true,
//   };
// }

ProjectPage.getInitialProps = async (ctx) => {
  try {
    const project = await API.getRapicProjectById(ctx, ctx.query.id);
    return { project };
  } catch (err) {
    console.log({ err });
    return { project: null };
  }
};

export default withAuth(ProjectPage);
