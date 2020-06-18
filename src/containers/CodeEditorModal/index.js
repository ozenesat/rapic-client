import { useState } from "react";
import Modal from "react-modal";
import AceEditor from "react-ace";
import Link from "next/link";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";

import Button from "common/src/components/Button";
import Heading from "common/src/components/Heading";
import { Loading } from "components/Loading";
import { ModalStyles } from "containers/ProjectModal/projectmodal.style";
import { Text, Content, ButtonWrapper } from "./editor.style";
import MessageBox from "../MessageBox";

function CodeEditorModal({ isModalOpen, closeModal, endpoint }) {
  const [code, onChangeCode] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setLoading] = useState(false);

  function handleUpdate() {
    setLoading(true);
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
          <Button title="GET" className="http-method active" />
          <Button title="POST" className="http-method" />
          <Button title="DELETE" className="http-method" />
        </ButtonWrapper>
        <AceEditor
          mode="java"
          theme="github"
          onChange={onChangeCode}
          name="ace-editor"
          height="550px"
          editorProps={{ $blockScrolling: false }}
        />

        <ButtonWrapper>
          <Button
            title="Save Changes"
            id="save-changes"
            onClick={() => handleUpdate()}
          />
          <Button title="Cancel" id="cancel" onClick={closeModal} />
        </ButtonWrapper>
        <MessageBox message={message.text} type={message.type} />
        {isLoading && <Loading />}
      </Content>
    </Modal>
  );
}

export default CodeEditorModal;
