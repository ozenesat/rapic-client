import { useState, useEffect } from "react";
import Projects from "../../../../containers/Projects";
import Heading from "common/src/components/Heading";
import {
  Container,
  Content,
  FieldsWrapper,
  Field,
  ButtonWrapper,
} from "../../../../pagestyles/projects/endpoints/add/add.style";
import {
  Title,
  Section,
} from "./../../../../containers/ProjectModal/projectmodal.style";
import { useRouter } from "next/router";
import Input from "common/src/components/Input";
import Button from "common/src/components/Button";
import { Icon } from "react-icons-kit";
import { iosTrash } from "react-icons-kit/ionicons/iosTrash";
import DropdownMenu from "common/src/components/Dropdown";
import API from "services/api";
import Error from "pages/_error";
import { withAuth } from "components/withAuth";
import { getSessionCookie } from "utils/utils";
import { Loading } from "components/Loading";
import MessageBox from "containers/MessageBox";
import AccessLevel from "../../../../containers/AccessLevel";

function Endpoints({ project }) {
  const router = useRouter();
  const { id } = router.query;
  const endpoint = project.rapic_models.find(
    (item) => item.model_name == router.query.endpoint
  );
  const { username } = getSessionCookie(null);
  const [name, onChangeName] = useState("");
  const [description, onChangeDescription] = useState("");
  const [authMethod, onChangeAuthMethod] = useState(endpoint.auth_method);
  const [fields, addField] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    onChangeName(endpoint.model_name);
    onChangeDescription(endpoint.description);
    addField(endpoint.rapicfields);
  }, [router.query.endpoint]);

  // function covertFieldType(type) {
  //   const types = {
  //     1: "boolean",
  //     2: "integer",
  //     3: "float",
  //     4: "text",
  //     text: 4,
  //     float: 3,
  //     integer: 2,
  //     boolean: 1,
  //   };
  //   return types[type];
  // }

  // function handleAddField() {
  //   fields.push({ name: "", fieldtype: "" });
  //   addField([].concat(fields));
  // }

  // function deleteField(index) {
  //   fields.splice(index, 1);
  //   addField([].concat(fields));
  // }

  // function changeType(index, fieldtype) {
  //   fields[index].fieldtype = covertFieldType(fieldtype);
  //   addField([].concat(fields));
  // }

  // function handleOnChangeField(index, name) {
  //   fields[index].name = name;
  //   addField([].concat(fields));
  // }

  function updateEndpoints() {
    setLoading(true);
    let payload = {
      app: description,
      auth_method: authMethod,
    };
    API.updateRapicEndpoint(null, endpoint.id, payload).then((response) => {
      setLoading(false);
      setMessage({ text: "Updated successfully.", type: "success" });
    });
  }

  function checkFields() {
    if (!name || !description) {
      setMessage({ text: "Please fill the all fields.", type: "error" });
    }
    // if (fields.length < 1) {
    //   setMessage({
    //     text: "There should be at least one field.",
    //     type: "red",
    //   });
    //   return;
    // }
    // for (var field of fields) {
    //   if (field.fieldtype == "" || field.name == "") {
    //     setMessage({ text: "Please fill the all fields.", type: "error" });
    //     return;
    //   }
    // }
    updateEndpoints();
  }

  if (!endpoint) return <Error status={404} />;
  return (
    <Projects endpoints={project && project.rapic_models}>
      <Container>
        <Heading as="h2" content="Enpoint Settings" />
        <Content>
          <Section style={"margin-top: 20px;"}>
            <Title>Endpoint URL</Title>
            <Input
              disabled
              inputType="text"
              placeholder=""
              value={`${username}.rapic.io/${endpoint.model_name}`}
              className="endpoint-url"
            />
          </Section>
          <AccessLevel
            authMethod={endpoint.auth_method}
            onChange={onChangeAuthMethod}
          />
          <Section>
            <Title>API Endpoint Name</Title>
            <Input
              required
              disabled
              inputType="text"
              placeholder="Example: orders"
              name="endpoint-name"
              value={name}
              onChange={onChangeName}
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
          {/* 
          <Button
            title="+ Add Fields"
            id="add-fields"
            onClick={() => handleAddField()}
          />
          <FieldsWrapper>
            {fields &&
              fields.map((item, index) => (
                <Field>
                  <DropdownMenu
                    content={
                      item.fieldtype !== ""
                        ? covertFieldType(item.fieldtype)
                        : "TYPE >"
                    }
                    dropdownItems={["boolean", "float", "integer", "text"]}
                    className={`field-type dropdown-${index}`}
                    onSelect={(fieldtype) => changeType(index, fieldtype)}
                  />
                  <Input
                    required
                    inputType="text"
                    placeholder="Example: id"
                    name="field-name"
                    value={item.name}
                    onChange={(value) => handleOnChangeField(index, value)}
                    className={`field-name input-${index}`}
                  />
                  <Icon
                    icon={iosTrash}
                    className={`delete button-${index}`}
                    onClick={() => deleteField(index)}
                  />
                </Field>
              ))}
          </FieldsWrapper> */}

          <ButtonWrapper style="margin-top: 70px;">
            <Button title="Save Changes" id="create" onClick={checkFields} />
          </ButtonWrapper>
          <MessageBox message={message.text} type={message.type} />
          {isLoading && <Loading />}
        </Content>
      </Container>
    </Projects>
  );
}

Endpoints.getInitialProps = async (ctx) => {
  try {
    const project = await API.getRapicProjectById(ctx, ctx.query.id);
    return { project };
  } catch (err) {
    console.log({ err });
    return { project: null };
  }
};

export default withAuth(Endpoints);
