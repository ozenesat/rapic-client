import { Container, Button } from "./users.style";
import Table from "../Table";
const data = [
  { email: "gokhanamal@gmail.com", password: "*******" },
  { email: "gokhanamal@gmail.com", password: "*******" },
];
function Users() {
  return (
    <Container>
      <Button>Add New</Button>
      <Table
        data={data}
        headers={["Email", "Password", ""]}
        onClickDelete={(item) => alert(item.name)}
        onClickEdit={(item) => alert(item.name)}
      />
    </Container>
  );
}

export default Users;
