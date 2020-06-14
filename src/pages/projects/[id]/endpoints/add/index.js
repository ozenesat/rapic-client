import { useState } from "react";
import Projects from "../../../../../containers/Projects";
import Heading from "common/src/components/Heading";
import {
  Container,
  Content,
  FieldsWrapper,
  Field,
  ButtonWrapper,
} from "../../../../../pagestyles/projects/endpoints/add/add.style";
import {
  Title,
  Section,
} from "./../../../../../containers/ProjectModal/projectmodal.style";
import { useRouter } from "next/router";
import Input from "common/src/components/Input";
import Button from "common/src/components/Button";
import { Icon } from "react-icons-kit";
import { iosTrash } from "react-icons-kit/ionicons/iosTrash";
import DropdownMenu from "common/src/components/Dropdown";
import API from "../../../../../services/api";

function EndpointAddPage({ project }) {
  const router = useRouter();
  const { id } = router.query;

  const [name, onChangeName] = useState("");
  const [description, onChangeDescription] = useState("");
  const [fields, addField] = useState([{ name: "", fieldtype: "" }]);

  function handleAddField() {
    addField(fields.concat({ name: "", fieldtype: "" }));
  }

  function deleteField(index) {
    fields.splice(index, 1);
    addField([].concat(fields));
  }

  function changeType(index, fieldtype) {
    fields[index].fieldtype = fieldtype;
    addField([].concat(fields));
  }

  function handleOnChangeField(index, name) {
    fields[index].name = name;
    addField([].concat(fields));
  }

  function createEnpoint() {
    let enpoint = {
      app: id * 1,
      model_name: name,
      description,
      rapicfields: fields && fields.map((item) => {
        item.fieldtype = 1;
        return item;
      }),
    };
    API.createRapicEndpoint(enpoint)
      .then((response) => {
        console.log({ response });
      })
      .catch((err) => console.log({ err }));
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
    createEnpoint();
  }

  return (
    <Projects endpoints={project.endpoints}>
      <Container>
        <Heading as="h2" content="Add a new endpoint" />
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
            {fields && fields.map((item, index) => (
              <Field>
                <DropdownMenu
                  content={item.fieldtype !== "" ? item.fieldtype : "TYPE >"}
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
          <ButtonWrapper>
            <Button
              title="Create Endpoint"
              id="create"
              onClick={createEnpoint}
            />
          </ButtonWrapper>
        </Content>
      </Container>
    </Projects>
  );
}

export async function getServerSideProps(context) {
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
  return {
    props: { project }, // will be passed to the page component as props
  };
}

export default EndpointAddPage;
