import Projects from "containers/Projects";
import {
  Container,
  Text,
  RadioWrapper,
} from "pagestyles/projects/auth/auth.style";
import Heading from "common/src/components/Heading";
import Button from "common/src/components/Button";
import Radio from "common/src/components/Radio";
import API from "services/api";
import { useState } from "react";

function Auth({ project }) {
  const [authType, changeAuthType] = useState(
    convertAuthType(project.auth_method)
  );

  function convertAuthType(type) {
    const types = {
      undefined: 1,
      public: 1,
      authenticated: 2,
      owner: 3,
    };
    return types[type];
  }
  return (
    <Projects endpoints={project && project.endpoints}>
      <Container>
        <Heading as="h2" content="Authentication" />
        <Text>Control access to your Rapic API endpoints: </Text>
        <RadioWrapper>
          <Radio
            labelText="Public"
            className="radio"
            isChecked={authType === 1}
            onChange={() => changeAuthType(1)}
          />
          <Radio
            labelText="Authenticated"
            className="radio"
            isChecked={authType === 2}
            onChange={() => changeAuthType(2)}
          />
          <Radio
            labelText="Owner"
            className="radio"
            isChecked={authType === 3}
            onChange={() => changeAuthType(3)}
          />
        </RadioWrapper>
        <Button title="Save Changes" id="save" onClick={() => () => {}} />
      </Container>
    </Projects>
  );
}

export async function getServerSideProps({ params }) {
  const project = await API.getRapicProjectById(params.id);

  return { props: { project } };
}

export default Auth;
