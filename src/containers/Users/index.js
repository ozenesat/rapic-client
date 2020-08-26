import { Container, Button } from "containers/Users/users.style";
import Table from "containers/Table";
import AddUserModal from "containers/AddUserModal";
import { useState } from "react";
const data = [
  { email: "gokhanamal@gmail.com", password: "*******" },
  { email: "gokhanamal@gmail.com", password: "*******" },
];
function Users() {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <Container>
      <Button onClick={() => setModalOpen(true)}>Add New</Button>
      <Table
        data={data}
        headers={["Email", "Password", ""]}
        onClickDelete={(item) => alert(item.email)}
        onClickEdit={(item) => setModalOpen(true)}
      />
      <AddUserModal
        isModalOpen={isModalOpen}
        closeModal={() => setModalOpen(false)}
      />
    </Container>
  );
}

export default Users;
