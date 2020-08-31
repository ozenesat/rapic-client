import { useState } from "react";
import { useRouter } from "next/router";

import { withAuth } from "components/withAuth";
import Heading from "common/src/components/Heading";

import Tabs from "containers/Tabs";
import Endpoint from "containers/Endpoint";
import Actions from "containers/Actions";
import Projects from "containers/Projects";
import Users from "containers/Users";
import Error from "pages/_error";

import { HeaderWrapping } from "pagestyles/projects/endpoints/enpoint.style";
import { Container } from "pagestyles/projects/endpoints/add/add.style";

function EndpointPage() {
  const router = useRouter();
  const { endpoint: model_name } = router.query;
  const [status404, setStatus404] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  function renderContent() {
    switch (tabIndex) {
      case 0:
        return <Endpoint setStatus404={setStatus404} />;
      case 1:
        return <Users />;
      case 2:
        return <Actions />;
    }
  }

  if (status404) return <Error status={404} />;

  return (
    <Projects>
      <Container>
        <HeaderWrapping>
          <Heading as="h2" content={`${model_name}`} />
        </HeaderWrapping>
        <Tabs
          items={["Settings"]}
          onChangeTab={(index) => setTabIndex(index)}
        />
        {renderContent()}
      </Container>
    </Projects>
  );
}

export default withAuth(EndpointPage);
