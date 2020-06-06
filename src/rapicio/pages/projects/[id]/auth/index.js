import Projects from "../../../../containers/Projects";
import { Container, Text, RadioWrapper } from "./auth.style";
import Heading from "common/src/components/Heading";
import Button from "common/src/components/Button";
import Radio from "common/src/components/Radio";

function Auth({ project }) {
  return (
    <Projects endpoints={project.endpoints}>
      <Container>
        <Heading as="h2" content="Authentication" />
        <Text>Control access to your Rapic API endpoints: </Text>
        <RadioWrapper>
          <Radio labelText="Public" className="radio" />
          <Radio labelText="Authenticated" className="radio" />
          <Radio labelText="Owner" className="radio" />
        </RadioWrapper>
        <Button title="Save Changes" id="save" onClick={() => () => {}} />
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

export default Auth;
