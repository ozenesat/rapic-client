import { useState } from "react";
import Modal from "react-modal";
import { useRouter } from "next/router";
import Heading from "common/src/components/Heading";
import { Icon } from "react-icons-kit";
import { iosTrash } from "react-icons-kit/ionicons/iosTrash";

import {
  Container,
  Content,
  FieldsWrapper,
  Field,
  ButtonWrapper,
} from "pagestyles/projects/endpoints/add/add.style";
import { Title, Section } from "containers/ProjectModal/projectmodal.style";
import Input from "common/src/components/Input";
import Button from "common/src/components/Button";
import DropdownMenu from "common/src/components/Dropdown";
import { Loading } from "components/Loading";
import MessageBox from "containers/MessageBox";
import { ModalStyles } from "containers/ProjectModal/projectmodal.style";

import { getSessionCookie } from "utils/utils";
import API from "services/api";
import { useActionState } from "components/AppContext";
function EndpointAddModal({ isModalOpen, closeModal, project }) {
  const router = useRouter();
  const { id } = router.query;
  const [name, onChangeName] = useState("");
  const [description, onChangeDescription] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const { username } = getSessionCookie(null);
  const setGlobalState = useActionState();
  //   function handleAddField() {
  //     fields.push({ name: "", fieldtype: "" });
  //     addField([].concat(fields));
  //   }

  //   function deleteField(index) {
  //     fields.splice(index, 1);
  //     addField([].concat(fields));
  //   }

  //   function changeType(index, fieldtype) {
  //     fields[index].fieldtype = fieldtype;
  //     addField([].concat(fields));
  //   }

  //   function handleOnChangeField(index, name) {
  //     fields[index].name = name;
  //     addField([].concat(fields));
  //   }

  function resetModalState() {
    onChangeDescription("");
    onChangeName("");
    setLoading(false);
    closeModal();
  }

  function createEnpoint() {
    setLoading(true);
    let enpoint = {
      app: id * 1,
      model_name: name,
      description,
    };
    API.createRapicEndpoint(null, enpoint)
      .then((response) => {
        project.rapic_models.push(response);
        setGlobalState({ type: "UPDATE_PROJECT", payload: project });
        router.push(
          "/projects/[id]/endpoints/[endpoint]",
          `/projects/${id}/endpoints/${response.model_name}`
        );
        resetModalState();
      })
      .catch((err) => {
        setLoading(false);
        setMessage({
          text: err,
          type: "error",
        });
      });
  }

  function checkFields() {
    // if (fields.length < 1) {
    //   setMessage({
    //     text: "There should be at least one field.",
    //     type: "error",
    //   });
    //   return;
    // }
    // for (var field of fields) {
    //   if (field.fieldtype == "" || field.name == "") {
    //     setMessage({
    //       text: "Please fill the all fields.",
    //       type: "error",
    //     });
    //     return;
    //   }
    // }
    createEnpoint();
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={ModalStyles}
      ariaHideApp={false}
    >
      <Container>
        <Heading as="h2" content="Add a new endpoint" />
        <Content>
          <Section>
            <Title>API Endpoint Name</Title>
            <Input
              required
              inputType="text"
              placeholder="Enter your endpoint name"
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
          {/* <Button
            title="+ Add Fields"
            id="add-fields"
            onClick={() => handleAddField()}
          />
          <FieldsWrapper>
            {fields &&
              fields.map((item, index) => (
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
          </FieldsWrapper> */}
          <ButtonWrapper>
            <Button title="Create Endpoint" id="create" onClick={checkFields} />
            <Button title="Cancel" id="cancel" onClick={closeModal} />
          </ButtonWrapper>
          <MessageBox message={message.text} type={message.type} />
          {isLoading && <Loading />}
        </Content>
      </Container>
    </Modal>
  );
}

export default EndpointAddModal;
