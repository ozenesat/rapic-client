import Modal from "react-modal";
import AceEditor from "react-ace";
import Link from "next/link";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";

import Button from "common/src/components/Button";
import { ModalStyles } from "containers/ProjectModal/projectmodal.style";
import Heading from "common/src/components/Heading";
import { Text, Content, ButtonWrapper } from "./editor.style";

function CodeEditorModal({ isModalOpen, closeModal, endpoint }) {
  function onChange(newValue) {
    console.log("change", newValue);
  }
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={ModalStyles}
      ariaHideApp={false}
    >
      <Content>
        <Heading as="h2" content={`${endpoint.model_name} Code Editor`} />
        <Text>
          Learn more about the endpoints'
          <Link href="/code-editor">
            <a id="url"> code editing here</a>
          </Link>
        </Text>
        <ButtonWrapper>
          <Button title="GET" className="http-method" isActive />
          <Button title="POST" className="http-method" />
          <Button title="DELETE" className="http-method" />
        </ButtonWrapper>
        <AceEditor
          mode="java"
          theme="github"
          onChange={onChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
        />
        <ButtonWrapper>
          <Button
            title="Save Changes"
            id="save-changes"
            onClick={() => checkInputs()}
          />
          <Button title="Cancel" id="cancel" onClick={closeModal} />
        </ButtonWrapper>
      </Content>
    </Modal>
  );
}

export default CodeEditorModal;
