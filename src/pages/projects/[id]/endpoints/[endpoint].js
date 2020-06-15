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
import API from "../../../../services/api";
import Error from "../../../_error";

function Endpoints({ project, endpoint }) {
  const router = useRouter();
  const { id } = router.query;

  const [name, onChangeName] = useState(endpoint && endpoint.name);
  const [description, onChangeDescription] = useState(
    endpoint && endpoint.description
  );

  const [fields, addField] = useState(endpoint && endpoint.fields);

  function covertFieldType(type) {
    const types = {
      1: "boolean",
      2: "integer",
      3: "float",
      4: "text",
      text: 4,
      float: 3,
      integer: 2,
      boolean: 1,
    };
    return types[type];
  }

  function handleAddField() {
    addField(fields.concat({ name: "", fieldtype: "" }));
  }

  function deleteField(index) {
    fields.splice(index, 1);
    addField([].concat(fields));
  }

  function changeType(index, fieldtype) {
    fields[index].fieldtype = covertFieldType(fieldtype);
    addField([].concat(fields));
  }

  function handleOnChangeField(index, name) {
    fields[index].name = name;
    addField([].concat(fields));
  }

  function updateEndpoints() {
    let enpoint = {
      app: id * 1,
      model_name: name,
      description,
      rapicfields:
        fields &&
        fields.map((item) => {
          item.fieldtype = 1;
          return item;
        }),
    };
  }

  function checkFields() {
    if (fields.length < 1) {
      alert("There should be at least one field.");
      return;
    }
    for (var field of fields) {
      if (field.fieldtype == "" || field.name == "") {
        alert("Please fill the all fields.");
        return;
      }
    }
    updateEndpoints();
  }

  if (!endpoint) return <Error status={404} />;
  return (
    <Projects endpoints={project && project.endpoints}>
      <Container>
        <Heading as="h2" content="Enpoint Settings" />
        <Content>
          <Section>
            <Title>API Endpoint Name</Title>
            <Input
              required
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
          </FieldsWrapper>
          <Section style={"margin-top: 20px;"}>
            <Title>Endpoint URL</Title>
            <Input
              disable
              inputType="text"
              placeholder=""
              value="gokhan.rapic.io/getproject"
              className="endpoint-url"
            />
          </Section>
          <ButtonWrapper style="margin-top: 70px;">
            <Button title="Save Changes" id="create" onClick={checkFields} />
          </ButtonWrapper>
        </Content>
      </Container>
    </Projects>
  );
}

export async function getServerSideProps({ params }) {
  const project = await API.getRapicProjectById(params.id);

  const endpoint = project
    ? project.rapic_models.find((item) => item.name === params.endpoint)
    : null;

  return { props: { project, endpoint: endpoint || null } };
}

export default Endpoints;
