import { Container, Button } from "./actions.style";
import Table from "../Table";
import CodeEditorModel from "../CodeEditorModal";
import { useState } from "react";

const data = [
  { name: "deneme", httpMethod: "POST", trigger: "onCreate" },
  { name: "deneme", httpMethod: "POST", trigger: "onCreate" },
  { name: "deneme", httpMethod: "POST", trigger: "onCreate" },
  { name: "deneme", httpMethod: "POST", trigger: "onCreate" },
];
function Actions() {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <Container>
      <Button>Add New</Button>
      <Table
        data={data}
        headers={["Name", "HTTP Method", "Trigger", ""]}
        onClickDelete={(item) => alert(item.name)}
        onClickEdit={(item) => setModalOpen(true)}
      />
      <CodeEditorModel isModalOpen={isModalOpen} />
    </Container>
  );
}

export default Actions;
