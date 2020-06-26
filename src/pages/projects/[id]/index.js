import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import Router, { useRouter } from "next/router";

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
} from "pagestyles/projects/project.style";
import API from "services/api";
import Heading from "common/src/components/Heading";
import Input from "common/src/components/Input";
import Button from "common/src/components/Button";
import { useAppState, useActionState } from "components/AppContext";
import { Loading } from "components/Loading";
import Error from "pages/_error";
import MessageBox from "containers/MessageBox";
import AccessLevel from "containers/AccessLevel";
import { withAuth } from "components/withAuth";

const ProjectPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const globalState = useAppState();
  const setGlobalState = useActionState();

  const [name, onChangeName] = useState("");
  const [description, onChangeDescription] = useState("");
  const [authMethod, onChangeAuthMethod] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [project, setProject] = useState({
    name: "",
    description: "",
    rapic_models: [],
  });

  useEffect(() => {
    const { projects } = globalState;
    const project = projects.find((item) => item.id == id);
    handleSetProject(project);
  }, []);

  function handleSetProject(project) {
    setProject(project);
    setLoading(false);

    if (project != null) {
      onChangeDescription(project.description);
      onChangeName(project.name);
      onChangeAuthMethod(project.auth_method);
    }
  }

  function handleDelete() {
    swal({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setLoading(true);
        API.deleteRapicProject(null, id)
          .then(async () => {
            setLoading(false);
            setGlobalState({ type: "DELETE_PROJECT", payload: { id } });
            Router.push("/dashboard");
          })
          .catch(() => {
            setLoading(false);
            setMessage({ err: "Failed to delete project", type: "error" });
          });
      }
    });
  }

  async function handleUpdate() {
    setLoading(true);
    try {
      const updatedProject = await API.updateRapicProject(null, id, {
        name,
        description,
        auth_method: authMethod,
      });
      setGlobalState({ type: "UPDATE_PROJECT", payload: updatedProject });
      setLoading(false);
      setMessage({ type: "success", text: "Updated successfully." });
    } catch (err) {
      setLoading(false);
      setMessage({ type: "error", text: err.message });
    }
  }

  function checkInputs() {
    setMessage({ text: "", type: "error" });
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
              Deleting a project will make its API unavaiable immediately.
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

// ProjectPage.getInitialProps = async (ctx) => {
//   try {
//     const project = await API.getRapicProjectById(ctx, ctx.query.id);
//     return { project };
//   } catch (err) {
//     console.log({ err });
//     return { project: null };
//   }
// };

export default withAuth(ProjectPage);
