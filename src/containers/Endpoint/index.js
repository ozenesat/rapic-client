import { useState, useEffect } from "react";
import swal from "sweetalert";
import { useRouter } from "next/router";

import API from "services/api";
import { getSessionCookie } from "utils/utils";

import { Loading } from "components/Loading";
import { useAppState, useActionState } from "components/AppContext";

import Heading from "common/src/components/Heading";
import Input from "common/src/components/Input";
import Button from "common/src/components/Button";

import MessageBox from "containers/MessageBox";
import AccessLevel from "containers/AccessLevel";
import CodeEditorModal from "containers/CodeEditorModal";

import { DangerZoneWrapper, Line } from "pagestyles/projects/project.style";
import { Title, Section } from "containers/ProjectModal/projectmodal.style";
import {
  Content,
  ButtonWrapper,
} from "pagestyles/projects/endpoints/add/add.style";

function Endpoint({ setStatus404 }) {
  const router = useRouter();
  const { id } = router.query;
  const globalState = useAppState();
  const setGlobalState = useActionState();
  const { username } = getSessionCookie(null);

  const [description, onChangeDescription] = useState("");
  const [authMethod, onChangeAuthMethod] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isModalOpen, setModalOpen] = useState(false);
  const [project, setProject] = useState({
    name: "",
    description: "",
    rapic_models: [],
  });
  const [endpoint, setEndpoint] = useState({
    model_name: "",
    description: "",
  });

  useEffect(() => {
    const { projects } = globalState;
    const project = projects.find((item) => item.id == id);
    handleSetProject(project);
    resetState();
  }, [router.query.endpoint]);

  function handleSetProject(project) {
    setProject(project);
    if (project != null) {
      handleSetEndpoint(project);
    } else {
      setStatus404(true);
      setLoading(false);
    }
  }

  function handleSetEndpoint(project) {
    const rapicModel = project.rapic_models.find(
      (item) => item.model_name == router.query.endpoint
    );
    if (rapicModel) {
      setEndpoint(rapicModel);
      onChangeDescription(rapicModel.description);
      onChangeAuthMethod(rapicModel.auth_method);
    } else {
      setStatus404(true);
    }

    setLoading(false);
  }

  function resetState() {
    setMessage({ text: "", type: "" });
  }

  function updateEndpoints() {
    setLoading(true);
    let payload = {
      app: id * 1,
      description: description,
      auth_method: authMethod,
    };
    API.updateRapicEndpoint(null, endpoint.id, payload).then(
      (updatedEndpoint) => {
        handleUpdateEndpoint(updatedEndpoint);
        setLoading(false);
        setMessage({ text: "Updated successfully.", type: "success" });
      }
    );
  }

  function handleUpdateEndpoint(updatedEndpoint) {
    const index = project.rapic_models.findIndex(
      (item) => item.id == updatedEndpoint.id
    );
    if (index > -1) {
      project.rapic_models[index] = updatedEndpoint;
      setGlobalState({ type: "UPDATE_PROJECT", payload: project });
    }
  }

  function handleDeleteEndpoint(id) {
    const index = project.rapic_models.findIndex((item) => item.id == id);
    if (index > -1) {
      project.rapic_models.splice(index, 1);
      setGlobalState({ type: "UPDATE_PROJECT", payload: project });
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
        API.deleteRapicEndpoint(null, endpoint.id)
          .then(async () => {
            setLoading(false);
            handleDeleteEndpoint(endpoint.id);
            router.push("/projects/[id]", `/projects/${id}`);
          })
          .catch(() => {
            setLoading(false);
            setMessage({ err: "Failed to delete endpoint", type: "error" });
          });
      }
    });
  }

  function checkFields() {
    // reset the previous messages
    setMessage({ text: "", type: "error" });

    if (!description) {
      setMessage({ text: "Please fill the all fields.", type: "error" });
    }

    updateEndpoints();
  }

  return (
    <Content>
      <Section customStyle={"margin-top: 20px;"}>
        <Title>Endpoint URL</Title>
        <Input
          disabled
          inputType="text"
          value={`http://${username}.rapic.io/${project.name}/${endpoint.model_name}`}
          className="endpoint-url"
        />
      </Section>
      <AccessLevel authMethod={authMethod} onChange={onChangeAuthMethod} endPoint={true}/>
      <Section>
        <Title>API Endpoint Name</Title>
        <Input
          required
          disabled
          inputType="text"
          placeholder="Example: orders"
          name="endpoint-name"
          value={endpoint.model_name}
          className="endpoint-name"
        />
      </Section>
      <Section>
        <Title>Description</Title>
        <Input
          required
          inputType="textarea"
          placeholder="Describe your endpoint"
          name="endpoint-description"
          value={description}
          onChange={onChangeDescription}
          className="endpoint-description"
        />
      </Section>
      <ButtonWrapper customStyle="margin-top: 20px;">
        <Button title="Save Changes" id="create" onClick={checkFields} />
      </ButtonWrapper>
      <MessageBox message={message.text} type={message.type} />
      <CodeEditorModal
        isModalOpen={isModalOpen}
        closeModal={() => setModalOpen(false)}
        endpoint={endpoint}
      />
      <Line />
      <DangerZoneWrapper>
        <Heading as="h2" content="Danger Zone" />
        <Title>
          Deleting an endpoint will make the API unavaiable immediately.
        </Title>
        <Button
          title="Delete Endpoint"
          id="delete"
          onClick={() => handleDelete()}
        />
      </DangerZoneWrapper>
      {isLoading && <Loading />}
    </Content>
  );
}

export default Endpoint;
